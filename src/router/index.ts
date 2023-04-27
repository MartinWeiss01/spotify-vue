import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'
import AuthCallbackViewVue from '@/views/AuthCallbackView.vue'
import StatsViewVue from '@/views/StatsView.vue'
import RecentlyPlayedViewVue from '@/views/RecentlyPlayedView.vue'
import PlaylistDeduplicatorViewVue from '@/views/PlaylistDeduplicatorView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
      meta: { requiresUnauth: true }
    },
    {
      path: '/auth/spotify/callback',
      name: 'auth-callback',
      component: AuthCallbackViewVue
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsViewVue,
      meta: { requiresAuth: true }
    },
    {
      path: '/recently-played',
      name: 'recentlyplayed',
      component: RecentlyPlayedViewVue,
      meta: { requiresAuth: true }
    },
    {
      path: '/deduplicator',
      name: 'deduplicator',
      component: PlaylistDeduplicatorViewVue,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  const authStore = useAuthStore()

  if (requiresAuth) {
    if (authStore.user.isLoggedIn) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else if (requiresUnauth) {
    if (authStore.user.isLoggedIn) {
      next({ name: 'stats' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
