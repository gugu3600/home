import http from './api.js'

class AuthService {
  async login(email, password) {
    const { data } = await http.post('/auth/login', { email, password })
    return data
  }

  async logout() {
    const { data } = await http.post('/auth/logout')
    return data
  }

  async me() {
    const { data } = await http.get('/auth/me')
    return data
  }
}

export const authService = new AuthService()
