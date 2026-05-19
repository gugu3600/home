<script setup>
import { ref, onMounted, computed } from 'vue'
import { familyService } from '../services/familyService.js'
import { store } from '../stores/index.js'

const family = ref(null)
const showCreate = ref(false)
const showJoin = ref(false)
const createName = ref('')
const joinCode = ref('')
const error = ref('')

onMounted(async () => {
  try { family.value = await familyService.mine() } catch {}
})

async function createFamily() {
  if (!createName.value.trim()) return
  try {
    family.value = await familyService.create(createName.value)
    showCreate.value = false
    createName.value = ''
    family.value = await familyService.mine()
  } catch (e) { error.value = e.response?.data?.error || 'Failed' }
}

async function joinFamily() {
  if (!joinCode.value.trim()) return
  try {
    await familyService.join(joinCode.value.trim())
    joinCode.value = ''
    showJoin.value = false
    family.value = await familyService.mine()
  } catch (e) { error.value = e.response?.data?.error || 'Failed' }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Family</h1>

    <div v-if="family" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ family.name }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Invite code: <code class="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono">{{ family.code }}</code></p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ family.users?.length || 0 }} member(s)</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <div v-for="fu in family.users" :key="fu.id" class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
          <div class="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">{{ fu.user.name.charAt(0).toUpperCase() }}</div>
          <span class="text-gray-700 dark:text-gray-300">{{ fu.user.name }}</span>
          <span class="text-xs text-gray-400">({{ fu.user.email }})</span>
        </div>
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
      <p class="text-gray-500 dark:text-gray-400 mb-4">You're not in a family yet. Create one or join with an invite code.</p>

      <div v-if="error" class="text-red-600 dark:text-red-400 text-sm mb-3">{{ error }}</div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button @click="showCreate = !showCreate; showJoin = false" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
          Create Family
        </button>
        <button @click="showJoin = !showJoin; showCreate = false" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
          Join Family
        </button>
      </div>

      <div v-if="showCreate" class="mt-4 flex gap-2">
        <input v-model="createName" placeholder="Family name" class="flex-1 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <button @click="createFamily" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Create</button>
      </div>

      <div v-if="showJoin" class="mt-4 flex gap-2">
        <input v-model="joinCode" placeholder="Invite code" class="flex-1 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <button @click="joinFamily" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Join</button>
      </div>
    </div>
  </div>
</template>
