
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/adminlogin', component: () => import('pages/auth/AdminLogin.vue') }
    ]
  },

   //This is the Admin Routes
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/overview', component: () => import('pages/admin/Overview.vue') },
      { path: '/dashboard', component: () => import('pages/admin/Dashboard.vue') },
      { path: '/admin-projects', component: () => import('pages/admin/AdminProjects.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
