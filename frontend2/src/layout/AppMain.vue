<template>
  <v-main class="bg-gray-200 min-h-screen">
    <router-view />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AppMain',
})
export default class extends Vue {
}
</script>
