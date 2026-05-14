<script setup>
import { onMounted, ref } from 'vue'
import { itemService } from '../services/itemService.js'
import { wishlistService } from '../services/wishlistService.js'
import { store } from '../stores/index.js'

const items = ref([])
const wishlistIds = ref(new Set())
const imageUrl = import.meta.env.VITE_IMAGE_URL
const isAdmin = ref(false)

onMounted(async () => {
  isAdmin.value = store.user?.role?.name === 'admin'
  const [allItems, wishItems] = await Promise.all([
    itemService.getAll(),
    wishlistService.getAll(),
  ])
  items.value = allItems
  wishlistIds.value = new Set(wishItems.map(w => w.itemId))
})

async function toggleWishlist(item) {
  if (wishlistIds.value.has(item.id)) {
    const w = await wishlistService.getAll()
    const match = w.find(x => x.itemId === item.id)
    if (match) await wishlistService.remove(match.id)
    wishlistIds.value.delete(item.id)
  } else {
    await wishlistService.add(item.id)
    wishlistIds.value.add(item.id)
  }
}

async function buy(id) {
  await itemService.buy(id)
  items.value = await itemService.getAll()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
      <div v-if="isAdmin" class="flex gap-2">
        <RouterLink to="/items/manage" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
          + Add Product
        </RouterLink>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in items" :key="item.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
        <img v-if="item.photos?.length" :src="imageUrl + item.photos[0].url" class="w-full h-40 object-cover" />
        <div v-else class="w-full h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No image</div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-start justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
            <button @click="toggleWishlist(item)" class="text-lg">
              {{ wishlistIds.has(item.id) ? '❤️' : '🤍' }}
            </button>
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500" v-if="item.sku">SKU: {{ item.sku }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.description || 'No description' }}</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">Category: {{ item.category?.name }}</p>
          <p class="text-lg font-bold text-indigo-600 dark:text-indigo-400">${{ item.price?.toFixed(2) || '0.00' }}</p>
          <div class="flex items-center gap-2 text-xs">
            <span class="px-2 py-1 rounded-full"
              :class="item.purchased ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'">
              {{ item.purchased ? 'Purchased' : 'Available' }}
            </span>
            <span class="text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</span>
          </div>
          <button v-if="!item.purchased" @click="buy(item.id)"
            class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            Buy Now
          </button>
        </div>
      </div>
      <div v-if="items.length === 0" class="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
        No products available
      </div>
    </div>
  </div>
</template>
