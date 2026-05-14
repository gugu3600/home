<script setup>
import { ref, onMounted } from 'vue'
import { categoryService } from '../services/categoryService.js'

const categories = ref([])
const loading = ref(true)
const form = ref({ name: '', description: '' })
const editing = ref(null)
const showForm = ref(false)

async function fetchCategories() {
  loading.value = true
  try {
    categories.value = await categoryService.getAll()
  } finally {
    loading.value = false
  }
}

function openAdd() {
  editing.value = null
  form.value = { name: '', description: '' }
  showForm.value = true
}

function openEdit(cat) {
  editing.value = cat.id
  form.value = { name: cat.name, description: cat.description || '' }
  showForm.value = true
}

async function save() {
  if (editing.value) {
    await categoryService.update(editing.value, form.value)
  } else {
    await categoryService.create(form.value)
  }
  showForm.value = false
  fetchCategories()
}

async function remove(id) {
  if (confirm('Delete this category?')) {
    await categoryService.delete(id)
    fetchCategories()
  }
}

onMounted(fetchCategories)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
      <button @click="openAdd" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">Add Category</button>
    </div>

    <div v-if="showForm" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3">{{ editing ? 'Edit Category' : 'New Category' }}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input v-model="form.name" placeholder="Name" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input v-model="form.description" placeholder="Description" class="border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <div class="flex gap-2">
          <button @click="save" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Save</button>
          <button @click="showForm = false" class="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 dark:text-gray-400">Loading...</div>
    <div v-else-if="categories.length === 0" class="text-gray-500 dark:text-gray-400">No categories yet.</div>
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm min-w-[400px]">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Name</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Description</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y dark:divide-gray-700">
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-4 py-3 text-gray-900 dark:text-white">{{ cat.name }}</td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ cat.description || '—' }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="openEdit(cat)" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">Edit</button>
              <button @click="remove(cat.id)" class="text-red-600 dark:text-red-400 hover:underline text-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
