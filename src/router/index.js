import { createRouter, createWebHistory } from 'vue-router'
import { getItem } from '@/utils/storage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Beranda — Dosu' },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/MenuView.vue'),
    meta: { title: 'Menu — Dosu' },
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Keranjang — Dosu', requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Masuk — Dosu', guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: 'Daftar — Dosu', guestOnly: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Halaman tidak ditemukan — Dosu' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Route guards
router.beforeEach((to, from, next) => {
  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const session = getItem('dosu_session', null)
  const isLoggedIn = session !== null

  // Halaman yang memerlukan login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Halaman khusus tamu (login/register) — redirect ke menu jika sudah login
  if (to.meta.guestOnly && isLoggedIn) {
    return next({ name: 'menu' })
  }

  next()
})

export default router
