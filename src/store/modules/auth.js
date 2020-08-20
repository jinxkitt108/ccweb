import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {
  userDetails: {},
  error: {}
};

const getters = {};

const actions = {
  /*  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          email: payload.email,
          password: payload.password,
          type: "admin"
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, */

  loginAsGuest({ state }) {
    if (!state.userDetails.length) {
      firebaseAuth.signInAnonymously().catch(error => {
        console.log(error);
      });
    }
  },

  loginUser({ commit }, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        this.$router.push("/overview");
      })
      .catch(error => {
        commit("setLoginError", error);
      });
  },

  logoutUser() {
    firebaseAuth.signOut();
    this.$router.replace("/adminlogin");
  },

  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        if (!user.isAnonymous) {
          let userId = firebaseAuth.currentUser.uid;
          firebaseDb.ref("users/" + userId).once("value", snapshot => {
            let userDetails = snapshot.val();
            commit("setUserDetails", {
              id: userId,
              name: userDetails.name,
              email: userDetails.email,
              type: userDetails.type
            });
          });
        }
      } else {
        commit("setUserDetails", {});
      }
    });
  }
};

const mutations = {
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
