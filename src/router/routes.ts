import { RouteRecordRaw } from 'vue-router'
import authRoutes from 'src/modules/auth/routes'
import heroesRoutes from 'src/modules/heroes/routes'

const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...heroesRoutes,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
