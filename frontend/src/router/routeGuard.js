import { authService } from '../services/authService.js'
import { store } from '../stores/index.js'

let authChecked = false

export async function routeGuard(to) {
  if (!authChecked) {
    store.initTheme()
  }
  if (!authChecked && !store.isAuthenticated) {
    try {
      const data = await authService.me()
      store.setUser(data)
    } catch {
      store.clearUser()
    }
    authChecked = true
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return { name: 'Login' }
  }

  if (to.meta.guest && store.isAuthenticated) {
    return { name: 'Dashboard' }
  }

  if (to.meta.requiresAdmin && store.user?.role?.name !== 'admin') {
    return { name: 'Dashboard' }
  }
}
