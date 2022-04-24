import { RouteRecordRaw } from 'vue-router'

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/shared/layouts/LoginLayout.vue'),
    children: [
      {
        path: '/',
        name: 'SignInPage',
        component: () => import('src/modules/auth/pages/SignInPage.vue'),
        props: route => ({ next: route.query.next })
      }
    ],
    props: route => ({ next: route.query.next }),
    meta: { requiresAuth: false }
  }
]

export default authRoutes
