<template>
  <v-app>
    <Sidebar />
    <AppMain />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from './resize';
import Sidebar from './Sidebar.vue';
import AppMain from './AppMain.vue';

@Component({
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
  },
})
export default class extends mixins(ResizeMixin) {
}
</script>
