<template>
  <q-page>
    <div class="q-mx-auto q-my-md" style="max-width: 1000px">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="topics" label="Topics" />
        <q-tab
          v-if="currentUser"
          @click="fetchYourTopics"
          name="your_topics"
          label="Your Topics"
        />
        <q-tab v-if="currentUser" name="create" label="Create Topic" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="topics">
          <q-table
            flat
            :data="topics"
            row-key="id"
            :filter="filter"
            :rows-per-page-options="[10, 20]"
            no-data-label="This might be connection issue."
            :loading="topic_loading_state"
            hide-header
            dense
          >
            <template v-slot:no-data>
              <div class="q-pa-md full-width">
                <q-item v-for="(n, index) in 3" :key="index">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton height="100px" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton height="10px" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
            <template v-slot:top>
              <q-input
                style="width: 500px"
                color="grey"
                outlined
                rounded
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body="props">
              <q-tr
                :props="props"
                @click="view(props.row.id)"
                class="cursor-pointer"
              >
                <q-td key="title" :props="props">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar color="indigo" text-color="white">
                        <q-img
                          v-if="props.row.author_photoUrl"
                          :src="props.row.author_photoUrl"
                        />
                        <span v-else>{{
                          props.row.author_name.charAt(0)
                        }}</span>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="text-bold text-subtitle1">
                      <q-item-label class="text-indigo-10">
                        {{ props.row.title }}
                      </q-item-label>
                      <q-item-label caption>
                        by {{ props.row.author_name }}
                      </q-item-label>
                      <q-item-label caption class="q-mb-sm">
                        <span class="text-italic">{{
                          formatDate(props.row.created_at)
                        }}</span>
                      </q-item-label>
                      <q-item-label caption class="text-grey-8">
                        {{ props.row.comments_count }}
                        <q-icon name="chat" class="q-mr-lg" />
                        {{ props.row.views }}
                        <q-icon name="visibility" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="your_topics">
          <q-table
            flat
            :data="your_topics"
            row-key="id"
            :filter="filter"
            :rows-per-page-options="[10, 20]"
            no-data-label="This might be a connection issue."
            hide-header
          >
            <template v-slot:no-data>
              <div class="q-pa-md full-width">
                <q-item v-for="(n, index) in 3" :key="index">
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton height="100px" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton height="10px" />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
            <template v-slot:top-right>
              <q-input
                color="grey"
                outlined
                rounded
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props" @click="view(props.row.id)">
                <q-td key="title" :props="props">
                  <q-item>
                    <q-item-section class="text-bold text-subtitle1">
                      <q-item-label class="text-indigo-10">
                        {{ props.row.title }}
                      </q-item-label>
                      <q-item-label caption>
                        <span class="text-italic"
                          >{{ formatDate(props.row.created_at) }}</span
                        >
                      </q-item-label>
                      <q-item-label caption class="text-grey-8">
                        {{ props.row.comments_count }}
                        <q-icon name="chat" class="q-mr-lg" />
                        {{ props.row.views }}
                        <q-icon name="visibility" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="create">
          <q-card flat>
            <q-card-section>
              <div class="text-h6">Create Topic</div>
              <q-form @submit="saveTopic" class="q-gutter-md">
                <q-input v-model="topic_form.title" label="Title" dense />

                <!-- <quasar-tiptap v-bind="options" /> -->
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
                    type="submit"
                    label="Save"
                    color="indigo"
                    rounded
                    style="width: 100px"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
          <q-card class="q-pa-md q-my-md" flat>
            <div class="text-h6 text-grey-7">Preview</div>
            <q-card-section v-html="topic_form.body" />
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
// import { QuasarTiptap, RecommendedExtensions } from 'quasar-tiptap'
// import 'quasar-tiptap/lib/index.css'
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      topic_dialog: false,
      tab: "topics",
      filter: "",
      options: {
        content: "content",
        editable: true
      },
      topic_form: new Form({
        title: "",
        body: ""
      })
    };
  },

  computed: {
    ...mapState("topics", [
      "topics",
      "your_topics",
      "topic_details",
      "topic_loading_state"
    ]),
    ...mapState("auth", ["currentUser"])
  },

  methods: {
    ...mapActions("topics", [
      "addNewTopic",
      "getTopics",
      "getYourTopics",
      "getTopicById"
    ]),

    fetchYourTopics() {
      this.getYourTopics();
    },

    formatDate(timestamp) {
      let date = new Date(timestamp.seconds * 1000);
      return quasarDate.formatDate(date, "ddd MMM D, YYYY | h:mma");
    },

    view(id) {
      this.getTopicById(id).then(() => {
        this.$router.push("/discussions/" + id);
      });
    },
    saveTopic() {
      if (this.topic_form.body) {
        this.addNewTopic(this.topic_form);
      } else {
        this.$q.dialog({
          title: "Alert",
          message: "Textarea field is required!"
        });
      }
    },
    closeDialog() {
      this.topic_dialog = false;
    },
    openDialog() {
      this.topic_dialog = true;
    },

    goBack() {
      this.$router.go(-1);
    }
  },

  created() {
    this.getTopics();
  }
};
</script>
