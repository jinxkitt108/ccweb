<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="q-pa-sm bg-primary">
      <q-toolbar class="q-px-lg">
        <q-toolbar-title>
          <q-avatar square>
            <img src="~assets/app_images/logo.png" />
          </q-avatar>
          CCWeb
        </q-toolbar-title>
        <q-btn
          to="/"
          label="Home"
          flat
        />
        <q-btn
          v-if="userDetails.type == 'admin'"
          to="/admin"
          label="Admin"
          flat
        />
      </q-toolbar>
    </q-header>

    <q-page-container style="background: #370655">
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
export default {
  computed: {
    ...mapState("auth", ["userDetails"])
  }
};
</script>
