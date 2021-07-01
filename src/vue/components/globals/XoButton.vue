<template>
  <button class="xo-btn">
    Global atomic button
  </button>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class XoButton extends Vue {

}
</script>

<style lang="scss" scoped>
button.xo-btn {
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border: 1px solid #f00;
  background-color: #fff;
}
</style>
