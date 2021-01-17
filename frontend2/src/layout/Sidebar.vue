<template>
  <v-navigation-drawer
      :value="appModule.sidebarIsOpen"
      :permanent="deviceIsNotMobile"
      :mini-variant="miniVariant"
      @input="setSidebarClosed"
      app
      color="#7AB65F"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <img src="@/assets/logo.jpg" style="height:150px"/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list
      >
          <v-list-item>
            <v-btn
              @click="allPhotos"
            >ALL PHOTOS</v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              @click="userPhotios"
            >MY PHOTOS</v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              @click="search"
            >SEARCH</v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              @click="upload"
            >UPLOAD</v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn
              @click="signin"
            >SIGN IN</v-btn>
          </v-list-item>

      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';
import { DeviceType } from '@/types/app';

@Component({
  name: 'Sidebar',
})
export default class extends Vue {
  private appModule = getModule(AppState, this.$store)

  private uploadParam

  private upload() {
    console.log('UPLOAD');
  }

  setSidebarClosed(value: boolean) {
    // this function recieves input from the vuetify sidebar component
    // used during mobile mode if the user clicks outside the sidebar
    // which then syncs with the store
    if (value === false) {
      this.appModule.setSidebar(false);
    }
  }
}
</script>
