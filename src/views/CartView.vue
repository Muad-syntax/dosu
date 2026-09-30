<script setup>
// CartView.vue
import { ref, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { ShoppingBag, MessageCircle, Trash2, ArrowLeft } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { openWhatsApp } from '@/utils/whatsapp'
import { formatRupiah } from '@/utils/whatsapp'
import CartItem from '@/components/CartItem.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const showToast = inject('showToast')

const note = ref('')
const showDialog = ref(false)

function onOrder() {
  if (cartStore.isEmpty) return
  openWhatsApp(cartStore.items, cartStore.totalPrice, authStore.username, note.value)
  showDialog.value = true
}

function clearAndClose() {
  cartStore.clearCart()
  showDialog.value = false
  showToast('Keranjang dikosongkan. Terima kasih sudah memesan! 🍩', 'success')
}

function keepAndClose() {
  showDialog.value = false
  showToast('Keranjang tetap disimpan. Sampai jumpa! 👋', 'info')
}

function confirmClear() {
  if (confirm('Yakin ingin mengosongkan semua isi keranjang?')) {
    cartStore.clearCart()
    showToast('Keranjang dikosongkan', 'info')
  }
}
</script>

<template>
  <div class="cart-view">
    <div class="cart-header">
      <div class="container">
        <h1 class="cart-title">Keranjang Belanja 🛒</h1>
        <p class="cart-subtitle">
          Periksa pesananmu sebelum mengirim via WhatsApp
        </p>
      </div>
    </div>

    <div class="container cart-content">
      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Keranjangmu masih kosong</h3>
        <p>Yuk tambahkan donat Dosu favoritmu!</p>
        <RouterLink to="/menu" class="btn btn-primary">
          <ShoppingBag :size="18" />
          Belanja Dulu Yuk
        </RouterLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-layout">
        <!-- Items -->
        <div class="cart-items">
          <!-- Header bar -->
          <div class="cart-items-header">
            <span>{{ cartStore.totalItems }} item di keranjang</span>
            <button class="btn-text-danger" @click="confirmClear">
              <Trash2 :size="15" />
              Kosongkan
            </button>
          </div>

          <TransitionGroup name="cart-item-list" tag="div" class="items-list">
            <CartItem
              v-for="item in cartStore.items"
              :key="item.productId"
              :item="item"
            />
          </TransitionGroup>

          <!-- Note -->
          <div class="cart-note">
            <label class="form-label" for="order-note">
              📝 Catatan pesanan <span class="note-optional">(opsional)</span>
            </label>
            <textarea
              id="order-note"
              v-model="note"
              class="form-input note-input"
              placeholder="Contoh: tolong jangan terlalu manis ya..."
              maxlength="200"
              rows="3"
            ></textarea>
            <div class="note-count">{{ note.length }}/200</div>
          </div>
        </div>

        <!-- Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h3 class="summary-title">Ringkasan Pesanan</h3>

            <div class="summary-items">
              <div
                v-for="item in cartStore.items"
                :key="item.productId"
                class="summary-item"
              >
                <span class="summary-item-name">{{ item.name }} ×{{ item.qty }}</span>
                <span class="summary-item-price">{{ formatRupiah(item.price * item.qty) }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>Total</span>
              <span class="price">{{ formatRupiah(cartStore.totalPrice) }}</span>
            </div>

            <p class="summary-note">
              Pembayaran & pengiriman dibicarakan langsung lewat WhatsApp 💬
            </p>

            <button
              class="btn btn-primary btn-block order-btn"
              :disabled="cartStore.isEmpty"
              @click="onOrder"
              id="btn-order-whatsapp"
            >
              <MessageCircle :size="20" />
              Pesan via WhatsApp
            </button>

            <RouterLink to="/menu" class="btn btn-secondary btn-block">
              <ArrowLeft :size="18" />
              Tambah Produk
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog konfirmasi -->
    <Transition name="fade">
      <div v-if="showDialog" class="dialog-overlay" @click.self="keepAndClose">
        <div class="dialog-box">
          <div class="dialog-emoji">💬</div>
          <h3>WhatsApp sudah terbuka!</h3>
          <p>
            Setelah mengirim pesan, apakah kamu ingin mengosongkan keranjang?
          </p>
          <div class="dialog-actions">
            <button class="btn btn-primary" @click="clearAndClose">
              ✅ Ya, kosongkan
            </button>
            <button class="btn btn-secondary" @click="keepAndClose">
              💾 Simpan dulu
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cart-view {
  min-height: 80vh;
}

.cart-header {
  background: linear-gradient(135deg, var(--frost-light) 0%, var(--frost) 100%);
  padding: 48px 0 40px;
  margin-bottom: 40px;
}

.cart-title {
  font-family: var(--font-heading);
  color: var(--periwinkle);
  margin-bottom: 8px;
  text-align: center;
}

.cart-subtitle {
  text-align: center;
  color: var(--text-muted);
}

.cart-content {
  padding-bottom: 60px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 4px;
}

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

/* Items */
.cart-items-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 700;
  color: var(--text);
  font-size: 0.95rem;
}

.btn-text-danger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--danger);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.btn-text-danger:hover {
  background: #FDEEF1;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

/* TransitionGroup */
.cart-item-list-enter-active,
.cart-item-list-leave-active {
  transition: all 300ms ease;
}
.cart-item-list-enter-from,
.cart-item-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.cart-item-list-move {
  transition: transform 300ms ease;
}

/* Note */
.cart-note {
  background: var(--milk);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-card);
}

.note-optional {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.82rem;
}

.note-input {
  resize: vertical;
  min-height: 80px;
  font-size: 0.9rem;
}

.note-count {
  text-align: right;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 4px;
}

/* Summary */
.summary-card {
  background: var(--milk);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-soft);
  position: sticky;
  top: calc(var(--navbar-height) + 20px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-title {
  font-family: var(--font-heading);
  color: var(--text);
  font-size: 1.1rem;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--frost);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.summary-item-name {
  flex: 1;
  padding-right: 8px;
}

.summary-item-price {
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.summary-divider {
  height: 2px;
  background: var(--frost);
  border-radius: 999px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 800;
  font-size: 1.05rem;
  color: var(--text);
}

.summary-total .price {
  font-size: 1.3rem;
}

.summary-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--frost-light);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  line-height: 1.5;
}

.order-btn {
  font-size: 1rem;
  padding: 14px;
  gap: 10px;
}

/* Dialog */
.dialog-emoji {
  font-size: 2.5rem;
  margin-bottom: 8px;
  display: block;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .summary-card {
    position: static;
  }
}
</style>
