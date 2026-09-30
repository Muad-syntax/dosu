<script setup>
// ToastMessage.vue — Toast notifikasi global
import { computed } from 'vue'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next'

const props = defineProps({
  toasts: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['dismiss'])

function iconFor(type) {
  if (type === 'success') return CheckCircle
  if (type === 'error') return AlertCircle
  return Info
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="Notifikasi">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="`toast-${toast.type || 'info'}`"
          role="alert"
        >
          <component :is="iconFor(toast.type)" :size="18" class="toast-icon" />
          <span class="toast-message">{{ toast.message }}</span>
          <button
            class="toast-close"
            @click="$emit('dismiss', toast.id)"
            aria-label="Tutup notifikasi"
          >
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 88px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 320px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-hover);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: var(--font-body);
  pointer-events: all;
  animation: slideInRight 300ms ease forwards;
}

.toast-success {
  background: #EBF8F3;
  color: #2D8B63;
  border-left: 4px solid var(--success);
}

.toast-error {
  background: #FDEEF1;
  color: #C0485A;
  border-left: 4px solid var(--danger);
}

.toast-info {
  background: var(--frost-light);
  color: var(--periwinkle-dark);
  border-left: 4px solid var(--periwinkle);
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 4px;
  transition: opacity var(--transition);
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

/* TransitionGroup */
.toast-enter-active {
  animation: slideInRight 300ms ease forwards;
}
.toast-leave-active {
  animation: slideOutRight 250ms ease forwards;
}
.toast-move {
  transition: transform 300ms ease;
}
</style>
