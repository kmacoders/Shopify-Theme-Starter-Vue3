<template>
  <div @click="toggleExpand" id="cart-item-count">
    <svg
      width="40"
      height="44"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="677 32 40 44">
        <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAYAAAAXb/p7AAADeklEQVRYR+2ZaYjNURjGf2PNmmUUCokoWQcjPogskfBBQqJIyFKURKkpa5Ip68jyhZSEhDBjxhdll6xfGEvZS7asCT06Zzqd7r3/e+f87535MO+X6d7zvu/z3Pdsz3knj2hrBEwBxgM9gebAn+iwhB71gB/AM6ACOA68TZUrLwJoFrAB6FRNQlFh34D1wKZkjqkIbgFWRCHENH4GmJgoVzKCqxL8qtvANeAToLio6ifC09JoAvQFRngOR4FpflAikKHAZc9xNnAopmrZNCOBw0AHJ+9SYKeL4xNsDLwDWjpOY4DymMnZdB2B50ADJ38f4L797BO8AIx2nDXVm7NEzqYdB5xzMF4DIv7fXIJrgHWO42lgUpbJ2fQ+9glztFURLDQbwAY8AbrliJyFKQXGOpiLgBJbQa2Dzs7gC+Ap0CZHJHUeanf39vDyRVBrTmuvNlqRCObyQM60COdFsARYaCJfAQereQhnCp7IXwe57vz+ZrBCBHcAS8wXF4FRcSAF5NgIrDbxpSK4HdAJLrsK6CapSdsDLAgl2MXcAJn8EJ0S74GvEUFBBNsCZUABsA1YlibDecBec43q6ryXIi6I4FRAqsOaxGtUReSr66u9CdoaIeOCCE4GTjoEpUTepFHFz0AL41cErM1WBXX9PXaSLwZ2RxAcDFx3fDQLx7JFUHkfAL0MgMSrlIeuqmR2ExhoBnXOtQZU0WQWNMVK6q9DLXg9qh55iK2A/VaVmDFJN0m4VBZMUMl95aHKSHFrKn8B/YDpQL7DRBtFR83vXBCUAhaZAWlsELl8BAYBlWn4x1JB4egWOgDMiQDVuTkXeJkGObnERtDiDQNmAPqrDVPfHMi3zMP8VJrErFvsBF38hoC6Bz8zJOW6Z5VgAK+q0DqCoVWsq2BdBWud5HcfTVfMgRs6TSHx7iuzTNfVLkBtBtklYHhI9hhi3UdcuQhKAq00idU77hoDSEgKiVnJN9lZEfT1nR7Nd0IQAmLF5wvQzOQo1hdNvYePZNSQAJCQ0H2AXoDWCmx3qxhY7gzoYSSJ9CEELcNYv0d0Ayi0BCWRpHjbOUlFTutB0/3dyKgMMVO6S4VL+PYwjdLunrc+V7odVjmqea7HeU3bBG0QkfB71BKcUsnqG9eE3QXmu93eZP/rUHtipnkuqqJaAn9jZixs5dR75aHpWBzxMf4BhG/ZMHg6ZSUAAAAASUVORK5CYII="
          width="40"
          height="44"
          x="677"
          y="32">
        </image>
    </svg>
    <span
    :class="'xo-header__cart-count'
      + (cartItemCount === 0 ? ' xo-header__cart-count--is-empty' : '')">
    {{cartItemCount}}
  </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import store from 'Vue/store';
import { mapActions, mapGetters } from 'vuex';

@Component({
  store,
  computed: {
    ...mapGetters('CartStore', {
      cartItemCount: 'getCartItemCount',
    })
  },
  methods: {
    ...mapActions('CartStore', [
      'toggleExpand'
    ])
  }
})
export default class CartItemCount extends Vue {
  /**
   * Global state
   */
  cartItemCount!: number;

  toggleExpand!: () => void;
}
</script>
