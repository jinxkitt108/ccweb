
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/privacy-policy', component: () => import('pages/Policy.vue') },
      { path: '/about-developer', component: () => import('pages/admin/About.vue') },
      // Users visited page
      { path: 'account-settings', component: () => import('pages/user/AccountSettings.vue') },
      { path: 'portfolio', component: () => import('pages/user/Portfolio.vue') },
      { path: 'courses', component: () => import('pages/user/Courses.vue') },
      { path: 'discussions', component: () => import('pages/user/Discussions.vue') },
      { path: 'discussions/:id', component: () => import('pages/user/ViewDiscussion.vue') }
    ]
  },

   //Admin Routes
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: {
      isAdmin: true
    },
    children: [
      { path: 'dashboard', component: () => import('pages/admin/Dashboard.vue') },
      { path: 'portfolio', component: () => import('pages/admin/Portfolio.vue') },
      { path: 'projects', component: () => import('pages/admin/Projects.vue') }
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
