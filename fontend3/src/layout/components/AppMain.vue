<template>
  <section class="app-main page-background">
    <router-view class=""/>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AppMain',
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
}
</style>

<style lang="scss">
@import "~@/styles/_variables.scss";

.page-background {
  background: #f6f7f8;
  min-height: calc(100vh - #{$navbar-height} - #{$page-padding});
  padding-top: calc(50px + #{$page-padding});
}
</style>
