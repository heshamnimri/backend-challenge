<template>
  <div>
    <AppBar />
    <div
        class="border-b-2 border-gray-500 h-12 flex justify-end"
      >
        <v-btn elevation="0" class="self-center">
          <v-icon>mdi-plus</v-icon>
          Make a new Workflow
        </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col
          v-for="workflow in learningStoryModule.workflows"
          :key="workflow.uuid"
          :sm="6"
          :md="4"
        >
          <v-card
            tile
          >
            <v-img
              src="https://www.learningjungle.com/en-CA/wp-content/uploads/2019/04/LearningJungle-hero-1024x427.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
              height="240px"
              name="card.name"
            >
              <v-card-title v-text="workflow.name"></v-card-title>
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
import LearningStoryState from '@/store/modules/learningStory';

import AppBar from './AppBar.vue';

@Component({
  name: 'AppMain',
  components: {
    AppBar,
  },
})
export default class extends Vue {
  private learningStoryModule = getModule(LearningStoryState, this.$store)

  created() {
    this.learningStoryModule.setupWorkflows();
  }
}
</script>
