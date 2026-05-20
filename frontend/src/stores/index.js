import { reactive } from 'vue'

export const store = reactive({
  user: null,
  token: null,
  isAuthenticated: false,
  isDark: false,
  refreshKey: 0,
  notifPanel: false,
  notifications: [],

  setUser(user) {
    this.user = user
    this.token = user?.token || null
    this.isAuthenticated = true
  },

  clearUser() {
    this.user = null
    this.token = null
    this.isAuthenticated = false
    this.notifications = []
  },

  bump() {
    this.refreshKey++
  },

  addNotification(n) {
    this.notifications.unshift({ id: Date.now(), read: false, ...n })
    if (this.notifications.length > 50) this.notifications.length = 50
  },

  markRead(id) {
    const n = this.notifications.find((x) => x.id === id)
    if (n) n.read = true
  },

  markAllRead() {
    for (const n of this.notifications) n.read = true
  },



  initTheme() {
    const saved = localStorage.getItem('darkMode')
    this.isDark = saved === 'true'
    this.applyTheme()
  },

  toggleDark() {
    this.isDark = !this.isDark
    localStorage.setItem('darkMode', this.isDark)
    this.applyTheme()
  },

  applyTheme() {
    if (this.isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
})
