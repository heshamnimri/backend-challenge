<template>
  <div
    :class="wrapperStyle"
    class="app-wrapper"
  >
    <div
      v-if="wrapperStyle.mobile && wrapperStyle.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from './mixin/resize';

import { Navbar, Sidebar, AppMain } from './components';

@Component({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
})

export default class extends mixins(ResizeMixin) {
  get wrapperStyle() {
    return {
      hideSidebar: !this.appModule.sidebarIsOpen,
      openSidebar: this.appModule.sidebarIsOpen,
      mobile: this.deviceIsMobile,
      withoutAnimation: !this.appModule.showSidebarAnimation,
    };
  }

  handleClickOutside() {
    this.appModule.setSidebar(false);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/_mixins.scss";
@import "~@/styles/_variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}

/* for mobile response */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
