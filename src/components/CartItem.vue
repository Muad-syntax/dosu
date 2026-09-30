<script setup>
// CartItem.vue
import { Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { formatRupiah } from '@/utils/whatsapp'
import QuantityStepper from './QuantityStepper.vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const cartStore = useCartStore()

function onQtyChange(newVal) {
  cartStore.setQty(props.item.productId, newVal)
}

function onRemove() {
  cartStore.removeItem(props.item.productId)
}
</script>

<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img :src="item.image" :alt="item.name" loading="lazy" />
    </div>

    <div class="cart-item-info">
      <h4 class="cart-item-name">{{ item.name }}</h4>
      <span class="cart-item-price">{{ formatRupiah(item.price) }}/pcs</span>
    </div>

    <div class="cart-item-controls">
      <QuantityStepper
        :modelValue="item.qty"
        @update:modelValue="onQtyChange"
        @remove="onRemove"
      />
      <span class="cart-item-subtotal">{{ formatRupiah(item.price * item.qty) }}</span>
    </div>

    <button
      class="cart-item-remove"
      @click="onRemove"
      aria-label="Hapus item dari keranjang"
    >
      <Trash2 :size="16" />
    </button>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--milk);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: all var(--transition);
}

.cart-item:hover {
  box-shadow: var(--shadow-soft);
}

.cart-item-image {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--frost-light);
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.cart-item-subtotal {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--dough-dark);
  font-size: 0.95rem;
}

.cart-item-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 8px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.cart-item-remove:hover {
  color: var(--danger);
  background: #FDEEF1;
}

@media (max-width: 480px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 12px;
  }

  .cart-item-remove {
    order: -1;
    margin-left: auto;
  }

  .cart-item-controls {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
