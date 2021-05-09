<template>
  <div
    :class="'cart-drawer' + (isExpand ? ' is-expand' : '')"
    id="cart-drawer"
    data-vue-dom>
    <div :class="'cart-drawer__overlay' + (isExpand ? ' is-fadein' : '')" @click="toggleExpand()"></div>
    <div :class="'cart-drawer__body' + (isExpand ? ' is-expand' : '')">
      <div class="cart-drawer__header">
        <div class="cart-drawer--icon-cart">
          <svg
            width="40" height="44" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="677 32 40 44"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAYAAAAXb/p7AAADeklEQVRYR+2ZaYjNURjGf2PNmmUUCokoWQcjPogskfBBQqJIyFKURKkpa5Ip68jyhZSEhDBjxhdll6xfGEvZS7asCT06Zzqd7r3/e+f87535MO+X6d7zvu/z3Pdsz3knj2hrBEwBxgM9gebAn+iwhB71gB/AM6ACOA68TZUrLwJoFrAB6FRNQlFh34D1wKZkjqkIbgFWRCHENH4GmJgoVzKCqxL8qtvANeAToLio6ifC09JoAvQFRngOR4FpflAikKHAZc9xNnAopmrZNCOBw0AHJ+9SYKeL4xNsDLwDWjpOY4DymMnZdB2B50ADJ38f4L797BO8AIx2nDXVm7NEzqYdB5xzMF4DIv7fXIJrgHWO42lgUpbJ2fQ+9glztFURLDQbwAY8AbrliJyFKQXGOpiLgBJbQa2Dzs7gC+Ap0CZHJHUeanf39vDyRVBrTmuvNlqRCObyQM60COdFsARYaCJfAQereQhnCp7IXwe57vz+ZrBCBHcAS8wXF4FRcSAF5NgIrDbxpSK4HdAJLrsK6CapSdsDLAgl2MXcAJn8EJ0S74GvEUFBBNsCZUABsA1YlibDecBec43q6ryXIi6I4FRAqsOaxGtUReSr66u9CdoaIeOCCE4GTjoEpUTepFHFz0AL41cErM1WBXX9PXaSLwZ2RxAcDFx3fDQLx7JFUHkfAL0MgMSrlIeuqmR2ExhoBnXOtQZU0WQWNMVK6q9DLXg9qh55iK2A/VaVmDFJN0m4VBZMUMl95aHKSHFrKn8B/YDpQL7DRBtFR83vXBCUAhaZAWlsELl8BAYBlWn4x1JB4egWOgDMiQDVuTkXeJkGObnERtDiDQNmAPqrDVPfHMi3zMP8VJrErFvsBF38hoC6Bz8zJOW6Z5VgAK+q0DqCoVWsq2BdBWud5HcfTVfMgRs6TSHx7iuzTNfVLkBtBtklYHhI9hhi3UdcuQhKAq00idU77hoDSEgKiVnJN9lZEfT1nR7Nd0IQAmLF5wvQzOQo1hdNvYePZNSQAJCQ0H2AXoDWCmx3qxhY7gzoYSSJ9CEELcNYv0d0Ayi0BCWRpHjbOUlFTutB0/3dyKgMMVO6S4VL+PYwjdLunrc+V7odVjmqea7HeU3bBG0QkfB71BKcUsnqG9eE3QXmu93eZP/rUHtipnkuqqJaAn9jZixs5dR75aHpWBzxMf4BhG/ZMHg6ZSUAAAAASUVORK5CYII="
            width="40" height="44" x="677" y="32"/>
          </svg>
        </div>
        <h3 class="cart-drawer__heading">
          <span>WINKELMANDJE</span>
          <span>({{cartItemCount}} items)</span>
        </h3>
        <div @click="toggleExpand()" class="cart-drawer--close">
          <svg
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="683 42 25 25"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAC/ElEQVRYR7WYy6tPURTHPxeZKBn4CwyVN+F6i3RT8iZJmJiIkOuR9zshYipKkjddSSTvZCbPgVcXA3ldr4mB6MveOnf/9trnnHt/d09+v9/Za6/1+a291tprnxr+jQ7APOAXcAj47Z635cdMoAtwDnhXA3QGbgE9ndUHwBDgRxtSXALGOf1fgH4C2QssDow+AkYBH6sM0x5oAOoCvQ0CuQkMixhsBHoA36sIcweojdkSyFTgpGHssfPMh1bCKAYvZLYjVFcvEI3NwBrD2Bvnma+tgLkLDDLWK1gneRDJ7AKWGcIPgRFAU0kY6VdMjDfWHQeUPWRB9HsTsNZY9NplVhnPXHd/IKbyLDDZT4Qger4TWG7AKJtGAp9yPNPOxUSYHX7ZMWBWVkcMRPPbgZWGsbfOM6ltsjJRKk+7BGmm3gKR0B5giQHzBBgMfIvMX4zUCS+m7Jwe05kCkfw2YJUBozrTF/icmb/mti62xISIBWtMQSqbngLd3aJs2Q71/M8OK7byPOLXbQVWG0ruATov/NkRip0AZuQEd0X6puR3A0vzFAbzzVI0tbaoR7yOVDaV3o4i6ZuCXwfUA50MIfU0B4EFZbxX1iNe9wugm2HoJ9C1bD/TEpBUdni2+661KNxclQW5Aowp6PJnwFDgfRH5MiCpYmXZ0hb2KdJcFQW5Cow2rKngqaXcYcwLZkBeC1EE5AYw3DCSLVapoqdt6m+cTX9V54FcBsYaEGeAKcFcqoUQjDwT7WdSIKmjPHV2pNrO584zFTAWSCo7TgHTcjJB8bLCkInCxEBuuwtWTE9FZ5UA2gioCseGAlgxo8MyGiNq+a1G9zwwsUhNyMikWoiXQC9fgbMe0bVTBSg2jgKzS0J48Q3A+sQ2DVRz5UFSnih8lCdA9wGLjPlXQG+B6GKlSI+NI8CcFnoiXKZ4UdzExmGBWFuii9GEKkF4NfuBhRGdjQLRmwC9EciOanoitKt4UdxkxwEfI3o5M9fN6Pv8KnsiVLfFXeI6AjpC6v4AkWyRdVRRwh4AAAAASUVORK5CYII="
            width="25" height="25" x="683" y="42"/>
          </svg>
        </div>
      </div>

      <ul class="cart-drawer__items">
        <template v-if="existItem">
          <li class="cart-drawer__item" v-for="(item, index) in cartState.items" :key="index">
            <div class="cart-item__image">
              <img :src="item.image | imgURL('115x135', 'center')" alt="">
            </div>

            <div class="cart-item__info">
              <h4 class="cart-item__title">{{item.product_title}}</h4>
              <div class="cart-item__variant">{{item.variant_title}}</div>
              <div class="cart-item__input">
                <div class="js-input-number">
                  <button class="input-decreasement" @click="updateQuantity(Number(item.quantity-=1), item.key)">-</button>
                  <input type="text" :value="item.quantity" min="0" max="10">
                  <button class="input-increasement" @click="updateQuantity(Number(item.quantity+=1), item.key)">+</button>
                </div>
                <div class="cart-item__price">{{ item.price | hugMoneyFormat }}</div>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <div class="cart-drawer__empty">
            <h3>Empty Cart</h3>
            <a href="/" class="btn btn--is-fullwidth">
              Continue Shopping
            </a>
          </div>
        </template>
      </ul>

      <div v-if="existItem" class="cart-drawer__subtotal">
        <div class="cart-drawer__total-price">
          Totaalprijs bestelling: {{ cartState.total_price | hugMoneyFormat }}
        </div>
        <div class="cart-drawer__shiping">
          Verzendkosten: {{ 600 | hugMoneyFormat }}
        </div>
        <div class="class-drawer__final-price">
          Totaalprijs bestelling: {{ (cartState.total_price + 600) | hugMoneyFormat }}
        </div>
        <form action="/cart" method="POST" class="cart-drawer-checkout">
          <button type="submit" name="checkout" class="btn btn--is-fullwidth">
            BESTELLEN
            <span>{{ (cartState.total_price + 600) | hugMoneyFormat }}</span>
          </button>
        </form>
      </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from 'vue-class-component'
import { mapActions, mapGetters, mapState } from "vuex";
import store from 'Vue/store/index';
import * as Cart from 'Helpers/cart/cart';
import { ICart, IProperty } from 'Types/shopify/cart.type';
import { config } from "vue/types/umd";

declare let theme: any;

@Component({
  store,
  computed: {
    ...mapGetters('CartStore', {
      isExpand: 'getIsExpand',
      cartState: 'getCartState',
      cartItemCount: 'getCartItemCount'
    })
  },
  methods: {
    ...mapActions('CartStore', [
      'toggleExpand',
      'updateItemByKey',
    ])
  }
})
export default class CartDrawer extends Vue {
  /**
   * Global state
   */
  private readonly isExpand!: boolean;

  private readonly cartState!: ICart;

  private readonly cartItemCount!: number;

  toggleExpand!: () => void;

  updateItemByKey!: (config: {
    key: string,
    quantity?: number,
    properties: IProperty,
    onSuccess?: (cartState: ICart) => void;
    onError?: (err: Error) => void;
  }) => Promise<void>;

  subTotalStr: string = theme.cartStr.subTotal;

  titleStr: string = theme.cartStr.title;

  checkoutStr: string = theme.cartStr.checkout;

  get existItem():Boolean {
    return this.cartState.items.length > 0;
  }

  updateQuantity(quantity: number, key: string) {
    this.updateItemByKey({
      key,
      quantity,
      properties: {},
      onSuccess: (c) => {
        console.log(c);
      }
    })
  }
}
</script>

<style lang="scss">

</style>
