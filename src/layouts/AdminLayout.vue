<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar square>
            <img src="~assets/app_images/logo.png" />
          </q-avatar>
          Admin Dashboard
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Home"></q-route-tab>
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" show-if-above :breakpoint="400">
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/overview" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              Overview
            </q-item-section>
          </q-item>

          <q-item to="/dashboard" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item to="/admin-projects" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="code" />
            </q-item-section>
            <q-item-section>
              Projects
            </q-item-section>
          </q-item>

          <q-item @click="logout" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              Log Out
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="~assets/app_images/techno-background-png-1.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent q-ml-lg">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/app_images/admin.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ userDetails.name }}</div>
          <div class="text-overline text-uppercase">{{ userDetails.type }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <h3>Logo Here</h3>
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { preFetch } from "quasar/wrappers";

export default {
  preFetch({ store }) {
    store.dispatch("admin/getProjects");
  },

  data() {
    return {
      left: false,
      right: false
    };
  },

  computed: {
    ...mapState("auth", ["userDetails"])
  },

  methods: {
    ...mapActions("auth", ["logoutUser"]),

    logout() {
      this.logoutUser();
    }
  }
};
</script>
