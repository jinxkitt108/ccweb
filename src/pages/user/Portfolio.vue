<template>
  <q-page class="flex flex-center q-pa-md">
    <div
      class="row shadow-2 q-ma-md q-pa-md"
      :class="{ reverse: index % 2 === 1 }"
      v-for="(item, index) in portfolios"
      :key="item.id"
      style="max-width: 1000px"
    >
      <q-card class="col-sm-12 col-md-8" flat>
        <q-card-section>
          <q-item dense>
            <q-item-section>
              <q-item-label class="text-h6">{{ item.title }}</q-item-label>
              <q-item-label>
                <q-btn label="View Website" color="indigo" rounded size="sm" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section v-html="item.editor" />
      </q-card>
      <div class="col-sm-12 col-md-4">
        <q-img
          src="~assets/app_images/svg/updated_resume.svg"
          style="max-width: 300px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("portfolios", ["portfolios"])
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
