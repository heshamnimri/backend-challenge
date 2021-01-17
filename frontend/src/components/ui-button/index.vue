<template>
  <el-button
    v-bind="$attrs"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot class="button-content"/>
  </el-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'ui-button',
})
export default class extends Vue {
  @Prop({ default: true }) text!: boolean

  @Prop({ default: false }) selected!: boolean

  @Prop({ default: false }) accent!: boolean

  get buttonClasses() {
    return {
      selected: this.selected,
      accent: this.accent,
      'text-button': this.text,
    };
  }

  mounted() {
    // console.log(this.selected)
  }
}
</script>

<style lang="scss">
@import "~@/styles/_variables.scss";

.text-button {
  display: grid !important;
  place-items: center !important;
  padding: 0 10px 0px 10px !important;
  height: $button-height;
}

.text-button.is-circle {
  width: $button-height;
}

.ui-button:hover {
  background: rgba(253, 191, 87, 1) !important;
  color: black !important;
}

.ui-button:focus {
  background: $brand-color !important;
  color: white !important;
}

.selected {
  background: $brand-color !important;
  color: white !important;
}

.accent {
  background: #5bc75d !important;
  color: white !important;
}
</style>
