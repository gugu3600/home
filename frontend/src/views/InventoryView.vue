<script setup>
import { onMounted, ref } from 'vue'
import { inventoryService } from '../services/inventoryService.js'
import { familyService } from '../services/familyService.js'

const items = ref([])
const imageUrl = import.meta.env.VITE_IMAGE_URL
const showFamily = ref(false)

onMounted(async () => {
  try {
    const myFamily = await familyService.mine()
    if (myFamily) showFamily.value = true
  } catch {}
  await load()
})

async function load() {
  const params = showFamily.value ? '?family=true' : ''
  items.value = await inventoryService.getAll(params)
}

function toggleFamily() {
  showFamily.value = !showFamily.value
  load()
}

async function increase(inv) {
  inv.quantity++
  await inventoryService.adjust(inv.id, 1)
}

async function decrease(inv) {
  if (inv.quantity <= 1) {
    await inventoryService.remove(inv.id)
    items.value = items.value.filter(i => i.id !== inv.id)
    return
  }
  inv.quantity--
  await inventoryService.adjust(inv.id, -1)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Inventory</h1>
      <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input type="checkbox" v-model="showFamily" @change="toggleFamily" class="w-4 h-4" />
        Show family
      </label>
    </div>

    <div v-if="items.length === 0" class="text-center py-12 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
      No items in inventory yet. Buy some products!
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="inv in items" :key="inv.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
        <img v-if="inv.item.photos?.length" :src="imageUrl + inv.item.photos[0].url" class="w-full h-40 object-cover" />
        <div v-else class="w-full h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No image</div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ inv.item.name }}</h3>
            <span v-if="inv.user" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{{ inv.user.name }}</span>
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500">Category: {{ inv.item.category?.name }}</p>
          <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400">${{ inv.item.price?.toFixed(2) || '0.00' }}</p>
          <div class="flex items-center justify-between mt-2">
            <button @click="decrease(inv)" class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xl font-bold hover:bg-red-200 dark:hover:bg-red-800">−</button>
            <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ inv.quantity }}</span>
            <button @click="increase(inv)" class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xl font-bold hover:bg-green-200 dark:hover:bg-green-800">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
