import { auth, db, timestamp, fieldValue } from "boot/firebase";
import { Notify } from "quasar";
import { Loading } from "quasar";

const state = {
  topics: [],
  your_topics: [],
  topic_details: null,
  topic_loading_state: false,
};

const getters = {};

const actions = {
  async getYourTopics ({ commit }) {
    try {
      const topics = [];
      const userId = auth.currentUser.uid
      let topicRef = db.collection('topics').where('author_id', '==', userId)
      const res = await topicRef.get()
      res.forEach(doc => {
        let topic = doc.data()
        topics.push({...topic, id: doc.id})
      })
      commit('setYourTopics', topics)
    } catch (e) {
      console.log(e)
    }
  },
  // Adding Topic
  async addNewTopic({ commit }, payload) {
    Loading.show();
    let ref = db.collection("topics");
    ref
      .add({
        author_id: auth.currentUser.uid,
        title: payload.title,
        body: payload.body,
        created_at: timestamp.now(),
        comments_count: 0,
        views: 0
      })
      .then(res => {
        res.get().then(doc => {
          let userRef = db.collection("users").doc(auth.currentUser.uid);
          userRef.update("topics_count", fieldValue.increment(1));
          userRef.get().then(user => {
            const author = user.data();
            Loading.hide();
            commit("setNewDocAdded", {
              ...payload,
              id: res.id,
              author_name: author.name,
              author_photoUrl: author.photoUrl,
              created_at: doc.data().created_at,
              comments_count: 0
            });
            Notify.create({
              message: "New topic added!",
              position: "center",
              color: "positive",
              icon: "thumb_up"
            });
          });
        });
      })
      .catch(err => {
        Loading.hide();
        console.log(err.message);
      });
  },
  // Get Topics
  async getTopics({ commit }) {
    commit("clearTopics", []);
    commit("setLoadingState", true);
    let ref = db.collection("topics").orderBy("created_at", "desc");
    await ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let topic = doc.data();
        topic.id = doc.id;
        let userRef = db.collection("users").doc(topic.author_id);
        userRef.get().then(snap => {
          let user = snap.data();
          topic.author_name = user.name;
          topic.author_photoUrl = user.photoUrl;
          commit("setTopics", topic);
        });
      });
    });
    commit("setLoadingState", false);
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
          icon: "check"
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
    ref
      .add({
        author_id: auth.currentUser.uid,
        topic_id: payload.topic_id,
        reply_to: payload.reply_to,
        body: payload.body,
        created_at: timestamp.now()
      })
      .then(res => {
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
    let doc = await ref.get();
    let topic = doc.data();
    let userRef = db.collection("users").doc(topic.author_id);
    userRef.get().then(snap => {
      let user = snap.data();
      commit("setDocDetails", {
        ...topic,
        id: doc.id,
        author_name: user.name,
        author_photoUrl: user.photoUrl,
        comments: []
      });
      dispatch("getComments", doc.id);
    });
    Loading.hide();
  },
  //Get Comments
  getComments({ commit }, id) {
    let topicRef = db
      .collection("topics")
      .doc(id)
      .collection("comments");
    topicRef.orderBy("created_at", "asc").onSnapshot({ includeMetadataChanges: false }, snap => {
      let changes = snap.docChanges();
      changes.forEach(change => {
        let comment = change.doc.data();
        let userRef = db.collection("users").doc(comment.author_id);
        userRef.get().then(doc => {
          let user = doc.data();
          if (change.type == "added") {
            commit("setComments", {
              ...comment,
              author_name: (user.name ? user.name : 'ccweb user'),
              author_photoUrl: (user.photoUrl ? user.photoUrl : null),
              id: change.doc.id
            });
          } else if (change.type == "removed") {
            commit("setRemoveComment", change.doc.id);
          }
        });
      });
    });
  },
  //Remove Comment
  async removeComment({}, payload) {
    let topicRef = db.collection("topics").doc(payload.topic_id);
    let commentRef = topicRef.collection("comments").doc(payload.id);
    const res = await commentRef.delete();
    //Decrement comments count
    if (res) {
      const decrement = topicRef.update(
        "comments_count",
        fieldValue.increment(-1)
      );
    }
    Notify.create({
      message: "Comment deleted!",
      position: "top",
      color: "positive",
      icon: "thumb_up"
    });
  },
  //Clear Topic Details on leaving
  clearTopicDetails ({ commit }) {
    commit('setDocDetails', null)
  }
};

const mutations = {
  setLoadingState: (state, payload) => (state.topic_loading_state = payload),
  clearTopics: (state, payload) => (state.topics = payload),
  setNewDocAdded: (state, payload) => state.topics.unshift(payload),
  setYourTopics: (state, payload) => (state.your_topics = payload),
  setTopics: (state, payload) => state.topics.push(payload),
  setUpdatedDoc: (state, payload) => {
    state.topic_details.title = payload.title;
    state.topic_details.body = payload.body;
  },
  setRemovedDoc: (state, id) =>
    (state.topics = state.topics.filter(topic => topic.id !== id)),
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
