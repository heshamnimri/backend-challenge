<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getModule } from 'vuex-module-decorators';
import ContactState from '@/store/modules/contacts';

@Component({
  name: 'InternalContacts',
  components: {
  },
})
export default class extends Vue {
  private contactsModule = getModule(ContactState, this.$store)
}
</script>

<style lang="scss" scoped>
</style>
