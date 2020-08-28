<template>
  <q-page padding>
    <q-card class="q-mx-auto q-pa-md" style="max-width: 1000px">
      <q-card-section>
        <div class="q-mb-sm">
          <q-btn to="/discussions" icon="arrow_back" label="Back To Topics" flat />
        </div>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="50px" color="indigo" text-color="white">
              AA
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-h5">{{
              topic_details.title
            }}</q-item-label>
            <q-item-label caption
              >by Author<span class="text-italic q-ml-md"
                >{{formatDate(topic_details.created_at)}}</span
              ></q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section v-html="topic_details.body" />
      <q-card-section>
        <q-input
          @click="openDialog"
          type="textarea"
          placeholder="Type comment.."
          style="height: 50px"
          readonly
          outlined
          dense
        />
        <q-dialog v-model="dialog_comment" position="bottom">
          <q-card style="width: 700px; max-width: 80vw;" class="q-pa-sm">
            <q-card-section>
              <q-form @submit="saveComment" class="q-gutter-md">
                <q-input
                  v-model="comment_form.body"
                  type="textarea"
                  placeholder="Type comment.."
                  outlined
                  dense
                />
                <div class="row q-gutter-sm">
                  <q-space />
                  <q-btn label="Cancel" flat v-close-popup />
                  <q-btn type="submit" label="Submit" color="indigo" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
        <div class="q-my-lg">Comments ({{topic_details.comments.length}})</div>
      </q-card-section>
      <q-card-section>
          <div class="q-pa-sm q-mb-md bg-grey-2" v-for="comment in topic_details.comments" :key="comment.id">
            <q-item>
              <q-item-section avatar>
                  <q-avatar size="40px" color="indigo" text-color="white">
                    AA
                  </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-caption">Author Brand</q-item-label>
                <q-item-label caption>{{formatDate(comment.created_at)}}</q-item-label>
              </q-item-section>
              <q-btn @click="deleteComment(comment.id)" label="[Delete]" text-color="red" flat no-caps class="absolute-top-right text-caption" />
            </q-item>
            <div class="q-mx-auto q-mb-md text-caption" style="max-width: 700px">
              {{comment.body}}
            </div>
          </div>
          <div class="row justify-center">
              <q-btn @click="openDialog" label="Add Comment" rounded no-caps />
          </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      topic: null,
      dialog_comment: false,
      comment_form: new Form({
        topic_id: this.$route.params.id,
        reply_to: "",
        body: ""
      })
    };
  },

  watch: {
    dialog_comment(val) {
      !val && this.comment_form.reset();
    }
  },

  computed: {
    ...mapState("topics", ["topic_details"])
  },
  methods: {
    ...mapActions("topics", ["addNewComment", "removeComment"]),
    deleteComment(id){
      this.removeComment({topic_id: this.$route.params.id, id: id})
    },
    formatDate(timestamp) {
      let date = new Date(timestamp.seconds * 1000);
      return quasarDate.formatDate(date, 'ddd MMMM D, YYYY | h:mm a')
    },
    saveComment() {
      this.addNewComment(this.comment_form).then(() => {
        this.closeDialog();
      });
    },
    closeDialog() {
      this.dialog_comment = false;
    },
    openDialog() {
      this.dialog_comment = true;
    }
  }
};
</script>
