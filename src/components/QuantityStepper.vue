<script setup>
// QuantityStepper.vue
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 99 },
})
const emit = defineEmits(['update:modelValue', 'remove'])

function decrement() {
  if (props.modelValue <= props.min) {
    emit('remove')
  } else {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="stepper" role="group" aria-label="Atur jumlah">
    <button
      class="stepper-btn"
      @click="decrement"
      :aria-label="modelValue <= min ? 'Hapus item' : 'Kurangi jumlah'"
    >
      <Minus :size="14" />
    </button>
    <span class="stepper-value" aria-live="polite">{{ modelValue }}</span>
    <button
      class="stepper-btn"
      @click="increment"
      :disabled="modelValue >= max"
      aria-label="Tambah jumlah"
    >
      <Plus :size="14" />
    </button>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 2px solid var(--frost);
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--milk);
}

.stepper-btn {
  background: none;
  border: none;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--periwinkle);
  transition: all var(--transition);
}

.stepper-btn:hover:not(:disabled) {
  background: var(--frost-light);
  color: var(--periwinkle-dark);
}

.stepper-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stepper-value {
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text);
  font-family: var(--font-heading);
  user-select: none;
}
</style>
