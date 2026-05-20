<script setup>
import { watch } from 'vue'
import { store } from './stores/index.js'
import { connectSocket, disconnectSocket } from './services/socket.js'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

function notify(event, data) {
  if (!data?.user) return
  const isIncome = event.includes('income')
  const isDelete = event.startsWith('delete')

  let action, sev, summary, detail
  if (isDelete) {
    action = isIncome ? 'removed income' : 'removed expense'
    sev = 'info'
    summary = isIncome ? '🗑️ Income Removed' : '🗑️ Expense Removed'
    detail = `${data.user.name} ${action}: ${data.title}`
  } else {
    action = isIncome ? 'earned' : 'spent'
    sev = isIncome ? 'success' : 'warn'
    summary = isIncome ? '💰 New Income' : '💸 New Expense'
    detail = `${data.user.name} ${action} $${data.amount?.toFixed(2)} on ${data.title}`
  }

  store.addNotification({ type: event, title: summary, message: detail, user: data.user, amount: data.amount })
  store.bump()
  toast.add({ severity: sev, summary, detail, life: 5000 })

  if (!document.hasFocus() && Notification.permission === 'granted') {
    new Notification(summary, { body: detail })
  }
}

function setupListeners(socket) {
  socket.on('new:income', (data) => notify('new:income', data))
  socket.on('new:expense', (data) => notify('new:expense', data))
  socket.on('delete:income', (data) => notify('delete:income', data))
  socket.on('delete:expense', (data) => notify('delete:expense', data))
}

watch(() => store.isAuthenticated, async (auth) => {
  if (auth && store.token) {
    if (Notification.permission === 'default') Notification.requestPermission()
    try {
      const socket = await connectSocket(store.token)
      setupListeners(socket)
    } catch {}
  } else {
    disconnectSocket()
  }
}, { immediate: true })
</script>

<template>
  <Toast position="top-right" />
  <router-view />
</template>
