<template>
  <div class="cart-container xo-container" id="cartContainer" data-vue-dom>
    <template v-if="cart.items.length === 0">
      <cart-empty isEmpty/>
    </template>

    <template v-else>
      <cart-empty/>
      <form action="/cart" method="post" class="cart-form">
        <table>
          <!-- Header table  -->
          <thead>
            <tr>
              <th>{{ productStr }}</th>
              <th class="price-title--is-mobile">{{ priceStr }}</th>
              <th>{{ quantityStr }}</th>
              <th class="head-total--is-mobile">{{ totalStr }}</th>
              <th class="head-remove-icon"></th>
            </tr>
          </thead>

          <!-- Body table  -->
          <tbody>
            <tr v-for="(item, index) in cart.items" :key="index">
              <td class="cart-meta">
                <div class="cart-meta__image">
                  <img :src="item.featured_image.url | imgURL('100x100', 'center')" :alt="item.featured_image.alt">
                </div>

                <div class="cart-meta__desc">
                  <div class="cart-meta__title">{{ item.product_title }}</div>
                  <div class="cart-meta__props" v-for="(option, index) in item.options_with_values" :key="index">
                    <span class="cart-meta__name">{{ option.name }}:&nbsp;</span>
                    <span class="cart-meta__value">{{ option.value }}</span>
                  </div>
                  <div class="cart-meta__price">{{ item.price | hugMoneyFormat}}</div>
                </div>
              </td>
              <td class="price-content--is-mobile">{{ item.price | hugMoneyFormat}}</td>
              <td class="cart-quantity">
                <input
                  type="number"
                  min="1"
                  style="width: 70px; height: 30px; border-radius: 999px"
                  class="cart-number-input"
                  :data-key="item.key"
                  :value="item.quantity"
                  @change="changeQuantityItem($event)"
                >
              </td>
              <td class="body-total--is-mobile" style="color: green">{{ item.price * item.quantity | hugMoneyFormat}}</td>
              <td class="body-remove-icon" style="width: 30px">
                <svg
                  @click="removeItem($event)"
                  :data-key="item.key"
                  style="cursor: pointer; margin-top: 6px"
                  xmlns="http://www.w3.org/2000/svg"
                  height="15pt"
                  viewBox="0 0 512 512"
                  width="15pt">
                  <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="rgba(100,100,100,0.3)"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="cart-footer">
          <div class="cart-footer__subtotal">
            <span>{{ subTotalStr }}:&nbsp;</span>
            <span>{{ subTotalPrice | hugMoneyFormat}}</span>
          </div>
          <div class="cart-footer__shipping">
            {{ taxesAndShippingAtCheckoutStr }}
          </div>
          <div class="cart-footer__checkout">
            <button class="xo-btn xo-btn--is-fullwidth" type="submit" name="checkout">
              {{ checkoutStr | hugUppercase }}
            </button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import CartEmpty from './components/CartEmpty.vue';
import * as Cart from 'Helpers/cart/cart';
import { qs } from 'Helpers/dom/dom';
import { updateCartItemCount } from 'Helpers/utils';
import { ICart } from 'Types/shopify/cart.type';

declare let Shopify: any;
declare let cart: ICart;
declare let theme: any;
declare let Toastify: any;

@Component({
  components: {
    CartEmpty,
  }
})
export default class sdf extends Vue {
  cart: ICart = cart;
  currency: string = Shopify.currency.active;

  // String locales
  productStr: string = theme.cartStr.product;
  priceStr: string = theme.cartStr.price;
  quantityStr: string = theme.cartStr.quantity;
  totalStr: string = theme.cartStr.total;
  subTotalStr: string = theme.cartStr.subTotal;
  taxesAndShippingAtCheckoutStr: string = theme.cartStr.taxesAndShippingAtCheckout;
  checkoutStr: string = theme.cartStr.checkout;

  changeQuantityItem(e: any):void {
    const itemKey = e.target.dataset.key;
    const currentQuantity = Number(e.target.value);

    Cart.updateItemByKey(itemKey, currentQuantity, {},
    (cartState) => {
      this.cart = cartState;
      const newQuantity = this.cart.items.find((item) => item.key === itemKey)?.quantity;
      if ( newQuantity !== currentQuantity) {
        Toastify({
        text: `Out of stock. Only ${newQuantity} products left`,
        className: "xo-toast-msg xo-toast-msg--is-success",
        backgroundColor: "linear-gradient(90deg, #0072ff 0%, #00d4ff 100%)",
        duration: 2000,
        close: true,
        offset: {
          x: 10,
          y: 10
        },
      }).showToast();
      }
    },
    (err) => {
      console.log(err);
    });
  }

  removeItem(e: any): void {
    const itemKey = e.target.parentElement.dataset.key;
    const REMOVE_ITEM_COUNT = 0;
    const itemTitle = this.cart.items.find((item) => item.key === itemKey)?.title;

    Cart.updateItemByKey(itemKey, REMOVE_ITEM_COUNT, {},
    (cartState) => {
      console.log(cartState);
      Toastify({
        text: `Removed ${itemTitle}`,
        className: "xo-toast-msg xo-toast-msg--is-success",
        backgroundColor: "linear-gradient(90deg, #0072ff 0%, #00d4ff 100%)",
        duration: 2000,
        close: true,
        offset: {
          x: 10,
          y: 10
        },
      }).showToast();
      this.cart = cartState;
      updateCartItemCount();
    },
    (err) => {
      Toastify({
        text: `Remove error. Try again !`,
        className: "xo-toast-msg xo-toast-msg--is-error",
        backgroundColor: "#f00",
        duration: 2000,
        close: true,
        offset: {
          x: 10,
          y: 10
        },
      }).showToast();
    });
  }

  private updateCartItemCount(): void {
    Cart.getCartState().then((cartState) => {
      const cartItemCount = qs('.xo-header__cart-count') as HTMLElement;
      cartItemCount.innerHTML = String(cartState.item_count);
    })
  }

  get subTotalPrice():number {
    let total = 0;
    this.cart.items.forEach((item) => {
      total += (Number(item.quantity) * Number(item.price));
    })

    return total;
  }

}
</script>
<style lang="scss">

</style>
