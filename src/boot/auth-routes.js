import { auth } from "./firebase";

export default async ({ router, store, Vue }) => {
  let currentUser = store.state.auth.currentUser
  await router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.isAdmin)) {
      if (currentUser.role == 'admin') {
        next();
      } else {
        next({ path: '*' });
      }
    }
    next();
  })
}
