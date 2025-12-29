import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/'),
    },
    {
      name: 'trips',
      path: '/trips',
      component: () => import('@/pages/trips/index'),
    }
  ],
}
