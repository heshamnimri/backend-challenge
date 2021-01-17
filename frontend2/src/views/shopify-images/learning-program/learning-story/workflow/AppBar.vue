<template>
  <v-app-bar
    app
    flat
    class="bg-white border-b-2 border-gray-500"
  >

    <v-app-bar-nav-icon
      class="focus:outline-none rounded-none"
      @click="appModule.TOGGLE_SIDEBAR"
    />

    <v-toolbar-title>Workflow 1</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-slot:extension>
      <v-tabs
        align-with-title
      >
        <v-tab>Editor</v-tab>
        <v-tab disabled>Calendar</v-tab>
        <v-tab disabled>Narrative</v-tab>
        <v-tab disabled>Code</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';

@Component({
  name: 'AppMain',
})
export default class extends Vue {
  private appModule = getModule(AppState, this.$store);
}
</script>
