<script setup>
// ProductCard.vue
import { ref } from 'vue'
import { ShoppingCart, Package } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { formatRupiah } from '@/utils/whatsapp'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['added'])

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const adding = ref(false)

async function addToCart() {
  if (!authStore.isLoggedIn) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
    return
  }

  adding.value = true
  cartStore.addItem(props.product)
  emit('added', props.product.name)

  setTimeout(() => {
    adding.value = false
  }, 600)
}
</script>

<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.available }">
    <div class="product-image-wrapper">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <div v-if="!product.available" class="out-badge">Habis</div>
      <div v-else class="category-badge">{{ product.category === 'original' ? 'Original' : 'Topping' }}</div>
    </div>

    <div class="product-body">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.description }}</p>

      <div class="product-footer">
        <span class="price">{{ formatRupiah(product.price) }}<small>/pcs</small></span>
        <button
          class="btn btn-primary btn-sm add-btn"
          :class="{ 'adding': adding }"
          :disabled="!product.available || adding"
          @click="addToCart"
          :aria-label="`Tambahkan ${product.name} ke keranjang`"
        >
          <ShoppingCart :size="16" />
          <span>{{ adding ? 'Ditambahkan!' : '+ Keranjang' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--milk);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--frost-light);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.out-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--danger);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 253, 249, 0.9);
  color: var(--periwinkle);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--frost);
  backdrop-filter: blur(4px);
}

.product-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
}

.product-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
}

.price {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--dough-dark);
  font-size: 1.05rem;
  white-space: nowrap;
}

.price small {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-left: 2px;
}

.add-btn {
  flex-shrink: 0;
  padding: 8px 14px;
  font-size: 0.8rem;
  transition: all var(--transition);
}

.add-btn.adding {
  background: var(--success);
  transform: scale(0.97);
}
</style>
