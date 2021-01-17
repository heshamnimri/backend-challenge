import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import AppState from '@/store/modules/app';

const WIDTH = 992; // refer to Bootstrap's responsive design
@Component({
  name: 'ResizeMixin',
})
export default class extends Vue {
  protected appModule = getModule(AppState, this.$store)

  protected get deviceIsMobile() {
    return false;
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.deviceIsMobile && this.appModule.sidebarIsOpen) {
      this.appModule.setSidebar(false);
    }
  }

  @Watch('appModule.globalMessage', { deep: true })
  private onGlobalMessage(text: string) {
    this.$message({
      message: this.appModule.globalMessage.message,
      duration: this.appModule.globalMessage.duration,
      type: this.appModule.globalMessage.type,
    });
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      this.appModule.setDeviceType('mobile');
      this.appModule.setSidebar(false);
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      this.appModule.setDeviceType((isMobile ? 'Mobile' : 'Desktop'));
      if (isMobile) {
        this.appModule.setShowSidebarAnimation(false);
        this.appModule.setSidebar(false);
      }
    }
  }
}
