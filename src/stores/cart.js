import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { useAuthStore } from './auth'

function cartKey(userId) {
  return `dosu_cart_${userId}`
}

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()

  // Load cart dari localStorage milik user saat ini
  function loadCart() {
    if (!authStore.isLoggedIn) return []
    return getItem(cartKey(authStore.currentUser.userId), [])
  }

  const items = ref(loadCart())

  // Simpan ke localStorage setiap kali berubah
  function saveCart() {
    if (!authStore.isLoggedIn) return
    setItem(cartKey(authStore.currentUser.userId), items.value)
  }

  watch(items, saveCart, { deep: true })

  // Reload cart ketika user berganti (login/logout)
  watch(() => authStore.currentUser, () => {
    items.value = loadCart()
  })

  // Getters
  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addItem(product) {
    const existing = items.value.find((i) => i.productId === product.id)
    if (existing) {
      existing.qty = Math.min(existing.qty + 1, 99)
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    }
  }

  function increment(productId) {
    const item = items.value.find((i) => i.productId === productId)
    if (item) item.qty = Math.min(item.qty + 1, 99)
  }

  function decrement(productId) {
    const item = items.value.find((i) => i.productId === productId)
    if (!item) return
    if (item.qty <= 1) {
      removeItem(productId)
    } else {
      item.qty -= 1
    }
  }

  function setQty(productId, qty) {
    const item = items.value.find((i) => i.productId === productId)
    if (!item) return
    const clamped = Math.max(1, Math.min(99, Number(qty)))
    item.qty = clamped
  }

  function removeItem(productId) {
    const idx = items.value.findIndex((i) => i.productId === productId)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    increment,
    decrement,
    setQty,
    removeItem,
    clearCart,
  }
})
