<template>
  <div
    :class="[{'is-active': appModule.sidebarIsOpen}]"
    id="hamburger-wrapper"
  >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';

@Component({
  name: 'Hamburger',
})
export default class extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  private appModule = getModule(AppState, this.$store)

  toggleSidebar() {
    this.appModule.setShowSidebarAnimation(true);
    this.appModule.setSidebar(!this.appModule.sidebarIsOpen);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/_variables.scss";

i {
  font-size: calc(#{$navbar-height} / 2);
  margin-left: calc(#{$navbar-height} / 4);
}

#hamburger-wrapper {
  height: 100%;
  color: white;
}
</style>
