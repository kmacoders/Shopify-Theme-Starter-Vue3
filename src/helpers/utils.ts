import * as Cart from './cart/cart';
import { qs } from './dom/dom';

/**
 * Update lại số item có trên cart icon trên thanh menu top
 */
const updateCartItemCount = ():void => {
  Cart.getCartState().then((cartState) => {
    const itemCount = Number(cartState.item_count);
    const cartItemCountEl = qs('.xo-header__cart-count') as HTMLElement;

    cartItemCountEl.innerHTML = String(cartState.item_count);
    if (itemCount > 0) {
      cartItemCountEl.classList.remove('xo-header__cart-count--is-empty');
    } else {
      cartItemCountEl.classList.add('xo-header__cart-count--is-empty');
    }
  });
};

export {
  updateCartItemCount
};
