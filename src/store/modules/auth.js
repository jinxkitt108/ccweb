import { auth, db } from "boot/firebase";
import { Notify, Loading } from "quasar";

const state = {
  currentUser: null,
  error: null
};

const getters = {};

const actions = {
  verifyUserEmail ({ commit }) {
    let user = auth.currentUser
    user.sendEmailVerification().then(res => {
      commit('setVerifiedEmail')
    })
  },

  updateAccount ({ commit }, payload) {
    Loading.show()
    const user = auth.currentUser
    const userRef = db.collection('users').doc(user.uid)
    if (user.email !== payload.email) {
      user.updateEmail(payload.email).catch(err => {
        Loading.hide()
        console.log(err)
      })
    }
    userRef.update({
      email: payload.email,
      name: payload.name,
      photoUrl: payload.photoUrl
    }).then(() => {
      commit('setUpdatedUser', payload)
      Loading.hide()
      Notify.create({
        message: "Account updated!",
        position: "center",
        color: "positive",
        icon: "check"
      })
    }).catch(err => {
      console.log(err);
    })
  },

  logoutUser() {
    auth.signOut();
    this.$router.replace("/");
  },

  handleAuthStateChanged({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Firestore get current user
        let ref = db.collection("users").doc(user.uid);
        ref.get().then(details => {
          let userDetails = details.data();
          commit("setCurrentUser", {
            id: user.uid,
            name: (userDetails.name ? userDetails.name : "ccweb user"),
            email: userDetails.email,
            email_verified: user.emailVerified,
            photoUrl: userDetails.photoUrl,
            role: (userDetails.role ? userDetails.role : null),
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
  setVerifiedEmail: (state, payload) => (state.currentUser.email_verified = true),
  setUpdatedUser: (state, payload) => {
    if (state.currentUser.email !== payload.email) {
      state.currentUser.email_verified = false
      state.currentUser.email = payload.email
    }
    state.currentUser.name = payload.name
    state.currentUser.photoUrl = payload.photoUrl
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
