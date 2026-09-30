import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem, removeItem } from '@/utils/storage'
import { hashPassword, verifyPassword } from '@/utils/hash'

const USERS_KEY = 'dosu_users'
const SESSION_KEY = 'dosu_session'

export const useAuthStore = defineStore('auth', () => {
  // State
  const session = ref(getItem(SESSION_KEY, null))
  const users = ref(getItem(USERS_KEY, []))

  // Getters
  const isLoggedIn = computed(() => session.value !== null)
  const currentUser = computed(() => session.value)
  const username = computed(() => session.value?.username ?? '')

  // Actions
  function _saveUsers() {
    setItem(USERS_KEY, users.value)
  }

  function _saveSession(s) {
    session.value = s
    if (s) {
      setItem(SESSION_KEY, s)
    } else {
      removeItem(SESSION_KEY)
    }
  }

  function _validateUsername(u) {
    if (!u || u.length < 3 || u.length > 20) return 'Username harus 3–20 karakter'
    if (!/^[a-zA-Z0-9._]+$/.test(u)) return 'Username hanya boleh huruf, angka, titik, dan underscore'
    return null
  }

  async function register(username, password, confirmPassword) {
    const uLower = username.toLowerCase().trim()

    const usernameErr = _validateUsername(uLower)
    if (usernameErr) return { success: false, field: 'username', message: usernameErr }

    if (!password || password.length < 6) {
      return { success: false, field: 'password', message: 'Password minimal 6 karakter' }
    }
    if (password !== confirmPassword) {
      return { success: false, field: 'confirmPassword', message: 'Konfirmasi password tidak cocok' }
    }

    // Refresh users from storage (defensive)
    users.value = getItem(USERS_KEY, [])
    const exists = users.value.some((u) => u.username === uLower)
    if (exists) {
      return { success: false, field: 'username', message: 'Username sudah digunakan' }
    }

    const { hash, salt } = await hashPassword(password)
    const newUser = {
      id: `u_${Date.now()}`,
      username: uLower,
      passwordHash: hash,
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    }

    users.value.push(newUser)
    _saveUsers()

    const s = { userId: newUser.id, username: newUser.username }
    _saveSession(s)

    return { success: true }
  }

  async function login(username, password) {
    const uLower = username.toLowerCase().trim()
    users.value = getItem(USERS_KEY, [])

    const user = users.value.find((u) => u.username === uLower)
    if (!user) {
      return { success: false, message: 'Username atau password salah' }
    }

    const valid = await verifyPassword(password, user.passwordHash, user.passwordSalt)
    if (!valid) {
      return { success: false, message: 'Username atau password salah' }
    }

    const s = { userId: user.id, username: user.username }
    _saveSession(s)

    return { success: true }
  }

  function logout() {
    _saveSession(null)
  }

  return { session, isLoggedIn, currentUser, username, register, login, logout }
})
