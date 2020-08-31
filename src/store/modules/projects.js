import { db, auth } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  projects: []
};

const getters = {};

const actions = {
  // Adding Project
  async addNewProject({ commit }, payload) {
    let ref = db.collection("projects");
    ref
      .add({
        name: payload.name,
        url: payload.url,
        date_started: payload.date_started,
        status: "ongoing"
      })
      .then(res => {
        commit('setNewProject', {...payload, id: res.id})
        Notify.create({
          message: "New project added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  // Get Projects
  async getProjects({ commit }) {
    let projects = [];
    let ref = db.collection("projects").orderBy("date_started");
    let snap = await ref.get();
    snap.docs.forEach(doc => {
      projects.push({...doc.data(), id: doc.id});
    });

    commit("setProjects", projects);
  },
  // Update Project
  async updateProject({}, payload) {
    let ref = db.collection("projects").doc(payload.id);
    ref
      .update({
        name: payload.name,
        url: payload.url,
        date_started: payload.date_started,
        status: payload.status
      })
      .then(res => {
        Notify.create({
          message: "Project updated!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  // Remove Project
  async removeProject({}, id) {
    let ref = db.collection("projects").doc(id);
    ref.delete().then(() => {
      Notify.create({
        message: "Project deleted!",
        position: "center",
        color: "warning",
        icon: "warning"
      });
    });
  }
};

const mutations = {
  setProjects: (state, projects) => (state.projects = projects),
  setNewProject: (state, project) => state.projects.push(project),
  setUpdatedProject: (state, payload) => {
    const index = state.projects.findIndex(
      project => project.id === payload.id
    );
    if (index !== -1) {
      state.projects.splice(index, 1, payload);
    }
  },
  setRemovedProject: (state, id) =>
    (state.projects = state.projects.filter(project => project.id !== id))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
