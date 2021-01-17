<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse': collapse}"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          src="@/assets/logo.png"
          class="sidebar-logo"
        >
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          src="@/assets/logo.png"
          class="sidebar-logo"
        >
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'SidebarLogo',
})
export default class extends Vue {
  @Prop({ required: true }) private collapse!: boolean
}
</script>

<style lang="scss" scoped>
@import "~@/styles/_variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $navbar-height;
  line-height: $navbar-height;
  background: $menuBg;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 90%;
    & .sidebar-logo {
      width: 100%;
      height: $navbar-height;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: $navbar-height;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
