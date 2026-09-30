<script setup>
// MenuView.vue
import { ref, computed } from 'vue'
import { Search, X } from 'lucide-vue-next'
import ProductCard from '@/components/ProductCard.vue'
import { products, categories } from '@/data/products'
import { inject } from 'vue'

const showToast = inject('showToast')

const searchQuery = ref('')
const activeCategory = ref('all')

const filtered = computed(() => {
  let result = products
  if (activeCategory.value !== 'all') {
    result = result.filter((p) => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((p) =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  }
  return result
})

function clearSearch() {
  searchQuery.value = ''
}

function onAdded(name) {
  showToast(`${name} ditambahkan ke keranjang!`, 'success')
}
</script>

<template>
  <div class="menu-view">
    <!-- Header -->
    <div class="menu-header">
      <div class="container">
        <h1 class="menu-title">Menu</h1>
        <p class="menu-subtitle">Pilih donat favoritmu dan nikmati kelezatan susu di setiap gigitan</p>

        <!-- Search & Filter -->
        <div class="menu-controls">
          <!-- Search -->
          <div class="search-wrapper">
            <Search :size="18" class="search-icon" aria-hidden="true" />
            <input
              id="menu-search"
              v-model="searchQuery"
              type="search"
              placeholder="Cari donat..."
              class="form-input search-input"
              aria-label="Cari produk"
            />
            <button
              v-if="searchQuery"
              class="search-clear"
              @click="clearSearch"
              aria-label="Hapus pencarian"
            >
              <X :size="16" />
            </button>
          </div>

          <!-- Category Filter -->
          <div class="filter-tabs" role="tablist" aria-label="Filter kategori">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="filter-tab"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
              :aria-selected="activeCategory === cat.id"
              role="tab"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="container menu-content">
      <Transition name="fade" mode="out-in">
        <div v-if="filtered.length > 0" :key="activeCategory + searchQuery">
          <p class="result-count">
            Menampilkan <strong>{{ filtered.length }}</strong> produk
          </p>
          <div class="products-grid">
            <ProductCard
              v-for="product in filtered"
              :key="product.id"
              :product="product"
              @added="onAdded"
            />
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Donat tidak ditemukan</h3>
          <p>Coba kata kunci atau filter lain</p>
          <button class="btn btn-primary" @click="searchQuery = ''; activeCategory = 'all'">
            Tampilkan semua
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.menu-view {
  min-height: 80vh;
}

.menu-header {
  background: linear-gradient(135deg, var(--frost-light) 0%, var(--frost) 100%);
  padding: 48px 0 40px;
  margin-bottom: 40px;
}

.menu-title {
  font-family: var(--font-heading);
  color: var(--periwinkle);
  margin-bottom: 8px;
  text-align: center;
}

.menu-subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 32px;
}

.menu-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto;
}

/* Search */
.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  padding-left: 44px;
  padding-right: 40px;
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color var(--transition);
  padding: 2px;
}

.search-clear:hover {
  color: var(--danger);
}

/* Filter tabs */
.filter-tabs {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  border-radius: var(--radius-full);
  border: 2px solid var(--frost);
  background: var(--milk);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all var(--transition);
}

.filter-tab:hover {
  border-color: var(--periwinkle);
  color: var(--periwinkle);
}

.filter-tab.active {
  background: var(--periwinkle);
  border-color: var(--periwinkle);
  color: #fff;
}

/* Content */
.menu-content {
  padding-bottom: 60px;
}

.result-count {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin-bottom: 20px;
}

.result-count strong {
  color: var(--periwinkle);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .menu-controls { flex-direction: column; }
  .filter-tabs { width: 100%; }
}

@media (max-width: 480px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
</style>
