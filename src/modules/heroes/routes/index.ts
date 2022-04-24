import { RouteRecordRaw } from 'vue-router'

const heroesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/shared/layouts/AppLayout.vue'),
    children: [
      {
        path: '/heroes',
        name: 'HeroesPage',
        component: () => import('src/modules/heroes/pages/HeroesPage.vue')
      },
      {
        path: '/favorite-hero-list',
        name: 'HeroesFavoritePage',
        component: () => import('src/modules/heroes/pages/HeroesFavoritePage.vue')
      },
      {
        path: '/heroes/:heroId',
        name: 'HeroDetailPage',
        component: () => import('src/modules/heroes/pages/HeroDetailPage.vue'),
        props: route => ({ heroId: route.params.heroId, isEditing: route.params.isEditing })
      }
    ],
    meta: { requiresAuth: true }
  }
]

export default heroesRoutes
