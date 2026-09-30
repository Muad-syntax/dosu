<script setup>
// RegisterView.vue
import { ref, inject } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Eye, EyeOff, UserPlus } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import SnowDecor from '@/components/SnowDecor.vue'

const router = useRouter()
const authStore = useAuthStore()
const showToast = inject('showToast')

const form = ref({ username: '', password: '', confirmPassword: '' })
const errors = ref({ username: '', password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)

async function onSubmit() {
  errors.value = { username: '', password: '', confirmPassword: '' }
  loading.value = true

  try {
    const result = await authStore.register(
      form.value.username,
      form.value.password,
      form.value.confirmPassword
    )

    if (result.success) {
      showToast(`Hore! Akun berhasil dibuat. Selamat datang, ${authStore.username}! 🎉`, 'success')
      const redirect = router.currentRoute.value.query.redirect
      router.push(redirect || { name: 'menu' })
    } else {
      if (result.field) {
        errors.value[result.field] = result.message
      }
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

        <h1 class="auth-title">Buat Akun</h1>
        <p class="auth-subtitle">Daftar dan mulai pesan donat Dosu favoritmu! 🍩</p>

        <form @submit.prevent="onSubmit" class="auth-form" novalidate>
          <!-- Username -->
          <div class="form-group">
            <label class="form-label" for="reg-username">Username</label>
            <input
              id="reg-username"
              v-model="form.username"
              type="text"
              class="form-input"
              :class="{ error: errors.username }"
              placeholder="3–20 karakter, huruf/angka/titik/underscore"
              autocomplete="username"
              autocapitalize="none"
              required
            />
            <span v-if="errors.username" class="form-error">{{ errors.username }}</span>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label" for="reg-password">Password</label>
            <div class="input-wrapper">
              <input
                id="reg-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                :class="{ error: errors.password }"
                placeholder="Minimal 6 karakter"
                autocomplete="new-password"
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

          <!-- Confirm Password -->
          <div class="form-group">
            <label class="form-label" for="reg-confirm">Konfirmasi Password</label>
            <div class="input-wrapper">
              <input
                id="reg-confirm"
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                class="form-input"
                :class="{ error: errors.confirmPassword }"
                placeholder="Ulangi password kamu"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="input-toggle"
                @click="showConfirm = !showConfirm"
                :aria-label="showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'"
              >
                <component :is="showConfirm ? EyeOff : Eye" :size="18" />
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</span>
          </div>

          <button
            id="btn-register"
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="loading"
          >
            <UserPlus :size="18" v-if="!loading" />
            <span>{{ loading ? 'Mendaftar...' : 'Daftar' }}</span>
          </button>
        </form>

        <div class="register-note">
          <p>🔒 Password disimpan terenkripsi. Data tersimpan di browser kamu.</p>
        </div>

        <p class="auth-switch">
          Sudah punya akun?
          <RouterLink to="/login">Masuk di sini</RouterLink>
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
  margin-bottom: 16px;
}

.register-note {
  background: var(--frost-light);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  margin-bottom: 16px;
}

.register-note p {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.5;
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
