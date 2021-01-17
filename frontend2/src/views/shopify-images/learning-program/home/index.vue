<template>
  <div>
    <AppBar />
    <v-container fluid>
    </v-container>
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
}
</script>
