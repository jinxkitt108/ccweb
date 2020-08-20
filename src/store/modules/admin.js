import { firebaseAuth, firebaseDb } from "boot/firebase";
import Vue from "vue";
import { Notify } from "quasar";

const state = {
  projects: []
};

const getters = {};

const actions = {
  addNewProject({ commit }, payload) {
    let ref = firebaseDb.ref("projects/");
    ref
      .push()
      .set({
        name: payload.name,
        url: payload.url,
        date_started: payload.date_started,
        status: "ongoing"
      })
      .then(() => {
        return ref.once("value");
      })
      .then(dataSnapshot => {
        let projectDetails = dataSnapshot.val();
        let projectId = dataSnapshot.key;
        commit("setProjects", {
          projectId,
          projectDetails
        });
      });
  },

  getProjects({ commit }) {
    console.log("get projects")
    firebaseDb
      .ref("projects")
      .once("value")
      .then(dataSnapshot => {
        let projectDetails = dataSnapshot.val();
        let projectId = dataSnapshot.key;
        commit("setProjects", {
          projectId,
          projectDetails
        });
      });
  },

  updateProject({ commit }, payload) {
    firebaseDb.ref("projects/" + payload.id).update({
      name: payload.name,
      url: payload.url,
      date_started: payload.date_started,
      status: payload.status
    });
    commit("updateStateProject", {
      id: payload.id,
      details: {
        name: payload.name,
        url: payload.url,
        date_started: payload.date_started,
        status: payload.status
      }
    });
    Notify.create({
      message: "Project updated!",
      position: "top-right",
      color: "positive",
      icon: "thumb_up"
    });
  },

  deleteProject({ commit }, id) {
    firebaseDb.ref("projects/" + id).remove();
    commit("removeProject", id);
  }
};

const mutations = {
  updateStateProject: (state, payload) => {
    const index = state.projects.findIndex(
      project => project.id === payload.id
    );
    if (index !== -1) {
      state.projects.splice(index, 1, payload);
    }
  },

  setProjects: (state, payloads) => {
    let data = {};
    Vue.set(data, payloads.projectId, payloads.projectDetails);
    let projects_array = [];
    Object.entries(data.projects).forEach(entry => {
      projects_array.push({
        id: entry[0],
        details: entry[1]
      });
    });
    state.projects = projects_array;
  },

  removeProject: (state, id) =>
    (state.projects = state.projects.filter(project => project.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
