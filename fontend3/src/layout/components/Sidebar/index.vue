<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-container">
      <el-menu
        :collapse="!appModule.sidebarIsOpen"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in appModule.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="!appModule.sidebarIsOpen"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import variables from '@/styles/_variables.scss';
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';

import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';
import { RouteConfig } from 'vue-router';
import { logger } from '@/utils/logger';

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo,
  },
})
export default class extends Vue {
  appModule = getModule(AppState, this.$store)

  created() {
    this.appModule.SET_ROUTES((this.$router as any).options.routes);
  }

  get variables() {
    return variables;
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/_variables.scss";

.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  background: $menuBg;
}
</style>
