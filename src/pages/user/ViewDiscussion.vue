<template>
  <q-page padding>
    <q-card class="q-mx-auto q-pa-md" style="max-width: 1000px">
      <q-card-section>
        <div class="q-mb-sm">
          <q-btn
            to="/discussions"
            icon="arrow_back"
            label="Back To Topics"
            flat
          />
        </div>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="50px" color="indigo" text-color="white">
              <q-img v-if="topic_details.author_photoUrl" :src="topic_details.author_photoUrl" />
              <span v-else>{{topic_details.author_name.charAt(0)}}</span>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-h5">{{
              topic_details.title
            }}</q-item-label>
            <q-item-label caption
              >by {{topic_details.author_name}}<span class="text-italic q-ml-md">{{
                formatDate(topic_details.created_at)
              }}</span></q-item-label
            >
            <q-item-label v-if="currentUser.id == topic_details.author_id">
              <q-btn @click="deleteTopic(topic_details.id)" label="Delete" text-color="red-5" no-caps flat />
              <q-btn @click="openEditDialog" label="Edit" no-caps flat />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section v-html="topic_details.body" />
      <q-card-section>
        <q-input
          @click="currentUser ? openDialog() : openLoginDialog()"
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
        <div class="q-my-lg">
          Comments ({{ topic_details.comments.length }})
        </div>
      </q-card-section>
      <q-card-section>
        <div
          class="q-pa-sm q-mb-md bg-grey-2"
          v-for="comment in topic_details.comments"
          :key="comment.id"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar size="40px" color="indigo" text-color="white">
                <q-img v-if="comment.author_photoUrl" :src="comment.author_photoUrl" />
                <span v-else>{{comment.author_name.charAt(0)}}</span>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">{{ comment.author_name}}</q-item-label>
              <q-item-label caption>{{
                formatDate(comment.created_at)
              }}</q-item-label>
            </q-item-section>
            <q-btn
              v-if="currentUser && currentUser.id == comment.author_id"
              @click="deleteComment(comment.id)"
              label="[Delete]"
              text-color="red"
              flat
              no-caps
              class="absolute-top-right text-caption"
            />
          </q-item>
          <div class="q-mx-auto q-mb-md text-caption" style="max-width: 700px">
            {{ comment.body }}
          </div>
        </div>
        <div class="row justify-center">
          <q-btn @click="currentUser ? openDialog() : openLoginDialog()" label="Add Comment" rounded no-caps />
        </div>
      </q-card-section>
    </q-card>
    <!-- Edit Topic Dialog -->
    <q-dialog maximized v-model="edit_dialog" transition-show="slide-up" transition-hide="slide-down">
      <q-card>
        <q-card-section class="q-mx-auto" style="max-width: 1000px">
          <q-btn icon="close" label="Close" class="q-mb-sm float-right" dense flat v-close-popup />
          <div class="text-h6">Edit Topic</div>
          <q-form @submit="saveTopic" class="q-gutter-md">
            <q-input
              v-model="topic_form.title"
              label="Title"
              dense
            />
            <q-editor
              :rules="[val => !!val || 'Field is required']"
              aria-required
              v-model="topic_form.body"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify']
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                [
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'subscript',
                  'superscript'
                ],
                ['token', 'hr', 'link', 'custom_btn'],
                ['print', 'fullscreen'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: [
                      'p',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6',
                      'code'
                    ]
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                ['undo', 'redo'],
                ['viewsource']
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }"
            />
            <div class="row">
              <q-space />
              <q-btn
                class="q-mr-sm"
                label="Cancel"
                flat
                v-close-popup
              />
              <q-btn
                type="submit"
                label="Save"
                color="indigo"
                rounded
                style="width: 100px"
              />
            </div>
          </q-form>
          <div class="text-h6 text-grey-7">Preview</div>
        </q-card-section>
        <q-card-section class="q-mx-auto" style="max-width: 1000px" v-html="topic_form.body" />
      </q-card>
    </q-dialog>
    <!-- Log in dialog -->
    <Login v-model="login_dialog" />
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      edit_dialog: false,
      login_dialog: false,
      topic: null,
      dialog_comment: false,
      comment_form: new Form({
        topic_id: this.$route.params.id,
        reply_to: "",
        body: ""
      }),
      topic_form: new Form({
        id: "",
        title: "",
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
    ...mapState("topics", ["topic_details"]),
    ...mapState("auth", ["currentUser"])
  },
  methods: {
    ...mapActions("topics", ["addNewComment", "removeComment", "removeTopic", "updateTopic"]),
    saveTopic(){
      this.updateTopic(this.topic_form)
    },
    openEditDialog(){
      this.topic_form.fill(this.topic_details)
      this.edit_dialog = true;
    },
    deleteTopic(id){
        this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Are you sure you want to delete the topic?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.removeTopic(id).then(() => {
          this.$router.go(-1);
        })
      })
    },
    deleteComment(id) {
      this.removeComment({ topic_id: this.$route.params.id, id: id });
    },
    formatDate(timestamp) {
      let date = new Date(timestamp.seconds * 1000);
      return quasarDate.formatDate(date, "ddd MMMM D, YYYY | h:mm a");
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
    },
    openLoginDialog() {
      this.login_dialog = true;
    }
  }
};
</script>
