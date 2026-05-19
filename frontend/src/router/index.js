import { createRouter, createWebHistory } from 'vue-router'
import { routeGuard } from './routeGuard.js'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guest: true },
  },
  {
    path: '/',
    component: () => import('../components/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
      { path: 'incomes', name: 'Incomes', component: () => import('../views/Income.vue') },
      { path: 'expenses', name: 'Expenses', component: () => import('../views/Expense.vue') },
      { path: 'items', name: 'Items', component: () => import('../views/ItemsBuy.vue') },
      { path: 'wishlist', name: 'Wishlist', component: () => import('../views/Wishlist.vue') },
      { path: 'inventory', name: 'Inventory', component: () => import('../views/InventoryView.vue') },
      { path: 'family', name: 'Family', component: () => import('../views/FamilyView.vue') },
      { path: 'todos', name: 'Todos', component: () => import('../views/Todo.vue') },
      {
        path: 'items/manage',
        name: 'ItemsManage',
        component: () => import('../views/ItemsManage.vue'),
        meta: { requiresAdmin: true },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/CategoryView.vue'),
        meta: { requiresAdmin: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(routeGuard)

export default router
