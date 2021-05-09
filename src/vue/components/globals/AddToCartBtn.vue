<template>
  <div
    :class="'btn'
      + (isSmall ? ' btn--is-small': '')
      + (isMedium ? ' btn--is-medium': '')
      + (isLarge ? ' btn--is-large': '')
      + (isRounded ? ' btn--is-rounded' : '')
      + (isLoading ? ' btn--is-loading' : '')
      + (isFullwidth ? ' btn--is-fullwidth': '')
      + (!isAvailable ? ' btn--is-soldout': '')"
    ref="btn"
    @click="addToCart()">
    <template v-if="isAvailable">
      <slot>TOEVOEGEN</slot>
    </template>
    <template v-else>
      UITVERKOCHT
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as Cart from 'Helpers/cart/cart';
import store from 'Vue/store/index';
import { mapActions, mapGetters } from 'vuex';
import { ICart } from 'Types/shopify/cart.type';

declare const Toastify: any;

const ButtonProps = Vue.extend({
  props: {
    isLarge: Boolean,
    isSmall: Boolean,
    isMedium: Boolean,
    isRounded: Boolean,
    isFullwidth: Boolean,
    variantId: Number,
    isAvailable: Boolean,
    cartPopupType: String,
  }
})

@Component({
  store,
  computed: {
    ...mapGetters('CartStore', {
      cartItemCount: 'getCartItemCount',
      cartState: 'getCartState',
    })
  },
  methods: {
    ...mapActions('CartStore', [
      'fetchCartState',
      'toggleExpand'
    ])
  }
})
export default class AddToCartBtn extends ButtonProps {
  /**
   * Global state
   */
  private readonly cartState!: ICart;

  private readonly cartItemCount!: number;

  fetchCartState!: () => Promise<void>;

  toggleExpand!: () => void;

  /**
   * Local state
   */
  isLoading = false;

  async addToCart(): Promise<void> {
    this.addLoadingIcon();
    Cart.addItem({
      id: this.variantId,
      quantity: 1,
      properties: {},
      onSuccess:  () => {
        this.fetchCartState();
        this.removeLoadingIcon();
        if (this.cartPopupType === 'drawer') {
           this.toggleExpand();
        } else {
           Toastify({
            text: `<strong>Toegevoegd aan winkelwagen</strong>`,
            className: "xo-toast-msg xo-toast-msg--is-success",
            backgroundColor: "#f9ecd3",
            duration: 2500,
            close: true,
            offset: {
              x: 10,
              y: 10
            },
          }).showToast();
        }
      },
      onError: (err) => {
        this.removeLoadingIcon();
        alert(err);
      }
    })
  }

  private addLoadingIcon(): void {
    this.isLoading = true;
  }

  private removeLoadingIcon(): void {
    this.isLoading = false;
  }
}
</script>

<style lang="scss">
  .btn {
    .product-slot-add {
      font-family: var(--font-stack-header);
    }

    .product-slot-price {
      font-family: var(--font-stack-body);
      font-weight: 100;
      margin-left: 5px;
    }
  }
</style>
