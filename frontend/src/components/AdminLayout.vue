<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { authService } from '../services/authService.js'
import { store } from '../stores/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarOpen = ref(false)

const isAdmin = computed(() => store.user?.role?.name === 'admin')
const unreadCount = computed(() => store.notifications.filter((n) => !n.read).length)

onMounted(async () => {
  document.addEventListener('keydown', onKey)
  if (!store.isAuthenticated) {
    try {
      const data = await authService.me()
      store.setUser(data)
    } catch {
      router.push({ name: 'Login' })
    }
  }
})

onUnmounted(() => document.removeEventListener('keydown', onKey))

function onKey(e) {
  if (e.key === 'Escape') store.notifPanel = false
}

function logout() {
  authService.logout()
  store.clearUser()
  router.push({ name: 'Login' })
}

const notifOpen = computed(() => store.notifPanel)

function toggleNotif() {
  store.notifPanel = !store.notifPanel
}

function closeNotif() {
  store.notifPanel = false
}

function notifIcon(type) {
  return type === 'new:income' ? '💰' : '💸'
}

function timeAgo(id) {
  const diff = Date.now() - id
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
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
        <RouterLink @click="sidebarOpen = false" to="/family" class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-medium">
          Family
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
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ store.user?.name }} <span class="text-xs text-gray-400 dark:text-gray-500">({{ store.user?.role?.name ? store.user.role.name.charAt(0).toUpperCase() + store.user.role.name.slice(1) : 'N/A' }})</span></p>
          <div class="flex items-center gap-2">
            <button @click="toggleNotif" class="relative text-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              🔔
              <span v-if="unreadCount" class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
            </button>
            <button @click="store.toggleDark()" class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 shrink-0 flex items-center gap-1">
              <span>{{ store.isDark ? '☀️' : '🌙' }}</span>
            </button>
          </div>
        </div>
        <button @click="logout" class="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">Logout</button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <div class="md:hidden flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="flex items-center gap-3">
          <button @click="sidebarOpen = true" class="text-gray-600 dark:text-gray-300 text-xl leading-none">&othird; Menu</button>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Home Mgmt</h2>
        </div>
        <button @click="toggleNotif" class="relative text-lg text-gray-500 dark:text-gray-400">
          🔔
          <span v-if="unreadCount" class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{{ unreadCount > 9 ? '9+' : unreadCount }}</span>
        </button>
      </div>
      <main class="flex-1 overflow-auto p-4 md:p-6">
        <router-view />
      </main>
    </div>

    <Teleport to="body">
      <div v-if="notifOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="fixed inset-0 bg-black/40" @click="closeNotif" />
        <div class="relative w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl flex flex-col animate-slide-in">
          <div class="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
            <div class="flex items-center gap-3">
              <button v-if="unreadCount" @click="store.markAllRead()" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Mark all read</button>
              <button @click="closeNotif" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none">&times;</button>
            </div>
          </div>
          <div v-if="store.notifications.length === 0" class="flex-1 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">No notifications yet</div>
          <div v-else class="flex-1 overflow-y-auto divide-y dark:divide-gray-700">
            <div v-for="n in store.notifications" :key="n.id" @click="store.markRead(n.id)" :class="['flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors', n.read ? 'opacity-50 bg-transparent' : 'bg-indigo-50/30 dark:bg-indigo-900/10']">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ n.title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">{{ n.message }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ timeAgo(n.id) }}</p>
              </div>
              <span v-if="!n.read" class="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-slide-in {
  animation: slide-in 0.2s ease-out;
}
</style>
