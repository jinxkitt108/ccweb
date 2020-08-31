import { auth, db, facebookProvider, googleProvider } from "boot/firebase";
import { Loading } from "quasar";

const state = {
  currentUser: null,
  error: null
};

const getters = {};

const actions = {
  loginUser({ commit }, payload) {
    Loading.show();
    commit("setLoginError", null);
    if (payload.method == "facebook") {
      Loading.hide();
      auth
        .signInWithPopup(facebookProvider)
        .then(result => {
          let user = result.user;
        })
        .catch(error => {
          commit("setLoginError", error);
          Loading.hide();
        });
    } else if (payload.method == "google") {
      Loading.hide();
      auth
        .signInWithPopup(googleProvider)
        .then(result => {
          let user = result.user;
        })
        .catch(error => {
          commit("setLoginError", error);
          Loading.hide();
        });
    } else if (payload.method == "standard") {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
          let user = result.user;
          Loading.hide();
        })
        .catch(error => {
          commit("setLoginError", error);
          Loading.hide();
        });
    }
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
