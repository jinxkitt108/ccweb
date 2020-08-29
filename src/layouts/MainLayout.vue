<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar square>
            <img src="~assets/app_images/logo.png" />
          </q-avatar>
          CCWeb
        </q-toolbar-title>
        <q-tabs class="desktop-only q-px-lg">
          <q-route-tab
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            :label="link.name"
            exact
          />
        </q-tabs>
        <q-btn
          v-if="currentUser.role == 'admin'"
          to="/admin/dashboard"
          label="Admin"
          flat
          exact
        />
        <q-btn
          v-if="Object.keys(currentUser).length"
          @click="logout"
          color="warning"
          label="Log Out"
          flat
        />
        <q-btn
          v-else
          @click="openDialog"
          color="warning"
          label="Log in"
          flat
        />
        <!-- Log in dialog -->
        <q-dialog v-model="login_dialog">
            <q-card class="q-pa-md" style="width: 400px">
                <div class="text-h5 text-center">Log In</div>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input label="Email" type="email" rounded outlined dense />
                  <q-input label="Password" :type="isPwd ? 'password' : 'text'" rounded outlined dense>
                    <template v-slot:append>
                      <q-icon @click="isPwd = !isPwd" :name="isPwd ? 'visibility' : 'visibility_off'" />
                    </template>
                  </q-input>
                  <div class="q-px-sm">
                    <q-btn label="Log in" class="full-width" color="indigo" rounded />
                  </div>
                </q-form>
              </q-card-section>
              <q-card-section>
                <hr><span>OR</span><hr>
              </q-card-section>
              <q-card-section class="q-gutter-md">
                <q-btn class="full-width" no-caps color="blue-8" >
                  <q-avatar size="42px" class="q-mr-sm">
                    <img src="/social_media_icons/svg/facebook.svg">
                  </q-avatar>
                  Sign In with Facebook
                </q-btn>
                <q-btn class="full-width" no-caps color="red-5">
                  <q-avatar size="42px" class="q-mr-sm">
                    <img src="/social_media_icons/svg/google-plus.svg">
                  </q-avatar>
                  Sign In with Google
                </q-btn>
              </q-card-section>
            </q-card>
        </q-dialog>
        <q-btn
          @click="drawer = !drawer"
          class="mobile-only"
          flat
          round
          dense
          icon="more_vert"
        />
      </q-toolbar>
    </q-header>

    <q-drawer class="mobile-only" v-model="drawer" :breakpoint="500">
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
          <q-item
            v-if="currentUser.role == 'admin'"
            to="/admin/dashboard"
            class="text-center"
            clickable
            v-ripple
          >
            <q-item-section class="text-bold">
              Admin
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item v-if="Object.keys(currentUser).length" class="text-center" clickable v-ripple>
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

    <!-- <q-footer reveal elevated class="bg-dark text-white q-pa-sm">
      <div class="text-center">
        <span>
          All rights reserve 2020.
        </span>
        <p class="text-caption">
          This is the official website of Clint Clarido
        </p>
      </div>
    </q-footer> -->
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
      isPwd: true,
      links: [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
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
      this.login_dialog = true
    },
    logout() {
      this.logoutUser()
    }
  }
};
</script>
