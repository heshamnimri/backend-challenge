<template>
  <div>
    <AppBar />
    <div
      class="border-b-2 border-gray-500 h-12 flex justify-end overflow-auto"
    >
      <v-btn elevation="0" class="self-center">
        <v-icon>mdi-post-outline</v-icon>
        Publish
      </v-btn>
    </div>
    <div class="pt-12 overflow-auto" id="grid-scroll-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppBar from './AppBar.vue';

@Component({
  name: 'AppMain',
  components: {
    AppBar,
  },
})
export default class extends Vue {
  private handleScroll(e: any) {
    console.log(e);
  }
}
</script>
