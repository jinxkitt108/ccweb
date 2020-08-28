<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        v-if="projects"
        title="Projects"
        :data="projects"
        :columns="columns"
        row-key="id"
        no-data-label="I didn't find anything for you"
        :loading="table_loading"
      >
        <template v-slot:top-right>
          <q-btn
            @click="newproject_dialog = true"
            label="Add Project"
            dense
            no-caps
            flat
            style="border:2px solid #5a79ef; border-style: dashed"
            icon="add"
        /></template>

        <template v-slot:no-data="{ message }">
          <div class="q-pa-md q-gutter-md full-width">
            <q-banner rounded class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="warning" />
              </template>
              <span class="text-h6">{{ message }}</span>
              <template v-slot:action>
                <q-btn
                  @click="reloadProjects"
                  flat
                  color="white"
                  label="Retry"
                  :loading="loading"
                />
              </template>
            </q-banner>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>

            <q-td key="date_started" :props="props">
              {{ props.row.date_started }}
            </q-td>

            <q-td key="status" :props="props">
              <q-btn
                @click="project_id = props.row.id"
                :color="status_color(props.row.status)"
                class="text-capitalize"
                no-caps
                :label="props.row.status"
                size="md"
                rounded
              />
              <q-popup-edit
                v-model="project_status"
                @before-show="updatingStatus(props.row)"
                buttons
                @save="saveStatus"
              >
                <q-select
                  v-model="project_status"
                  :options="['finished', 'abandoned', 'ongoing']"
                  hide-bottom-space
                  dense
                  options-dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>

            <q-td key="actions" :props="props">
              <q-btn
                @click="openLink(props.row.url)"
                icon="link"
                size="sm"
                round
                flat
              />
              <q-btn
                @click="editingProject(props.row)"
                icon="edit"
                size="sm"
                round
                flat
              />
              <q-btn
                @click="deletingProject(props.row.id)"
                icon="delete"
                size="sm"
                round
                flat
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-dialog
        v-model="newproject_dialog"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card style="width: 500px" class="q-pa-md">
          <q-card-section>
            <h1 class="text-h6 q-mb-lg">
              {{ edit_mode ? "Edit" : "Fill" }} Details
            </h1>
            <q-form
              @submit="edit_mode ? saveEdit() : newProject()"
              class="q-gutter-md"
            >
              <q-input v-model="new_project.name" label="Project Name" filled />
              <q-input
                v-model="new_project.url"
                label="URL"
                rounded
                outlined
                dense
              />
              <q-input
                v-model="new_project.date_started"
                type="date"
                dense
                hint="Date Started"
              />
              <div class="row justify-end">
                <q-btn @click="close" label="Close" color="dark" />
                <q-btn type="submit" label="Save" flat />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  watch: {
    newproject_dialog(val) {
      !val && this.new_project.reset();
    }
  },

  data() {
    return {
      popup_hide: false,
      project_status: "",
      edit_mode: false,
      table_loading: false,
      loading: false,
      newproject_dialog: false,
      new_project: new Form({
        id: "",
        name: "",
        url: "",
        date_started: null,
        status: ""
      }),
      columns: [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: row => row.details.name,
          sortable: true
        },
        {
          name: "date_started",
          label: "Date Started",
          align: "left",
          field: row => row.details.date_started,
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: row => row.details.status,
          sortable: true
        },
        {
          name: "actions",
          label: "Actions",
          align: "center",
          field: row => row.details.url
        }
      ]
    };
  },

  computed: {
    ...mapState("projects", ["projects"])
  },

  methods: {
    ...mapActions("projects", ["addNewProject", "updateProject", "removeProject"]),

    status_color(val) {
      if (val == "finished") return "green";
      else if (val == "ongoing") return "blue";
      else return "red";
    },

    updatingStatus(data) {
      this.new_project.fill(data);
      this.new_project.id = data.id;
      this.project_status = data.status;
    },

    saveStatus(status) {
      this.new_project.status = this.project_status;
      this.updateProject(this.new_project).then(() => {
        this.new_project.reset();
      });
      this.popup_hide = 1;
    },

    reloadProjects() {
      this.table_loading = true;
      this.getProjects().then(() => {
        this.table_loading = false;
      });
    },

    openLink(url) {
      window.open(url, "_blank");
    },

    editingProject(project) {
      this.edit_mode = true;
      this.new_project.fill(project);
      this.newproject_dialog = true;
    },

    saveEdit() {
      this.updateProject(this.new_project).then(() => {
        this.new_project.reset();
        this.newproject_dialog = false;
      });
    },

    deletingProject(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete the project?",
          cancel: true
        })
        .onOk(() => {
          this.removeProject(id);
        });
    },

    close() {
      this.newproject_dialog = false;
    },

    newProject() {
      this.addNewProject(this.new_project).then(() => {
        this.newproject_dialog = false;
      });
    }
  }
};
</script>
