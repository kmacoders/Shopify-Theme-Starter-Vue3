<template>
  <div class="star-rating">
    <span v-for="(n, index) in 5" :key="index">
      <svg
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 20px; height: 20px"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g fill="none">
          <path d="M0 0h24v24h-24Z"></path>
          <path
            stroke="#323232"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 2.896l2.935 5.993 6.565.967 -4.75 4.662 1.121 6.586 -5.871-3.111 -5.871 3.111 1.121-6.586 -4.75-4.662 6.564-.967Z"
          ></path>
        </g>
      </svg>
    </span>
    <div class="star-rating__current" :style="{ width: getRating + '%' }">
      <span v-for="(n, index) in 5" :key="index"
        ><svg
          version="1.1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 20px; height: 20px"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g fill="none">
            <path d="M0 0h24v24h-24Z"></path>
            <path
              style="fill: #000"
              stroke="#323232"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 2.896l2.935 5.993 6.565.967 -4.75 4.662 1.121 6.586 -5.871-3.111 -5.871 3.111 1.121-6.586 -4.75-4.662 6.564-.967Z"
            ></path>
          </g></svg
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const StarProps = Vue.extend({
  props: {
    current: Number,
  },
});

@Component
export default class StarVoting extends StarProps {
  get getRating(): number {
    return +((this.current / 5) * 100).toFixed(2);
  }
}
</script>

<style lang="scss">
.star-rating {
  color: #000;
  display: inline-block;
  position: relative;
  transform: translate(-6px);

  @media (min-width: 768px) {
    svg {
      width: 30px !important;
      height: 30px !important;
    }
  }
}

.star-rating__max,
.star-rating__current {
  position: absolute;
  top: 0;
}

.star-rating__current {
  overflow: hidden;
  white-space: nowrap;
}
</style>
