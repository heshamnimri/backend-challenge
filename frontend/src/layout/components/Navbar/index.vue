<template>
  <div id="navbar">
    <el-row type="flex" align="middle" style="height: 100%">
      <el-col :span="1">
        <hamburger
        />
        <!-- <breadcrumb
          id="breadcrumb-container"
          class="breadcrumb-container"
        /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue';

@Component({
  name: 'Navbar',
  components: {
    // Breadcrumb,
    Hamburger,
  },
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/styles/_variables.scss";

#navbar {
  background: #7EB65E;
  height: $navbar-height;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  z-index: 1999;
}
</style>
