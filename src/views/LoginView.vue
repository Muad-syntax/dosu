<script setup>
// LoginView.vue
import { ref, inject } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Eye, EyeOff, LogIn } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import SnowDecor from '@/components/SnowDecor.vue'

const router = useRouter()
const authStore = useAuthStore()
const showToast = inject('showToast')

const form = ref({ username: '', password: '' })
const errors = ref({ username: '', password: '', general: '' })
const showPassword = ref(false)
const loading = ref(false)

async function onSubmit() {
  // Clear errors
  errors.value = { username: '', password: '', general: '' }

  if (!form.value.username.trim()) {
    errors.value.username = 'Username tidak boleh kosong'
    return
  }
  if (!form.value.password) {
    errors.value.password = 'Password tidak boleh kosong'
    return
  }

  loading.value = true
  try {
    const result = await authStore.login(form.value.username, form.value.password)
    if (result.success) {
      showToast(`Selamat datang kembali, ${authStore.username}!`, 'success')
      const redirect = router.currentRoute.value.query.redirect
      router.push(redirect || { name: 'menu' })
    } else {
      errors.value.general = result.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <SnowDecor />
    <div class="auth-container">
      <div class="auth-card">
        <!-- Logo -->
        <div class="auth-logo">
          <img src="/logo_dosu_transparent.png" alt="Dosu" class="auth-logo-img" />
        </div>

        <h1 class="auth-title">Selamat Datang!</h1>
        <p class="auth-subtitle">Masuk ke akun Dosu kamu</p>

        <form @submit.prevent="onSubmit" class="auth-form" novalidate>
          <!-- General error -->
          <Transition name="fade">
            <div v-if="errors.general" class="alert-error" role="alert">
              {{ errors.general }}
            </div>
          </Transition>

          <!-- Username -->
          <div class="form-group">
            <label class="form-label" for="login-username">Username</label>
            <input
              id="login-username"
              v-model="form.username"
              type="text"
              class="form-input"
              :class="{ error: errors.username }"
              placeholder="Masukkan username..."
              autocomplete="username"
              autocapitalize="none"
              required
            />
            <span v-if="errors.username" class="form-error">{{ errors.username }}</span>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <div class="input-wrapper">
              <input
                id="login-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                :class="{ error: errors.password }"
                placeholder="Masukkan password..."
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="input-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
              >
                <component :is="showPassword ? EyeOff : Eye" :size="18" />
              </button>
            </div>
            <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
          </div>

          <button
            id="btn-login"
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="loading"
          >
            <LogIn :size="18" v-if="!loading" />
            <span>{{ loading ? 'Masuk...' : 'Masuk' }}</span>
          </button>
        </form>

        <p class="auth-switch">
          Belum punya akun?
          <RouterLink to="/register">Daftar sekarang</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  background: linear-gradient(135deg, var(--frost-light) 0%, var(--frost) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  overflow: hidden;
}

.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
}

.auth-card {
  background: var(--milk);
  border-radius: var(--radius-lg);
  padding: 40px 36px;
  box-shadow: var(--shadow-hover);
  border: 1px solid var(--frost);
}

.auth-logo {
  text-align: center;
  margin-bottom: 24px;
}

.auth-logo-img {
  height: 80px;
  width: auto;
  object-fit: contain;
}

.auth-title {
  font-family: var(--font-heading);
  text-align: center;
  color: var(--periwinkle);
  font-size: 1.8rem;
  margin-bottom: 6px;
}

.auth-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 28px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 20px;
}

.alert-error {
  background: #FDEEF1;
  border: 1px solid var(--danger);
  color: #C0485A;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  text-align: center;
}

.auth-switch {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-switch a {
  color: var(--periwinkle);
  font-weight: 700;
}

.auth-switch a:hover {
  color: var(--periwinkle-dark);
}
</style>
