import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'
import AuthCallbackViewVue from '@/views/AuthCallbackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: LoginViewVue
    },
    {
      path: '/auth/spotify/callback',
      name: 'auth-callback',
      component: AuthCallbackViewVue
    }
  ]
})

export default router
