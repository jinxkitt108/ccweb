import { auth, db } from "boot/firebase";

const state = {
  currentUser: {},
  error: {}
};

const getters = {};

const actions = {
  async loginUser({ commit }, payload) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        this.$router.push("/admin");
      })
      .catch(error => {
        commit("setLoginError", error);
      });
  },

  logoutUser() {
    auth.signOut();
    this.$router.replace("/");
  },

  handleAuthStateChanged({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        let userId = auth.currentUser.uid;
        // Firestore get current user
        let ref = db.collection("users").doc(userId);
        ref.get().then(details => {
          let userDetails = details.data();
          commit("setCurrentUser", {
            id: userId,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role
          });
        });
      } else {
        commit("setCurrentUser", {});
      }
    });
  }
};

const mutations = {
  setCurrentUser: (state, payload) => (state.currentUser = payload),
  setUserDetails: (state, payload) => (state.userDetails = payload),
  setLoginError: (state, payload) => (state.error = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
