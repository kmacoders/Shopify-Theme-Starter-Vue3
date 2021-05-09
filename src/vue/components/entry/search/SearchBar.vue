<template>
  <div id="search-bar" :class="['search-bar', (isSearchOpening ? 'search-bar--is-active' : '')]" data-vue-dom>
    <div class="search-bar__overlay" @click='toggleSearchBar'></div>

    <div class="search-form">
      <form action="/search"
          method="GET"
          class="search-bar__form"
      >
        <button type="submit">
          <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-search" viewBox="0 0 37 40"><path d="M35.6 36l-9.8-9.8c4.1-5.4 3.6-13.2-1.3-18.1-5.4-5.4-14.2-5.4-19.7 0-5.4 5.4-5.4 14.2 0 19.7 2.6 2.6 6.1 4.1 9.8 4.1 3 0 5.9-1 8.3-2.8l9.8 9.8c.4.4.9.6 1.4.6s1-.2 1.4-.6c.9-.9.9-2.1.1-2.9zm-20.9-8.2c-2.6 0-5.1-1-7-2.9-3.9-3.9-3.9-10.1 0-14C9.6 9 12.2 8 14.7 8s5.1 1 7 2.9c3.9 3.9 3.9 10.1 0 14-1.9 1.9-4.4 2.9-7 2.9z"/></svg>
        </button>
        <input type="text" name="q" value="" placeholder="SEARCH..." @input="handleResult($event)">
      </form>

      <div class="search-close" @click="toggleSearchBar">
        <svg width="16" height="16" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.736328 1.62598L23.7363 24.626" stroke="#000" stroke-width="2"/>
          <path d="M23.6445 1.70801L0.817893 24.5346" stroke="#000" stroke-width="2"/>
        </svg>
      </div>
    </div>

    <div class="search-result">
      <div class="search-result__heading" v-if="products.length > 0">
        <div class="search-result__quantity">{{ number }} RESULT</div>
      </div>
      <ul class="search-result__list">
        <li class="search-result__item"
            v-for="(product, index) in products" :key="index"
        >
          <a :href="product.url" class="search-result__item-link">
            <div class="search-result__img">
              <img :src="product.featured_image.url | imgURL('70x70', 'center')">
            </div>
            <div class="search-result__info">
              <div class="search-result__name">{{ product.title | hugUppercase }}</div>
              <div class="search-result__price">{{ product.price | hugMoneyFormat }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import PredictiveSearch from '@shopify/theme-predictive-search';
import { Debounce } from 'vue-debounce-decorator'
import { IProductSearch } from 'Types/shopify/product.type';
import store from 'Vue/store';
import { mapActions, mapGetters } from 'vuex';

type TDataResponse = {
  resources: {
    results?: {
      products: IProductSearch[];
    };
  };
};

@Component({
  store,
  computed: {
    ...mapGetters('SearchStore', {
      isSearchOpening: 'getIsSearchOpening',
    }),
  },
  methods: {
    ...mapActions('SearchStore', [
      'toggleSearchBar',
    ]),
  },
})
export default class SearchBar extends Vue {
  products: IProductSearch[] = [];
  number: number = 0;

  private readonly isSearchOpening!: boolean;

  toggleSearchBar!: () => void ;


  @Debounce(300)
  handleResult(e: any): void {
    const predictiveSearch = new PredictiveSearch({
      resources: {
        type: [PredictiveSearch.TYPES.PRODUCT],
        limit: 10,
        options: {
          unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.LAST,
          fields: [
            PredictiveSearch.FIELDS.TITLE,
            PredictiveSearch.FIELDS.VENDOR,
            PredictiveSearch.FIELDS.PRODUCT_TYPE,
            PredictiveSearch.FIELDS.VARIANTS_TITLE,
          ],
        },
      },
    });

    predictiveSearch.on('success', (suggestions: TDataResponse) => {
      const productSuggestions = suggestions.resources.results?.products as IProductSearch[];
      console.log(productSuggestions);
      this.number = productSuggestions.length;
      if (productSuggestions.length > 0) {
        this.products = productSuggestions;
      } else {
        this.products = [];
      }
    });
    predictiveSearch.on('error', (error: Error) => {
      console.error('Error message:', error.message);
    });

    if(!e.target.value) {
      this.products = [];
    } else {
      predictiveSearch.query(e.target.value);
    }
  }
}
</script>
