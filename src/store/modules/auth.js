import { auth, db } from "boot/firebase";

const state = {
  currentUser: null,
  error: null
};

const getters = {};

const actions = {
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
            name: userDetails.name ? userDetails.name : "ccweb user",
            email: userDetails.email,
            role: userDetails.role ? userDetails.role : null
          });
        });
      } else {
        commit("setCurrentUser", null);
      }
    });
  }
};

const mutations = {
  setCurrentUser: (state, payload) => (state.currentUser = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
