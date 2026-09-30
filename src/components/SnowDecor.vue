<script setup>
// SnowDecor.vue — Kepingan salju animasi dekoratif
import { onMounted, onUnmounted, ref } from 'vue'

const flakes = ref([])
const count = 18

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function generateFlakes() {
  flakes.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${randomBetween(0, 100)}%`,
    size: randomBetween(6, 16),
    duration: randomBetween(8, 20),
    delay: randomBetween(0, 10),
    opacity: randomBetween(0.3, 0.8),
  }))
}

onMounted(generateFlakes)
</script>

<template>
  <div class="snow-container" aria-hidden="true">
    <div
      v-for="flake in flakes"
      :key="flake.id"
      class="snowflake"
      :style="{
        left: flake.left,
        width: flake.size + 'px',
        height: flake.size + 'px',
        animationDuration: flake.duration + 's',
        animationDelay: flake.delay + 's',
        opacity: flake.opacity,
      }"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2v20M2 12h20M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.snow-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  top: -20px;
  color: var(--periwinkle);
  animation: snowfall linear infinite;
  will-change: transform;
}
</style>
