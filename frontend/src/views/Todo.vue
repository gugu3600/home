<script setup>
import { onMounted, ref } from 'vue'
import { todoService } from '../services/todoService.js'

const todos = ref([])
const newTitle = ref('')

onMounted(() => fetchTodos())

async function fetchTodos() {
  todos.value = await todoService.getAll()
}

async function add() {
  if (!newTitle.value.trim()) return
  await todoService.create({ title: newTitle.value })
  newTitle.value = ''
  fetchTodos()
}

async function toggle(todo) {
  await todoService.update(todo.id, { done: !todo.done })
  fetchTodos()
}

async function remove(id) {
  await todoService.delete(id)
  fetchTodos()
}
</script>

<template>
  <div class="flex flex-col gap-4 max-w-xl mx-auto w-full">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">To-Do</h1>

    <div class="flex gap-2">
      <input v-model="newTitle" @keyup.enter="add" placeholder="New task..."
        class="flex-1 px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm" />
      <button @click="add" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Add</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
      <div v-for="t in todos" :key="t.id"
        class="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700 last:border-0">
        <input type="checkbox" :checked="t.done" @change="toggle(t)" class="w-4 h-4" />
        <span class="flex-1 text-sm" :class="{'line-through text-gray-400 dark:text-gray-500': t.done, 'text-gray-900 dark:text-gray-200': !t.done}">
          {{ t.title }}
        </span>
        <button @click="remove(t.id)" class="text-red-600 dark:text-red-400 hover:underline text-xs">Delete</button>
      </div>
      <div v-if="todos.length === 0" class="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
        No tasks yet
      </div>
    </div>
  </div>
</template>
