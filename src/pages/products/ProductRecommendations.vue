<template>
  <div v-if="isShow" class="product-recommenddations" id="ProductRecommendations" data-vue-dom>
    <div class="products-recommendations-wrapper xo-container">
      <div class="products-recommendations-title">
        <h3>{{ sectionsProductRelated.settings.heading }}</h3>
      </div>
      <div class="xo-row">
        <a :href="'/products/' + product.handle" class="product-card xo-col-6 xo-col-md-3" v-for="product in productsRelatedArr" :key="product.id">
          <div class="product-card-img">
            <img :src="product.featured_image" />
          </div>
          <div class="product-card-info">
            <div class="product-card-info__vendor">
              {{ product.vendor | hugUppercase}}
            </div>
            <div class="product-card-info__title">
              <h5>{{ product.title }}</h5>
            </div>
            <div class="product-card-info__price">
              {{ product.price | hugMoneyFormat }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { formatMoney } from '@shopify/theme-currency';
import { IProduct } from 'Types/shopify/product.type';

declare let product: IProduct;
declare let sectionsProductRelated: any;
declare let theme: any;

@Component
export default class ProductRecommendations extends Vue {
  product: IProduct = product;
  sectionsProductRelated: any = sectionsProductRelated;
  isShowProductsRecommendations: Boolean = sectionsProductRelated.settings.showProductsRecommendations;
  productsRelatedArr : IProduct[] = [];

  async mounted() {
    await this.getProductRecommendations();
  }

  async getProductRecommendations(): Promise<void> {
    const res = await fetch(`/recommendations/products.json?product_id=${product.id}&limit=4`);
     if (!res.ok) throw new Error('Bad response from server');
    const productsRelated = await res.json();
    this.productsRelatedArr = productsRelated.products;
  }

  get isShow(): Boolean {
    const isShow = this.isShowProductsRecommendations && !(this.productsRelatedArr.length === 0);
    return isShow;
  }
}
</script>
<style lang="scss">
  @import './src/styles/utils/mixins/responsive';

  #ProductRecommendations {
    background: #F7F4F0;
    padding: 50px 0;

    @include responsive(MD) {
      padding: 85px 0;
      padding-bottom: 60px;
    }
  }
  .products-recommendations-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .xo-row {
      widows: 100%;
    }
    .product-card {
      margin-bottom: 30px;
    }
  }
  .products-recommendations-title {
    margin-bottom: 35px;
  }

  .product-card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .product-card-info__vendor {
      font-size: 11px;
      color: var(--color-theme-primary);
    }

    .product-card-info__title {
      margin: 3px 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      h5 {
        font-weight: 500;
        text-overflow: ellipsis;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
       }
    }

    .product-card-info__price {
      font-size: 15px;
      color: var(--color-body-text);
    }
  }
</style>
