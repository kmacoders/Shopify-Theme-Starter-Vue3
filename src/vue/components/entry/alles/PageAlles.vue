<template>
  <div class="xo-container" v-show="!isCollectionLoading">
    <div class="alles-filter">
      <div class="alles-filter__title">
        <h3>ALLES</h3>
        <span>({{countAllProduct}} producten)</span>
      </div>
      <div class="alles-filter__sort">
        <sort-list
          :default-select="handleChoosen"
          @onClickOption="updateSort">
        </sort-list>
      </div>
    </div>
    <div class="alles-collections">
      <template v-if="handleChoosen === 'product-type'">
        <template v-for="(collection, index) in allCollections">
          <div class="alles-collection" :key="index">
            <template  v-if="collection.products.length > 0">
              <div class="alles-collection__heading">
                <h3>{{collection.title}}</h3>
              </div>
              <div class="alles-collection__products xo-row">
                <template v-for="(product, index) in collection.products">
                  <div class="alles-collection__item xo-col-6 xo-col-md-4 xo-col-lg-3" :key="index">
                    <product-item
                      is-exist-button
                      :variants="product.variants"
                      :handle="product.handle"
                      :featured-image="product.featuredImage.originalSrc"
                      :title="product.title"
                    >
                    </product-item>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="alles-collection__products xo-row">
          <template v-for="product in allProducts">
            <div class="alles-collection__item xo-col-6 xo-col-md-4 xo-col-lg-3" :key="generateKey(product.id)">
              <product-item
                is-exist-button
                :variants="product.variants"
                :handle="product.handle"
                :featured-image="product.featuredImage.originalSrc"
                :title="product.title"
              >
              </product-item>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductItem from 'Vue/components/globals/ProductItem.vue';
import AddToCartBtn from 'Vue/components/globals/AddToCartBtn.vue';
import SortList from './components/SortList.vue';
import store from 'Vue/store/index';
import { IProduct } from 'Types/shopify/product.type';
import { updateTime } from 'Helpers/utils';
import { setParam } from 'Helpers/url/url';
import { mapActions, mapGetters } from 'vuex';

type TSortType = 'product-type' | 'lowest-price' | 'highest-price';
interface ICollectionInfo {
  title: string;
  id: string;
}

declare const allCollectionsAllesInfo: ICollectionInfo[];

@Component({
  store,
  computed: {
    ...mapGetters('CollectionStore', {
      isCollectionLoading: 'getIsCollectionLoading',
    }),
  },
  methods: {
    ...mapActions('CollectionStore', [
      'onDisabledLoading',
    ]),
  },
  components: {
    ProductItem,
    AddToCartBtn,
    SortList
  }
})
export default class PageAlles extends Vue {
  isCollectionLoading!: boolean;

  onDisabledLoading!: () => void;

  /** Contain collection + products */
  allCollections: any = [];

  /** Contain all products */
  allProducts: IProduct[] = [];

  handleChoosen: TSortType = this.useHandleChoosen();

  async mounted(): Promise<void> {
    this.allCollections = await Promise.all(allCollectionsAllesInfo.map(async (collectionInfo: ICollectionInfo) => {
      const products = await this.getProductsFromCollection(collectionInfo.id);
      products.forEach((product) => {
        product.price = product.variants[0].price;
        this.allProducts.push(product);
      })
      return {
        title: collectionInfo.title,
        products,
      }
    }))

    console.log(this.allProducts);

    this.onDisabledLoading();
    this.initialSortingReload();
  }

  generateKey(key: string): string {
    return `${key}-${Math.random()}`
  }

  /**
   * Return products arr inside collection ( handle )
   */
  async getProductsFromCollection(id: string): Promise<IProduct[]> {
    const res = await fetch(`https://cdn.xopify.com/custom-app/upfrontreep/collections-${id}.json?${updateTime()}`);
    if (!res.ok) throw new Error('Bad response from server');

    const listProducts: IProduct[] = await res.json();
    return listProducts;
  }

  get countAllProduct(): number {
    return this.allProducts.length;
  }

  /**
   * Emit handle from SortList component
   */
   updateSort(handle: TSortType) {
    this.handleChoosen = handle;
    switch(handle) {
      case 'lowest-price': {
        setParam('sort_by', 'price-descending');
        this.sortLowestPrice()
        break;
      }

      case 'highest-price': {
        setParam('sort_by', 'price-ascending');
        this.sortHighestPrice();
        break;
      }

      default:
        setParam('sort_by', 'product-type')
        break;
    }
  }

  sortLowestPrice(): void {
    const sortedLowestProduct = this.allProducts.sort((prevProduct: IProduct, nextProduct: IProduct):number => {
      return prevProduct.price > nextProduct.price ? 1 : -1;
    })
    this.allProducts = sortedLowestProduct;
  }

  sortHighestPrice(): void {
    const sortedHighestProduct = this.allProducts.sort((prevProduct: IProduct, nextProduct: IProduct):number => {
      return prevProduct.price < nextProduct.price ? 1 : -1;
    })
    this.allProducts = sortedHighestProduct;
  }

  initialSortingReload(): void {
    const urlSearch = window.location.search;
    switch(urlSearch) {
      case '?sort_by=price-descending': {
        this.sortLowestPrice();
        break;
      }

      case '?sort_by=price-ascending': {
        this.sortHighestPrice();
        break;
      }

      default:
        break;
    }
  }

  useHandleChoosen(): TSortType {
    const urlSearch = window.location.search;
    switch(urlSearch) {
      case '?sort_by=price-descending': return 'lowest-price';
      case '?sort_by=price-ascending': return 'highest-price';
      default: return 'product-type'
    }
  }
}
</script>
