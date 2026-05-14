<script setup>
import { ref, onMounted } from 'vue'
import { itemService } from '../services/itemService.js'
import { categoryService } from '../services/categoryService.js'

const imageUrl = import.meta.env.VITE_IMAGE_URL

const items = ref([])
const categories = ref([])
const loading = ref(true)
const form = ref({ name: '', sku: '', price: null, quantity: 0, description: '', categoryId: null })
const editing = ref(null)
const showForm = ref(false)
const photoFile = ref(null)
const photoPreview = ref(null)
const uploading = ref(false)

async function fetch() {
  loading.value = true
  try {
    const [itemsData, catsData] = await Promise.all([
      itemService.getAll(),
      categoryService.getAll(),
    ])
    items.value = itemsData
    categories.value = catsData
  } finally {
    loading.value = false
  }
}

function openAdd() {
  editing.value = null
  form.value = { name: '', sku: '', price: null, quantity: 0, description: '', categoryId: categories.value[0]?.id || null }
  photoFile.value = null
  photoPreview.value = null
  showForm.value = true
}

function openEdit(item) {
  editing.value = item.id
  form.value = {
    name: item.name,
    sku: item.sku || '',
    price: item.price,
    quantity: item.quantity,
    description: item.description || '',
    categoryId: item.categoryId,
  }
  photoFile.value = null
  photoPreview.value = item.photos?.length ? `${imageUrl}${item.photos[0].url}` : null
  showForm.value = true
}

function onPhotoChange(e) {
  const file = e.target.files[0]
  if (!file) return
  photoFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { photoPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

async function save() {
  uploading.value = true
  const payload = { ...form.value, price: parseFloat(form.value.price) || 0, quantity: parseInt(form.value.quantity) || 0 }
  try {
    let item
    if (editing.value) {
      item = await itemService.update(editing.value, payload)
    } else {
      item = await itemService.create(payload)
    }
    if (photoFile.value) {
      const fd = new FormData()
      fd.append('photo', photoFile.value)
      await itemService.uploadPhoto(item.id, fd)
    }
    showForm.value = false
    fetch()
  } finally {
    uploading.value = false
  }
}

async function remove(id) {
  if (confirm('Delete this product?')) {
    await itemService.delete(id)
    fetch()
  }
}

onMounted(fetch)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
      <button @click="openAdd" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">Add Product</button>
    </div>

    <div v-if="showForm" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">{{ editing ? 'Edit Product' : 'New Product' }}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <input v-model="form.name" placeholder="Name" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input v-model="form.sku" placeholder="SKU" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input v-model.number="form.price" placeholder="Price" type="number" step="0.01" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input v-model.number="form.quantity" placeholder="Quantity" type="number" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input v-model="form.description" placeholder="Description" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <select v-model="form.categoryId" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="mt-3">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo</label>
        <input type="file" accept="image/*" @change="onPhotoChange" class="text-sm text-gray-500 dark:text-gray-400" />
        <img v-if="photoPreview" :src="photoPreview" class="mt-2 w-32 h-32 object-cover rounded border" />
      </div>
      <div class="mt-3 flex gap-2">
        <button @click="save" :disabled="uploading" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
          {{ uploading ? 'Saving...' : 'Save' }}
        </button>
        <button @click="showForm = false" class="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600">Cancel</button>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 dark:text-gray-400">Loading...</div>
    <div v-else-if="items.length === 0" class="text-gray-500 dark:text-gray-400">No products yet.</div>
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Photo</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Name</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">SKU</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Category</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Price</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Qty</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y dark:divide-gray-700">
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-4 py-3">
              <img v-if="item.photos?.length" :src="`${imageUrl}${item.photos[0].url}`" class="w-12 h-12 object-cover rounded" />
              <span v-else class="text-gray-400 text-xs">—</span>
            </td>
            <td class="px-4 py-3 text-gray-900 dark:text-white">{{ item.name }}</td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ item.sku || '—' }}</td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ item.category?.name || '—' }}</td>
            <td class="px-4 py-3 text-right text-gray-900 dark:text-white">${{ item.price?.toFixed(2) }}</td>
            <td class="px-4 py-3 text-right text-gray-900 dark:text-white">{{ item.quantity }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="openEdit(item)" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">Edit</button>
              <button @click="remove(item.id)" class="text-red-600 dark:text-red-400 hover:underline text-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
