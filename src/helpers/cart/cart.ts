import { ICart, IItemsResponse, IProperty } from 'Types/shopify/cart.type';

/**
 * Get current json state of cart object
 * @example
 *
 * ```
 * import * as Cart from './cart';
 *
 * Cart.getCartState().then((cartState) => {
 *  console.log(cartState);
 * })
 * ```
 */
const getCartState = async (): Promise<ICart> => {
  const res = await fetch('/cart.js');
  if (!res.ok) throw new Error('Bad response from server');
  const cart = await res.json();

  return cart;
};

/**
  * Add item to cart
  *
  * @example
  *
  * ```
  * import * as Cart from './cart';
  *
  * Cart.addItem(30031999, 1, {
  *   Note: 'Custom me...'
  * }, (cartState, res) => {
  *    console.log(cartState);
  *    console.log(res);
  * }, (err) => {
  *    console.log(err);
  * })
  * ```
  * @param {string|number} id - Variant ID
  * @param {number} quantity - Quantity to add
  * @param {IProperty} properties - Properties
  * @param {onSuccess} onSuccess - Callback on success
  * @param {onError} onError - Callback on fail
  */
const addItem = async (config: {
  id: string | number,
  quantity?: number,
  properties?: IProperty,
  onSuccess?: (cartState: ICart, res: IItemsResponse) => void,
  onError?: (err: Error) => void,
}): Promise<void> => {
  const {
    id,
    quantity,
    properties,
    onSuccess,
    onError,
  } = config;

  const formData = {
    items: [{
      id,
      quantity: quantity || 1,
      properties: properties || {},
    }],
  };

  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Bad response from server');
    const cart = await getCartState();
    const result = await res.json();
    onSuccess && onSuccess(cart, result);
  } catch (error) {
    onError && onError(error);
  }
};

/**
 * Update item in Cart by linte item's key ( line item's key dymamic )
 *
 * @example
 *
 * ```
 * import * as Cart from './cart';
 *
 * Cart.updateItemByKey('37851241250968:da512398045188e1ecf31bb67a64c798', 3, {
 *   Note: 'Custom me...'
 * }, (cartState) => {
 *    console.log(cartState);
 * }, (err) => {
 *    console.log(err);
 * })
 * ```
 *
 * @param {string} key  - Line item's key
 * @param {number} quantity - Quantity update
 * @param {IProperty} properties - Properties
 * @param {onSuccess} onSuccess - Callback on success
 * @param {onError} onError - Callback on fail
 */
const updateItemByKey = async (config: {
  key: string,
  quantity?: number,
  properties?: IProperty,
  onSuccess?: (cartState: ICart) => void,
  onError?: (err: Error) => void,
}): Promise<void> => {
  const {
    key,
    quantity,
    properties,
    onSuccess,
    onError,
  } = config;

  const formData = {
    id: key,
    quantity,
    properties,
  };

  try {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Bad response from server');
    const cart = await res.json();
    onSuccess && onSuccess(cart);
  } catch (error) {
    onError && onError(error);
  }
};

/**
 * Update item in Cart by line
 * Shopify uses a 1-based index for line items,
 * so the index of the first line item in a cart is 1,
 * not 0 as is common in many programming languages.
 *
 * @example
 *
 * ```
 * import * as Cart from './cart';
 *
 * Cart.updateItemByLine(2, 3, {
 *   Note: 'Custom me...'
 * }, (cartState) => {
 *    console.log(cartState);
 * }, (err) => {
 *    console.log(err);
 * })
 * ```
 *
 * @param {string} line  - Line
 * @param {number} quantity - Quantity update
 * @param {IProperty} properties - Properties
 * @param {onSuccess} onSuccess - Callback on success
 * @param {onError} onError - Callback on fail
 */
const updateItemByLine = async (config: {
  line: number,
  quantity?: number,
  properties?: IProperty,
  onSuccess?: (cartState: ICart) => void,
  onError?: (err: Error) => void,
}): Promise<void> => {
  const {
    line,
    quantity,
    properties,
    onSuccess,
    onError,
  } = config;

  const formData = {
    line,
    quantity,
    properties,
  };

  try {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Bad response from server');
    const cart = await res.json();
    onSuccess && onSuccess(cart);
  } catch (error) {
    onError && onError(error);
  }
};

/**
 * Clear all item in Cart
 *
 * @example
 *
 * ```
 * import * as Cart from './cart';
 *
 * Cart.clearCart((cartState) => {
 *    console.log(cartState);
 * }, (err) => {
 *    console.log(err);
 * })
 * ```
 *
 * @param {onSuccess} onSuccess - Callback on success
 * @param {onError} onError - Callback on fail
 */
const clearCart = async (config: {
  onSuccess?: (cartState: ICart) => void,
  onError?: (err: Error) => void,
}): Promise<void> => {
  const {
    onSuccess,
    onError,
  } = config;

  try {
    const res = await fetch('/cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Bad response from server');
    const cartState = await res.json();
    onSuccess && onSuccess(cartState);
  } catch (error) {
    onError && onError(error);
  }
};

export {
  getCartState,
  addItem,
  updateItemByKey,
  updateItemByLine,
  clearCart,
};
