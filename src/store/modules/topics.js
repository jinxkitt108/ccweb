import { db, timestamp, fieldValue } from "boot/firebase";
import { Notify } from "quasar";
import { Loading } from "quasar";

const state = {
  topics: [],
  topic_details: null
};

const getters = {};

const actions = {
  // Adding Topic
  async addNewTopic({ commit }, payload) {
    Loading.show();
    let ref = db.collection("topics");
    ref
      .add({
        title: payload.title,
        body: payload.body,
        created_at: timestamp.now(),
        comments_count: 0,
        views: 0
      })
      .then(res => {
        Loading.hide();
        commit("setNewDocAdded", {
          ...payload,
          id: res.id,
          created_at: res.created_at,
          comments_count: 0
        });
        Notify.create({
          message: "New topic added!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        Loading.hide();
        console.log(err.message);
      });
  },
  // Get Topics
  async getTopics({ commit }) {
    let docArray = [];
    let ref = db.collection("topics").orderBy('created_at');
    let snap = await ref.get();
    snap.docs.forEach(doc => {
      docArray.push({...doc.data(), id: doc.id});
    });

    commit("setTopics", docArray);
  },
  // Update Topic
  async updateTopic({ commit }, payload) {
    Loading.show({
      message: 'Update in progress<span class="text-primary">Hang on...</span>'
    });
    let ref = db.collection("topics").doc(payload.id);
    ref
      .update({
        title: payload.title,
        body: payload.body
      })
      .then(res => {
        commit("setUpdatedDoc", payload);
        Loading.hide();
        Notify.create({
          message: "Topic updated!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  // Remove Topic
  async removeTopic({ commit }, id) {
    Loading.show({
      message: "Deleting topic..."
    });
    let ref = db.collection("topics").doc(id);
    ref.delete().then(() => {
      commit("setRemovedDoc", id);
      Loading.hide();
      Notify.create({
        message: "Topic deleted!",
        position: "center",
        color: "warning",
        icon: "warning"
      });
    });
  },
  //Adding Comment
  addNewComment({ commit }, payload) {
    let ref = db
      .collection("topics")
      .doc(payload.topic_id)
      .collection("comments");
    const process = ref
      .add({
        topic_id: payload.topic_id,
        reply_to: payload.reply_to,
        body: payload.body,
        created_at: timestamp.now()
      })
      .then(res => {
        // commit("setComments", { ...res.data(), id: res.id});

        //Add Comment Count
        let topicRef = db.collection("topics").doc(payload.topic_id);
        topicRef.update("comments_count", fieldValue.increment(1));
        Notify.create({
          message: "Comment submitted!",
          position: "center",
          color: "positive",
          icon: "thumb_up"
        });
      });
  },
  //Get Topic Details by id
  async getTopicById({ commit, dispatch }, id) {
    Loading.show();
    let ref = db.collection("topics").doc(id);
    ref.update("views", fieldValue.increment(1));
    const doc = await ref.get();
    commit("setDocDetails", { ...doc.data(), id: doc.id, comments: [] });
    dispatch("getComments", doc.id);
    Loading.hide();
  },
  //Get Comments
  getComments({ commit }, id) {
    let ref = db
      .collection("topics")
      .doc(id)
      .collection("comments");
    ref.onSnapshot({ includeMetadataChanges: false }, snap => {
      let changes = snap.docChanges();
      changes.forEach(change => {
        let doc = change.doc.data();
        if (change.type == "added") {
          commit("setComments", { ...doc, id: change.doc.id });
        } else if (change.type == "removed") {
          commit("setRemoveComment", change.doc.id);
        }
      });
    });
  },
  //Remove Comment
  async removeComment({}, payload) {
    let topicRef = db.collection("topics").doc(payload.topic_id);
    let commentRef = topicRef.collection("comments").doc(payload.id);
    const deleting = await commentRef.delete();
    //Decrement comments count
    const decrement = topicRef.update(
      "comments_count",
      fieldValue.increment(-1)
    );
    Notify.create({
      message: "Comment deleted!",
      position: "top",
      color: "positive",
      icon: "thumb_up"
    });
  }
};

const mutations = {
  setTopics: (state, payload) => (state.topics = payload),
  setUpdatedDoc: (state, payload) => {
    const index = state.topics.findIndex(doc => doc.id === payload.id);
    if (index !== -1) {
      state.topics.splice(index, 1, payload);
    }
  },
  setRemovedDoc: (state, id) =>
    (state.topics = state.topics.filter(doc => doc.id !== id)),
  setDocDetails: (state, payload) => (state.topic_details = payload),
  setComments: (state, payload) => state.topic_details.comments.push(payload),
  setRemoveComment: (state, id) =>
    (state.topic_details.comments = state.topic_details.comments.filter(
      doc => doc.id !== id
    ))
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
