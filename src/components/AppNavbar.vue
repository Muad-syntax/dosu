<script setup>
// AppNavbar.vue
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function logout() {
  authStore.logout()
  closeMenu()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner container">
      <!-- Logo -->
      <div class="logo-user">
        <RouterLink to="/" class="navbar-logo" @click="closeMenu" aria-label="Dosu - Beranda">
          <img src="/logo_dosu_transparent.png" alt="Dosu" class="logo-img" />
        </RouterLink>
        <div class="user-info">
          <User :size="16" />
          <span class="username">{{ authStore.username }}</span>
        </div>
      </div>
      <!-- Desktop Nav -->
      <nav class="navbar-nav" role="navigation" aria-label="Navigasi utama">
        <RouterLink to="/" class="nav-link" exact-active-class="nav-link--active">Beranda</RouterLink>
        <RouterLink to="/menu" class="nav-link" active-class="nav-link--active">Menu</RouterLink>
      </nav>

      <!-- Right side -->
      <div class="navbar-right">
        <!-- Cart -->
        <RouterLink
          to="/keranjang"
          class="cart-btn"
          aria-label="`Keranjang, ${cartStore.totalItems} item`"
        >
          <ShoppingCart :size="22" />
          <span v-if="cartStore.totalItems > 0" class="cart-badge">
            {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
          </span>
        </RouterLink>

        <!-- Auth: Desktop -->
        <template v-if="authStore.isLoggedIn">
          <div class="user-menu">
            
            <button class="btn btn-secondary btn-sm" @click="logout" aria-label="Keluar">
              <LogOut :size="15" />
              Keluar
            </button>
          </div>
        </template>
        <template v-else>
          <div class="auth-links">
            <RouterLink to="/login" class="btn btn-secondary btn-sm">Masuk</RouterLink>
            <RouterLink to="/register" class="btn btn-primary btn-sm">Daftar</RouterLink>
          </div>
        </template>

        <!-- Hamburger (mobile) -->
        <button
          class="hamburger"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-label="Buka menu"
        >
          <Transition name="fade" mode="out-in">
            <X v-if="menuOpen" :key="'close'" :size="24" />
            <Menu v-else :key="'menu'" :size="24" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="mobile-menu" role="navigation" aria-label="Navigasi mobile">
        <RouterLink to="/" class="mobile-nav-link" @click="closeMenu" active-class="mobile-nav-link--active">
          🏠 Beranda
        </RouterLink>
        <RouterLink to="/menu" class="mobile-nav-link" @click="closeMenu" active-class="mobile-nav-link--active">
          🍩 Menu
        </RouterLink>
        <RouterLink to="/keranjang" class="mobile-nav-link" @click="closeMenu" active-class="mobile-nav-link--active">
          🛒 Keranjang
          <span v-if="cartStore.totalItems > 0" class="cart-badge-inline">{{ cartStore.totalItems }}</span>
        </RouterLink>
        <div class="mobile-divider"></div>
        <template v-if="authStore.isLoggedIn">
          <div class="mobile-user">Masuk sebagai <strong>{{ authStore.username }}</strong></div>
          <button class="btn btn-secondary btn-block" @click="logout">
            <LogOut :size="16" /> Keluar
          </button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-secondary btn-block" @click="closeMenu">Masuk</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-block" @click="closeMenu">Daftar</RouterLink>
        </template>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 253, 249, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--frost);
  box-shadow: 0 2px 16px rgba(154, 166, 203, 0.12);
}

.navbar-inner {
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-user{
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-img {
  height: 52px;
  width: auto;
  object-fit: contain;
}

/* Desktop Nav */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  transition: all var(--transition);
}

.nav-link:hover,
.nav-link--active {
  color: var(--periwinkle);
  background: var(--frost-light);
}

/* Right section */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Cart button */
.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--frost-light);
  color: var(--periwinkle);
  text-decoration: none;
  transition: all var(--transition);
  flex-shrink: 0;
}

.cart-btn:hover {
  background: var(--periwinkle);
  color: #fff;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--dough-dark);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--milk);
}

/* User menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.username {
  font-weight: 700;
  color: var(--periwinkle);
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Hamburger */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.hamburger:hover {
  background: var(--frost-light);
  color: var(--periwinkle);
}

/* Mobile menu */
.mobile-menu {
  background: var(--milk);
  border-top: 1px solid var(--frost);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(154, 166, 203, 0.15);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  transition: all var(--transition);
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  background: var(--frost-light);
  color: var(--periwinkle);
}

.cart-badge-inline {
  margin-left: auto;
  background: var(--dough-dark);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  min-width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.mobile-divider {
  height: 1px;
  background: var(--frost);
  margin: 4px 0;
}

.mobile-user {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 8px 16px;
}

/* Slide down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 250ms ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-nav,
  .user-menu,
  .auth-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
</style>
