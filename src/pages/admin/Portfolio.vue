<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab name="create" label="Create" />
      <q-tab name="view_portfolios" label="View Portfolios" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="create">
        <q-form
          @submit="editMode ? updatingPortfolio() : savePortfolio()"
          class="q-pa-md q-mb-md shadow-2"
        >
          <div class="text-subtitle1">Create portfolio</div>
          <div class="row q-gutter-md q-mb-md items-start">
            <q-input
              v-model="portfolio_form.title"
              class="col"
              label="Title"
              dense
            />
            <q-input
              v-model="portfolio_form.website"
              class="col"
              type="url"
              placeholder="Website"
              rounded
              outlined
              dense
            />
          </div>
          <q-editor v-model="portfolio_form.editor" min-height="5rem" />
          <div class="row q-mt-md">
            <q-space />
            <q-btn
              type="submit"
              :label="editMode ? 'Update' : 'Save'"
              rounded
              color="blue"
              unelevated
              dense
              style="width: 120px"
            />
          </div>
        </q-form>
        <div class="text-bold text-subtitle1">Preview</div>
        <div class="q-pa-md">
          <q-card-section v-html="portfolio_form.editor" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="view_portfolios">
        <div class="q-mb-md flex flex-center">
          <q-pagination
            v-model="current"
            :max="portfolios.length"
            :direction-links="true"
          >
          </q-pagination>
        </div>
        <q-toolbar class="bg-grey-9 text-white">
          <q-toolbar-title>
            {{ portfolios[current - 1].title }}
          </q-toolbar-title>
          <q-btn @click="editPortfolio" label="Edit" flat />
          <q-btn @click="deletePortfolio" label="Delete" flat />
        </q-toolbar>
        <q-scroll-area :delay="1200" style="height: 500px;">
          <q-card-section v-html="portfolios[current - 1].editor" />
        </q-scroll-area>

        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            :max="portfolios.length"
            :direction-links="true"
          >
          </q-pagination>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      editMode: false,
      current: 1,
      tab: "create",
      portfolio_form: new Form({
        id: "",
        title: "",
        website: "",
        editor: ""
      })
    };
  },

  computed: {
    ...mapState("portfolios", ["portfolios"])
  },

  methods: {
    ...mapActions("portfolios", [
      "addNewPortfolio",
      "updatePortfolio",
      "removePortfolio"
    ]),

    deletePortfolio() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete the portfolio?",
          cancel: true
        })
        .onOk(() => {
          this.removePortfolio(this.portfolios[this.current - 1].id);
        });
    },

    // setCurrent(num) {
    //   if (num > 1) {
    //     return num - 1;
    //   }
    // },

    updatingPortfolio() {
      this.updatePortfolio(this.portfolio_form);
    },

    editPortfolio() {
      this.portfolio_form.fill(this.portfolios[this.current - 1]);
      this.editMode = true;
      this.tab = "create";
    },

    savePortfolio() {
      this.addNewPortfolio(this.portfolio_form);
    }
  }
};
</script>
