<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastMessage from '@/components/ToastMessage.vue'
import { provide } from 'vue'

// Global toast system
const toasts = ref([])

function showToast(message, type = 'info', duration = 3000) {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => dismissToast(id), duration)
}

function dismissToast(id) {
  const idx = toasts.value.findIndex((t) => t.id === id)
  if (idx !== -1) toasts.value.splice(idx, 1)
}

// Provide toast globally to all components
provide('showToast', showToast)
</script>

<template>
  <div class="app-wrapper">
    <AppNavbar />
    <main class="main-content" id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" @show-toast="showToast" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <ToastMessage :toasts="toasts" @dismiss="dismissToast" />
  </div>
</template>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: var(--navbar-height);
}
</style>
