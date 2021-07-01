// import Vue from 'vue';
// import Component from 'vue-class-component';
// import store from 'Vue/store/index';
// import { updateTime } from 'Helpers/utils';
// import { IProduct } from 'Types/shopify/product.type';
// import { mapActions, mapGetters } from 'vuex';
// /**
//  * Description:
//  * Mixins Vue create list products card from 1 collection ( with collection id)
//  */
// declare let collectionId: string;

// const getProductsFromCollection = async (): Promise<IProduct[]> => {
//   if (collectionId === 'NO_CHOOSEN_COLLECTION') return [];

//   const res = await fetch(`https://cdn.xopify.com/custom-app/upfrontreep/collections-${collectionId}.json?${updateTime()}`);
//   if (!res.ok) throw new Error('Bad response from server');
//   const listProducts: IProduct[] = await res.json();

//   return listProducts;
// };

// @Component({
//   store,
//   computed: {
//     ...mapGetters('CollectionStore', {
//       isCollectionLoading: 'getIsCollectionLoading',
//     }),
//   },
//   methods: {
//     ...mapActions('CollectionStore', [
//       'onDisabledLoading',
//     ]),
//   },
// })
// export default class MixinCollectionCard extends Vue {
//   isCollectionLoading!: boolean;

//   onDisabledLoading!: () => void;

//   allProducts: IProduct[] = [];

//   async mounted(): Promise<void> {
//     const products = await getProductsFromCollection();
//     products.forEach((product) => {
//       this.allProducts.push(product);
//     });

//     this.onDisabledLoading();
//   }
// }
