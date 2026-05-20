<script setup>
import { onMounted, ref, watch } from 'vue'
import { wishlistService } from '../services/wishlistService.js'
import { store } from '../stores/index.js'

const items = ref([])
const imageUrl = import.meta.env.VITE_IMAGE_URL

onMounted(() => fetchItems())
watch(() => store.refreshKey, () => fetchItems())

async function fetchItems() {
  items.value = await wishlistService.getAll('?family=true')
}

async function remove(id) {
  await wishlistService.remove(id)
  fetchItems()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Wishlist</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="w in items" :key="w.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
        <img v-if="w.item.photos?.length" :src="imageUrl + w.item.photos[0].url" class="w-full h-40 object-cover" />
        <div v-else class="w-full h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No image</div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ w.item.name }}</h3>
            <span v-if="w.user" class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{{ w.user.name }}</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ w.item.description || 'No description' }}</p>
          <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400">${{ w.item.price?.toFixed(2) || '0.00' }}</p>
          <button @click="remove(w.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 self-start">
            Remove
          </button>
        </div>
      </div>
      <div v-if="items.length === 0" class="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
        Wishlist is empty
      </div>
    </div>
  </div>
</template>
