import { db, timestamp } from "boot/firebase";
import { Notify, Loading } from "quasar";

const state = {
  messages: []
};

const getters = {};

const actions = {
  // Adding New Message
  async addNewMessage({ commit }, payload) {
    Loading.show();
    try {
      let ref = db.collection("messages");
      const res = await ref.add({
          name: payload.name,
          title: payload.email,
          body: payload.body,
          created_at: timestamp.now(),
      })
      const doc = res.get()
      Loading.hide();
      Notify.create({
        message: "Message Sent!",
        position: "center",
        color: "positive",
        icon: "thumb_up"
      });
    } catch (e) {
      Loading.hide();
      console.log(e)
    }
  }

};

const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
