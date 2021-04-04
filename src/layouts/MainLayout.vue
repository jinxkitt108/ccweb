<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal>
      <q-toolbar class="bg-primary">
        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer">
          <q-img src="app_icons/ccweb-logo.png" style="width: 100px" />
        </q-toolbar-title>
        <q-btn v-if="currentUser" color="indigo-1" round>
          <q-avatar color="indigo">
            <q-img v-if="currentUser.photoUrl" :src="currentUser.photoUrl" />
            <span v-else>{{ currentUser.name.charAt(0) }}</span>
          </q-avatar>
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item to="/account-settings" clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item @click="logout" clickable>
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          v-else
          @click="openDialog"
          color="warning"
          label="Sign in"
          flat
        />
        <q-btn
          @click="drawer = !drawer"
          v-if="$q.platform.is.mobile"
          flat
          round
          dense
          icon="more_vert"
        />
      </q-toolbar>

      <q-tabs v-if="$q.platform.is.desktop" class="q-px-lg">
        <q-route-tab
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          :label="link.name"
          exact
        />
      </q-tabs>
    </q-header>

    <Login v-model="login_dialog" />

    <q-drawer v-if="$q.platform.is.mobile" v-model="drawer" :breakpoint="500">
      <div class="text-center q-my-md">
        <q-img src="~assets/app_images/logo.png" width="80px" />
      </div>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(link, index) in links">
            <q-item
              :key="index"
              :to="link.path"
              class="text-center"
              clickable
              v-ripple
            >
              <q-item-section class="text-bold">
                {{ link.name }}
              </q-item-section>
            </q-item>
          </template>
          <q-separator />
          <q-item @click="logout" v-if="currentUser" class="text-center" clickable v-ripple>
            <q-item-section class="text-bold">
              Log Out
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { preFetch } from "quasar/wrappers";
export default {
  preFetch({ store }) {
    store.dispatch("portfolios/getPortfolios");
    store.dispatch("projects/getProjects");
  },

  data() {
    return {
      drawer: null,
      login_dialog: false,
      links: [
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses" },
        { name: "Discussions", path: "/discussions" }
      ]
    };
  },

  computed: {
    ...mapState("auth", ["currentUser"])
  },

  methods: {
    ...mapActions("auth", ["logoutUser"]),

    openDialog() {
      this.login_dialog = true;
    },

    logout() {
      this.logoutUser();
    }
  }
};
</script>
