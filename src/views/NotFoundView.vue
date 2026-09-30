<script setup>
// NotFoundView.vue
import { RouterLink } from 'vue-router'
import { Home, ShoppingBag } from 'lucide-vue-next'
import SnowDecor from '@/components/SnowDecor.vue'
</script>

<template>
  <div class="not-found-page">
    <SnowDecor />
    <div class="not-found-content">
      <div class="not-found-donut" aria-hidden="true">🍩</div>
      <h1 class="not-found-code">404</h1>
      <h2 class="not-found-title">Halaman Tidak Ditemukan</h2>
      <p class="not-found-desc">
        Sepertinya donat ini sudah habis dimakan 😅<br />
        Halaman yang kamu cari tidak ada.
      </p>
      <div class="not-found-actions">
        <RouterLink to="/" class="btn btn-primary">
          <Home :size="18" /> Ke Beranda
        </RouterLink>
        <RouterLink to="/menu" class="btn btn-secondary">
          <ShoppingBag :size="18" /> Lihat Menu
        </RouterLink>
      </div>
      <div class="not-found-jp">ミルクドーナツ 🥛</div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  background: linear-gradient(135deg, var(--frost-light) 0%, var(--frost) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 40px 24px;
}

.not-found-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 480px;
}

.not-found-donut {
  font-size: 5rem;
  margin-bottom: 16px;
  display: block;
  animation: floatDonut 3s ease-in-out infinite;
}

.not-found-code {
  font-family: var(--font-heading);
  font-size: clamp(5rem, 15vw, 8rem);
  color: var(--periwinkle);
  font-weight: 700;
  margin-bottom: 0;
  line-height: 1;
  text-shadow: 4px 4px 0 var(--frost);
}

.not-found-title {
  font-family: var(--font-heading);
  color: var(--text);
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.not-found-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.not-found-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.not-found-jp {
  font-family: var(--font-accent);
  color: var(--text-muted);
  font-size: 0.85rem;
  opacity: 0.6;
}
</style>
