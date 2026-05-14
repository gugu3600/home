<script setup>
import { onMounted, computed, ref } from 'vue'
import { authService } from '../services/authService.js'
import { store } from '../stores/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarOpen = ref(false)

const isAdmin = computed(() => store.user?.role?.name === 'admin')

onMounted(async () => {
  if (!store.isAuthenticated) {
    try {
      const data = await authService.me()
      store.setUser(data)
    } catch {
      router.push({ name: 'Login' })
    }
  }
})

function logout() {
  authService.logout()
  store.clearUser()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-20 md:hidden" @click="sidebarOpen = false" />

    <aside :class="[
      'fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col transition-transform md:translate-x-0',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <div class="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Home Mgmt</h2>
        <button @click="sidebarOpen = false" class="md:hidden text-gray-500 dark:text-gray-400 text-xl">&times;</button>
      </div>
      <nav class="flex-1 p-4 flex flex-col gap-1">
        <RouterLink @click="sidebarOpen = false" to="/" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Dashboard
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/incomes" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Incomes
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/expenses" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Expenses
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/items" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Products
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/inventory" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          My Inventory
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/wishlist" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Wishlist
        </RouterLink>
        <RouterLink @click="sidebarOpen = false" to="/todos" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          To-Do
        </RouterLink>

        <div v-if="isAdmin" class="mt-4 pt-4 border-t dark:border-gray-700">
          <p class="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Management</p>
          <RouterLink @click="sidebarOpen = false" to="/categories" class="mt-2 block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
            Categories
          </RouterLink>
          <RouterLink @click="sidebarOpen = false" to="/items/manage" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
            Manage Products
          </RouterLink>
        </div>
      </nav>
      <div class="p-4 border-t dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ store.user?.name }} ({{ store.user?.role?.name }})</p>
          <button @click="store.toggleDark()" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0 ml-2">
            {{ store.isDark ? '☀️' : '🌙' }}
          </button>
        </div>
        <button @click="logout" class="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">Logout</button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <div class="md:hidden flex items-center gap-3 p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <button @click="sidebarOpen = true" class="text-gray-600 dark:text-gray-300 text-xl leading-none">&othird; Menu</button>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Home Mgmt</h2>
      </div>
      <main class="flex-1 overflow-auto p-4 md:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
