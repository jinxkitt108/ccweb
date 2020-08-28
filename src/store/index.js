import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import auth from "./modules/auth";
import portfolios from "./modules/portfolios";
import projects from "./modules/projects";
import topics from "./modules/topics";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth, portfolios, projects, topics
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [createPersistedState()]
  })

  return Store
}
