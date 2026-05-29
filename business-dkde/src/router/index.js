import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue'), name: 'home' },
  { path: '/network', component: () => import('../views/NetworkView.vue'), name: 'network' },
  { path: '/network/:id', component: () => import('../views/StakeholderProfileView.vue'), name: 'stakeholder' },
  { path: '/interviews', component: () => import('../views/InterviewsView.vue'), name: 'interviews' },
  { path: '/events', component: () => import('../views/EventsView.vue'), name: 'events' },
  { path: '/gallery', component: () => import('../views/GalleryView.vue'), name: 'gallery' },
  { path: '/join', component: () => import('../views/JoinView.vue'), name: 'join' },
  { path: '/about', component: () => import('../views/AboutView.vue'), name: 'about' },
  { path: '/advisors', component: () => import('../views/AdvisorsView.vue'), name: 'advisors' },
  { path: '/contact', component: () => import('../views/ContactView.vue'), name: 'contact' },
  { path: '/newsletter', component: () => import('../views/NewsletterView.vue'), name: 'newsletter' },
  { path: '/social', component: () => import('../views/SocialMediaView.vue'), name: 'social' }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
