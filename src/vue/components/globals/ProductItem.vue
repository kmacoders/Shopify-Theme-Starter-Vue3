<template>
  <div class="product-item__wrapper">
    <a :href="'/products/' + handle" class="product-item__image">
      <img
        :src="lazyPlaceholderImage"
        :data-src="(featuredImage ? featuredImage : 'https://via.placeholder.com/1080x1350')"
        class="product-item__img xo-img--lazyLoad"
      >
    </a>
    <div class="product-item__infomation">
      <div class="product-item__description">
        <div class="product-item__title">
          <a :href="'/products/' + handle" class="product-item__heading">
            <span>{{ title | hugUppercase }}</span>&nbsp;
            <span v-if="quantityVariant">({{quantityVariant}})</span>
          </a>
        </div>
        <!-- Variant  -->
        <div class="product-item__variants">
          <div
            :class="'product-item__variant' + (selectedVariant.id === variant.id ? ' is-selected' : '')"
            v-for="variant in variants"
            :key="variant.id"
          >
            <div
              class="product-item__variant-icon"
              @click="onChangeSelectedVariant(variant.id)"
              @mousemove="onMouseMoveVariant(variant.id)"
              @mouseleave="onMouseLeaveVariant(variant.id)"
            >
              <template v-if="variant.image.originalSrc">
                <img :src="variant.image.originalSrc">
              </template>
              <template v-else>
                <span>x</span>
              </template>
            </div>
          </div>
        </div>
        <div class="product-item-shortmeta">{{metaVariant}}</div>
      </div>
      <!-- Add to cart  -->
      <div class="product-item__addtocart">
        <template v-if="isExistButton">
          <add-to-cart-btn
            is-rounded
            is-fullwidth
            cart-popup-type="toast"
            :variant-id="selectedVariant.id"
            :is-available="hoverVariant.available"
          >
            <span class="product-slot-add">TOEVOEGEN</span>
            <span class="product-slot-price">{{ hoverVariant.price | hugMoneyFormat }}</span>
          </add-to-cart-btn>
        </template>
        <template v-else>
          <slot></slot>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import initLazyload from 'Helpers/lazyload';
import { IVariant } from 'Types/shopify/common.type';
import AddToCartBtn from 'Vue/components/globals/AddToCartBtn.vue';
import imgURL from 'Vue/filters/imgURL';
import SplitingVariant from 'Vue/mixins/SplitingVariant';
import { VariantsEntity } from 'Types/product-information/information';

const ProductItemProps = Vue.extend({
  props: {
    isExistButton: Boolean,
    variants: {
      type: Array,
      required: true,
    },
    variantId: {
      type: Number,
      required: false,
    },
    price: Number,
    handle: String,
    featuredImage: String,
    title: String,
  }
})

@Component({
  components: {
    AddToCartBtn
  },
  mixins: [SplitingVariant],
})

export default class ProductItem extends ProductItemProps {
  metaVariant!: () => string;

  quantityVariant!: () => string;

  variantsLiquid = [];

  hoverVariant = this.variants[0] as IVariant | VariantsEntity; // for liquid | json

  selectedVariant = this.variants[0] as IVariant | VariantsEntity;

  mounted(): void {
    initLazyload();
  }

  onMouseMoveVariant(idSelected: Number): void {
    this.hoverVariant = this.variants.find((variant: any) => variant.id === idSelected) as IVariant;
  }

  onMouseLeaveVariant(): void {
    this.hoverVariant = this.selectedVariant;
  }

  onChangeSelectedVariant(idSelected: Number): void {
    this.selectedVariant = this.variants.find((variant: any) => variant.id === idSelected) as IVariant;
  }

  get lazyPlaceholderImage(): string {
    return imgURL(this.featuredImage, '1x1', 'center') || '';
  }
}
</script>
<style lang="scss">
@import './src/styles/utils/mixins/responsive';

.product-item__wrapper {
  border-radius: 10px;
  background-color: #f5efe8;
  padding: 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .product-item__infomation {
    width: 95%;
    padding-top: 20px;

    @include responsive(MD) {
      width: 90%;
    }
  }

  .product-item__image {
    overflow: hidden;
    margin: -6px;
    width: calc(100% + 12px);

    > img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .product-item__variants,
  .product-item-shortmeta {
    margin: 6px 0;
  }

  .product-item__title a.product-item__heading {
    display: flex;
    font-weight: 600;
    color: #242424;
    display: flex;
    align-items: center;
  }

  a.product-item__heading {
    > span {
      font-family: var(--font-stack-header);
    }
  }

  .product-item__title span:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-item__title span:first-child,
  .product-item__title span:last-child {
    font-size: 13px;
    @include responsive(SM) {
      font-size: 18px;
    }
  }

  .product-item__addtocart {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    @include responsive(SM) {
      margin-bottom: 10px;
    }
  }
}

.product-item__wrapper {
  .btn {
    font-size: 11px;
    padding: 16px 20px;

    @include responsive(SM) {
      font-size: 16px;
      padding: 24px 20px;
    }
  }
}

.product-item__variants {
  display: flex;

  .product-item__variant {
    margin-right: 5px;
    background: white;
    border-radius: 999px;
    overflow: hidden;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @include responsive(SM) {
      width: 30px;
      height: 30px;
    }
  }

  .product-item__variant-icon {
    span {
      font-weight: 600;
    }
  }
}

.product-item__variant.is-selected {
  border: 2px solid #242424;
}

.product-item-shortmeta {
  font-size: 12px;
  @include responsive(SM) {
    font-size: inherit;
  }
}
</style>
