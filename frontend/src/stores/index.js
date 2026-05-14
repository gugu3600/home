import { reactive } from 'vue'

export const store = reactive({
  user: null,
  isAuthenticated: false,
  isDark: false,

  setUser(user) {
    this.user = user
    this.isAuthenticated = true
  },

  clearUser() {
    this.user = null
    this.isAuthenticated = false
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
