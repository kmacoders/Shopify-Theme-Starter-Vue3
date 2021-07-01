<template>
  <button class="xo-btn">
    {{ title }}
  </button>
</template>

<script>
import { ref } from "vue"
export default {
  name: 'xo-button',
  setup() {
    const title = ref('Global atomic button')

    return {
      title
    }
  }
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
