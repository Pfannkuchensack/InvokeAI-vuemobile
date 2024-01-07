import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/t2i',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
		{
      path: '/preview',
      name: 'preview',
      component: () => import('../views/PreviewView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    },
		{
      path: '/gallery/:board_id',
      name: 'gallery_board',
      component: () => import('../views/GalleryImageView.vue'),
			props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
