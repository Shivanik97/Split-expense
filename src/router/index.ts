import { createRouter, createWebHistory } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import axiosInstance from '../services/api'
import Home from '../views/HomeView.vue'
import ViewComponent from '@/components/ViewComponent.vue'
import AddComponentVue from '@/components/AddComponent.vue'
import EditComponentVue from '@/components/EditComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ViewComponent',
      name: 'ViewComponent',
      component: ViewComponent
    },
    {
      path: '/AddExpense',
      name: 'AddExpense',
      component: AddComponentVue
    },
    {
      path: '/Update/:id',
      name: 'Update',
      component: EditComponentVue,
      props: true // Enable props
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (to.path !== '/' && !isAuthenticated) {
    await loginWithRedirect()
  } else {
    next()
  }
})

export default router
