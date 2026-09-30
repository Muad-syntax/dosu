<script setup>
// HomeView.vue
import { RouterLink } from 'vue-router'
import { ArrowRight, Star, Milk, Snowflake } from 'lucide-vue-next'
import SnowDecor from '@/components/SnowDecor.vue'
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products'
import { inject } from 'vue'

const showToast = inject('showToast')
const featured = products.slice(0, 4)

function onAdded(name) {
  showToast(`${name} ditambahkan ke keranjang! 🍩`, 'success')
}

const steps = [
  { icon: '🍩', title: 'Pilih Donat', desc: 'Jelajahi menu dan pilih donat favoritmu dari berbagai varian lezat.' },
  { icon: '🛒', title: 'Masukkan Keranjang', desc: 'Tambahkan ke keranjang dan atur jumlah sesuai kebutuhanmu.' },
  { icon: '💬', title: 'Pesan via WhatsApp', desc: 'Klik tombol WhatsApp dan pesananmu langsung terkirim ke kami.' },
]

const features = [
  { icon: '🥛', label: 'Penuh Susu', desc: 'Adonan dibuat dari susu segar pilihan untuk rasa yang kaya.' },
  { icon: '🌿', label: 'Super Lembut', desc: 'Tekstur fluffy yang meleleh di mulut setiap gigitan.' },
  { icon: '🍬', label: 'Pas Manisnya', desc: 'Tingkat kemanisan yang sempurna, tidak berlebihan.' },
]
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <SnowDecor />
      <div class="container hero-inner">
        <div class="hero-text">
          <div class="hero-badge">Donat Susu Premium</div>
          <h1 class="hero-title">
            <span class="title-dosu">dosu</span>
            <br />
            <span class="title-sub">Lembut · Manis · Penuh Susu</span>
          </h1>
          <p class="hero-desc">
            Donat susu homemade yang dibuat dengan cinta, dari susu segar pilihan.
            Lembut di dalam, sempurna di luar — cocok untuk semua momen.
          </p>
          <div class="hero-actions">
            <RouterLink to="/menu" class="btn btn-primary btn-lg">
              Lihat Menu <ArrowRight :size="18" />
            </RouterLink>
            <RouterLink to="/register" class="btn btn-secondary btn-lg">
              Daftar Sekarang
            </RouterLink>
          </div>
          <div class="hero-jp">ミルクドーナツ ✨</div>
        </div>

        <div class="hero-image-wrap">
          <div class="hero-circle">
            <img
              src="/logoDosu.png"
              alt="Donat Susu Dosu — lembut dan nikmat"
              class="hero-donut"
            />
          </div>
          <div class="hero-milk-splash" aria-hidden="true"></div>
        </div>
      </div>

      <!-- Wave bottom -->
      <div class="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>

    <!-- Features / Keunggulan -->
    <section class="section features-section">
      <div class="container">
        <div class="section-title">
          <h2>Kenapa Pilih Dosu?</h2>
          <p>Kami mengutamakan kualitas dan kelezatan di setiap gigitan</p>
        </div>
        <div class="features-grid">
          <div v-for="feat in features" :key="feat.label" class="feature-card">
            <div class="feature-icon">{{ feat.icon }}</div>
            <h3>{{ feat.label }}</h3>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-title">
          <h2>Menu Pilihan</h2>
          <p>Donat susu favoritmu ada di sini</p>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in featured"
            :key="product.id"
            :product="product"
            @added="onAdded"
          />
        </div>
        <div class="text-center mt-24">
          <RouterLink to="/menu" class="btn btn-secondary btn-lg">
            Lihat Semua Menu <ArrowRight :size="18" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Cara Memesan -->
    <section class="section steps-section">
      <div class="steps-bg">
        <SnowDecor />
        <div class="container">
          <div class="section-title">
            <h2>Cara Memesan</h2>
            <p>Cukup 3 langkah mudah untuk menikmati donat Dosu</p>
          </div>
          <div class="steps-grid">
            <div v-for="(step, i) in steps" :key="i" class="step-card">
              <div class="step-number">{{ i + 1 }}</div>
              <div class="step-icon">{{ step.icon }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-decor" aria-hidden="true">🍩</div>
          <h2>Siap Memesan Donut Impianmu?</h2>
          <p>Bergabunglah dan pesan donat Dosu yang lembut dan manis sekarang!</p>
          <div class="cta-actions">
            <RouterLink to="/menu" class="btn btn-primary btn-lg">
              Pesan Sekarang <ArrowRight :size="18" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---- Hero ---- */
.hero {
  position: relative;
  background: linear-gradient(135deg, var(--frost-light) 0%, #E8EEF9 50%, var(--frost) 100%);
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 60px 0 80px;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 253, 249, 0.9);
  border: 2px solid var(--frost);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--periwinkle);
  margin-bottom: 20px;
  width: fit-content;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 7vw, 5.5rem);
  line-height: 1.05;
  margin-bottom: 16px;
}

.title-dosu {
  display: block;
  color: var(--periwinkle);
  font-weight: 700;
  text-shadow: 3px 3px 0px var(--frost), -1px -1px 0px rgba(255,253,249,0.8);
  letter-spacing: -2px;
}

.title-sub {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 0;
}

.hero-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 420px;
  margin-bottom: 32px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.hero-jp {
  font-family: var(--font-accent);
  color: var(--periwinkle);
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Hero image */
.hero-image-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-circle {
  width: clamp(280px, 40vw, 480px);
  height: clamp(280px, 40vw, 480px);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, var(--milk) 0%, var(--frost-light) 60%, var(--frost) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(154, 166, 203, 0.3), inset 0 0 40px rgba(255,255,255,0.6);
  position: relative;
  z-index: 1;
}

.hero-donut {
  width: 85%;
  height: 85%;
  object-fit: contain;
  animation: floatDonut 4s ease-in-out infinite;
  filter: drop-shadow(0 12px 24px rgba(154, 166, 203, 0.4));
}

.hero-milk-splash {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 40px;
  background: radial-gradient(ellipse, rgba(220, 228, 243, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: milkSplash 3s ease-in-out infinite;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
}

.hero-wave svg {
  width: 100%;
  height: 100%;
}

/* ---- Features ---- */
.features-section {
  background: var(--cream);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: var(--milk);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-slow);
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: var(--frost);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: block;
}

.feature-card h3 {
  font-family: var(--font-heading);
  color: var(--periwinkle);
  margin-bottom: 10px;
  font-size: 1.15rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ---- Featured Products ---- */
.featured-section {
  background: linear-gradient(180deg, var(--cream) 0%, var(--frost-light) 100%);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* ---- Steps ---- */
.steps-section {
  padding: 0;
}

.steps-bg {
  position: relative;
  background: linear-gradient(135deg, #E8EEF9 0%, var(--frost) 100%);
  padding: 72px 0;
  overflow: hidden;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
  z-index: 1;
}

.step-card {
  background: rgba(255, 253, 249, 0.85);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--shadow-card);
  position: relative;
  transition: all var(--transition-slow);
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.step-number {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  background: var(--periwinkle);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(154, 166, 203, 0.4);
}

.step-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
  margin-top: 8px;
  display: block;
}

.step-card h3 {
  font-family: var(--font-heading);
  color: var(--text);
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.step-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ---- CTA ---- */
.cta-section {
  background: var(--cream);
}

.cta-card {
  background: linear-gradient(135deg, var(--periwinkle) 0%, var(--periwinkle-dark) 100%);
  border-radius: var(--radius-lg);
  padding: 60px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-hover);
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}

.cta-card::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
}

.cta-decor {
  font-size: 3rem;
  margin-bottom: 16px;
  display: block;
  animation: floatDonut 3s ease-in-out infinite;
}

.cta-card h2 {
  color: #fff;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.cta-card p {
  color: rgba(255,255,255,0.8);
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.cta-actions {
  position: relative;
  z-index: 1;
}

.cta-card .btn-primary {
  background: #fff;
  color: var(--periwinkle-dark);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.cta-card .btn-primary:hover {
  background: var(--frost-light);
  color: var(--periwinkle-dark);
  transform: translateY(-2px);
}

/* ---- Responsive ---- */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .hero-desc {
    margin: 0 auto 32px;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-jp {
    text-align: center;
  }

  .hero-badge {
    margin: 0 auto 20px;
  }

  .hero-image-wrap {
    order: -1;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    padding: 40px 24px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
  }
}
</style>
