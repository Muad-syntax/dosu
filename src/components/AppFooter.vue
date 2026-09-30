<script setup>
// AppFooter.vue
import { MessageCircle, Heart } from 'lucide-vue-next'

const waNumber = import.meta.env.VITE_WA_NUMBER || '62895414296707'
const waUrl = `https://wa.me/${waNumber}`
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <!-- Wave top -->
    <div class="footer-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#9AA6CB" opacity="0.15"/>
        <path d="M0,40 C480,10 960,60 1440,40 L1440,60 L0,60 Z" fill="#9AA6CB" opacity="0.1"/>
      </svg>
    </div>

    <div class="footer-content container">
      <div class="footer-brand">
        <img src="/logo_dosu_transparent.png" alt="Dosu" class="footer-logo" />
        <p class="footer-tagline">lembut, manis, penuh susu</p>
        <p class="footer-jp">ミルクドーナツ</p>
      </div>

      <div class="footer-links">
        <a :href="waUrl" target="_blank" rel="noopener noreferrer" class="wa-link">
          <MessageCircle :size="20" />
          Hubungi via WhatsApp
        </a>
      </div>
    </div>

    <div class="footer-bottom container">
      <p>
        &copy; {{ year }} Dosu · Dibuat dengan
        <Heart :size="14" class="heart-icon" aria-label="cinta" />
        untuk para pencinta donat susu
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: var(--frost-light);
  border-top: 1px solid var(--frost);
  margin-top: auto;
}

.footer-wave {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 60px;
  pointer-events: none;
}

.footer-wave svg {
  width: 100%;
  height: 100%;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 40px;
  padding-bottom: 24px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.footer-tagline {
  font-style: italic;
  color: var(--periwinkle);
  font-weight: 600;
  font-size: 0.9rem;
}

.footer-jp {
  font-family: var(--font-accent);
  color: var(--text-muted);
  font-size: 0.82rem;
}

.wa-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #25D366;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 12px 20px;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition);
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
}

.wa-link:hover {
  background: #1ebe59;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
}

.footer-bottom {
  padding-bottom: 28px;
  color: var(--text-muted);
  font-size: 0.82rem;
  text-align: center;
}

.footer-bottom p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.heart-icon {
  color: var(--danger);
  flex-shrink: 0;
}
</style>
