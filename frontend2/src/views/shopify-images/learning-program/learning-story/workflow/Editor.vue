<template>
  <div style="padding: 50px;">
    <WorkflowTree
      :element="workflowModule.workflowTree"
    />
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Ref,
} from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import WorkflowState from '@/store/modules/workflow';

import WorkflowTree from '@/components/editor/WorkflowTree.vue';

@Component({
  name: 'Editor',
  components: {
    WorkflowTree,
  },
})
export default class extends Vue {
  private workflowModule = getModule(WorkflowState, this.$store)

  async created() {
    this.workflowModule.setupTriggerOptions();
    this.workflowModule.setupactionOptions();
    this.workflowModule.setupControlOptions();
    await this.workflowModule.setupWorkflowMap();
    await this.workflowModule.updateWorkflowTree();
  }
}
</script>
