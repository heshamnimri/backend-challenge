<template>
  <div>
    <AppBar />
    <v-container fluid>
      <v-row>
        <v-col v-for="card in appModule.learningPrograms" :key="card.title" :sm="6" :md="4">
          <v-card
            tile
            @click="routeToLearningProgram(card.title)"
          >
            <v-img
              :src="card.src"
              class="white--text align-end"
              height="500px"
              width="750"
              name="card.name"
            >
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-text v-text="card.subtitle"></v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';

import AppBar from './AppBar.vue';

@Component({
  name: 'AppMain',
  components: {
    AppBar,
  },
})
export default class extends Vue {
  private appModule = getModule(AppState, this.$store)

  created() {
    this.appModule.RESET_CURRENT_LEARNING_PROGRAM();
    this.appModule.setupLearningPrograms();
  }

  private async routeToLearningProgram(learningProgram: string) {
    await this.appModule.setCurrentLearningProgram(learningProgram);
    this.$router.push(`shopify-images/${learningProgram}/home`);
  }
}
</script>
