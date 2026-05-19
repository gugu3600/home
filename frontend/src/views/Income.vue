<script setup>
import { onMounted, ref } from 'vue'
import { incomeService } from '../services/incomeService.js'

const items = ref([])
const showForm = ref(false)
const form = ref({ title: '', amount: '', description: '' })
const editing = ref(null)

onMounted(() => fetchItems())

async function fetchItems() {
  items.value = await incomeService.getAll('?family=true')
}

async function save() {
  const payload = { ...form.value, amount: parseFloat(form.value.amount) }
  if (editing.value) {
    await incomeService.update(editing.value, payload)
  } else {
    await incomeService.create(payload)
  }
  form.value = { title: '', amount: '', description: '' }
  editing.value = null
  showForm.value = false
  fetchItems()
}

function edit(item) {
  form.value = { title: item.title, amount: String(item.amount), description: item.description || '' }
  editing.value = item.id
  showForm.value = true
}

async function remove(id) {
  await incomeService.delete(id)
  fetchItems()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Incomes</h1>
      <button @click="showForm = !showForm" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
        {{ showForm ? 'Cancel' : 'Add Income' }}
      </button>
    </div>

    <div v-if="showForm" class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700">
      <div class="flex flex-col gap-3">
        <input v-model="form.title" placeholder="Title" class="px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm" />
        <input v-model="form.amount" type="number" step="0.01" placeholder="Amount" class="px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm" />
        <input v-model="form.description" placeholder="Description (optional)" class="px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm" />
        <button @click="save" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 self-start">
          {{ editing ? 'Update' : 'Save' }}
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-x-auto">
      <table class="w-full text-sm min-w-[400px]">
        <thead class="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <tr>
            <th class="text-left px-4 py-3">Title</th>
            <th class="text-left px-4 py-3">User</th>
            <th class="text-left px-4 py-3">Amount</th>
            <th class="text-left px-4 py-3">Date</th>
            <th class="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-t dark:border-gray-700">
            <td class="px-4 py-3 text-gray-900 dark:text-gray-200">{{ item.title }}</td>
            <td class="px-4 py-3"><span v-if="item.user" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{{ item.user.name }}</span></td>
            <td class="px-4 py-3 text-green-600 dark:text-green-400 font-medium">+${{ item.amount.toFixed(2) }}</td>
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">{{ new Date(item.date).toLocaleDateString() }}</td>
            <td class="px-4 py-3 text-right">
              <button @click="edit(item)" class="text-indigo-600 dark:text-indigo-400 hover:underline text-xs mr-2">Edit</button>
              <button @click="remove(item.id)" class="text-red-600 dark:text-red-400 hover:underline text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-gray-400 dark:text-gray-500">No incomes recorded</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
