<template>
  <q-page padding class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-banner rounded class="bg-purple-8 text-white">
        <div class="text-h5">
            This page is under development. Thank you for visiting.
        </div>
        <template v-slot:action>
          <q-btn @click="goBack" flat color="white" icon="arrow_left" label="Go Back" />
        </template>
      </q-banner>
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
};
</script>
