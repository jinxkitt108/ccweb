import { db } from "boot/firebase";
import { Notify } from "quasar";
import { Loading } from "quasar";

const state = {
  portfolios: []
};

const getters = {};

const actions = {
  // Adding Portfolio
  async addNewPortfolio({ commit }, payload) {
    let ref = db.collection("portfolios");
    ref
      .add({
        title: payload.title,
        website: payload.website,
        editor: payload.editor
      })
      .then(res => {
        commit("setNewDocs", {...payload, id: res.id});
        Notify.create({
          message: "New portfolio added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  // Get Portfolios
  async getPortfolios({ commit }) {
    let docArray = [];
    let ref = db.collection("portfolios");
    let docs = ref.get();
    (await docs).forEach(doc => {
      docArray.push({...doc.data(), id: doc.id});
    });
    commit("setDocs", docArray);
  },
  // Update Project
  async updatePortfolio({ commit }, payload) {
    Loading.show({
      message: 'Update in progress<span class="text-primary">Hang on...</span>'
    });
    let ref = db.collection("portfolios").doc(payload.id);
    ref
      .update({
        title: payload.title,
        website: payload.website,
        editor: payload.editor
      })
      .then(res => {
        commit("setUpdatedDoc", payload);
        Loading.hide();
        Notify.create({
          message: "Portfolio updated!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  // Remove Portfolio
  async removePortfolio({ commit }, id) {
    Loading.show({
      message: "Deleting portfolio..."
    });
    let ref = db.collection("portfolios").doc(id);
    ref.delete().then(() => {
      commit("setRemovedDoc", id);
      Loading.hide();
      Notify.create({
        message: "Portfolio deleted!",
        position: "center",
        color: "warning",
        icon: "warning"
      });
    });
  }
};

const mutations = {
  setDocs: (state, docs) => (state.portfolios = docs),
  setUpdatedDoc: (state, payload) => {
    const index = state.portfolios.findIndex(doc => doc.id === payload.id);
    if (index !== -1) {
      state.portfolios.splice(index, 1, payload);
    }
  },
  setRemovedDoc: (state, id) =>
    (state.portfolios = state.portfolios.filter(doc => doc.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
