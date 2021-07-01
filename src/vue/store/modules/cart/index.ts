// import { getCartState, updateItemByKey } from 'Helpers/cart/cart';
// import { ICart, IProperty } from 'Types/shopify/cart.type';
// import {
//   Action,
//   Module,
//   Mutation,
//   VuexModule,
// } from 'vuex-module-decorators';

// enum MutationType {
//   setCartState = 'SET_CART_STATE',
//   setIsExpand = 'SET_IS_EXPAND',
//   setCartItemCount = 'SET_CART_ITEM_COUNT',
// }

// declare let cartInitial: ICart;
// declare let cartItemCountInitial: number;
// @Module({
//   namespaced: true,
// })
// export default class CartStore extends VuexModule {
//   /**
//    * Toggle cart drawer
//    */
//   isExpand = false;

//   /**
//    * Initital cart state ( page reload )
//    */
//   cartState: ICart = cartInitial;

//   /**
//    * Exist item in cart
//    */
//   cartItemCount = cartItemCountInitial;

//   get getCartState(): ICart {
//     return this.cartState;
//   }

//   get getIsExpand(): boolean {
//     return this.isExpand;
//   }

//   get getCartItemCount(): number {
//     return this.cartItemCount;
//   }

//   @Mutation
//   [MutationType.setCartState](newCartState: ICart): void {
//     this.cartState = newCartState;
//   }

//   @Mutation
//   [MutationType.setCartItemCount](newCount: number): void {
//     this.cartItemCount = newCount || Number(this.cartState.item_count);
//   }

//   @Mutation
//   [MutationType.setIsExpand](): void {
//     this.isExpand = !this.isExpand;
//   }

//   @Action
//   async fetchCartState(): Promise<void> {
//     const newCartState = await getCartState();
//     this.context.commit(MutationType.setCartState, newCartState);
//     this.context.commit(MutationType.setCartItemCount, Number(newCartState.item_count));
//   }

//   @Action
//   async updateItemByKey(config: {
//     key: string,
//     quantity?: number,
//     properties: IProperty,
//     onSuccess?: (cartState: ICart) => void;
//     onError?: (err: Error) => void;
//   }): Promise<void> {
//     const {
//       key,
//       quantity,
//       properties,
//       onSuccess,
//       onError,
//     } = config;

//     const formData = {
//       id: key,
//       quantity,
//       properties,
//     };

//     try {
//       const res = await fetch('/cart/change.js', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error('Bad response from server');
//       const cart: ICart = await res.json();
//       this.context.commit(MutationType.setCartState, cart);
//       this.context.commit(MutationType.setCartItemCount, Number(cart.item_count));
//       onSuccess && onSuccess(cart);
//     } catch (error) {
//       onError && onError(error);
//     }
//   }

//   @Action
//   toggleExpand(): void {
//     this.context.commit(MutationType.setIsExpand);
//   }
// }
