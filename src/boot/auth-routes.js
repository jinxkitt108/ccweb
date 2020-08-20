import { firebaseAuth, firebaseDb } from "./firebase";

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      if (firebaseAuth.currentUser) {
        next();
      } else {
        next({ path: '/adminlogin' });
      }
    }
    next();
  })
}
