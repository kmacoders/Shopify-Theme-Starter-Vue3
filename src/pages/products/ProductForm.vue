<template>
  <form action="/cart" method="post" class="product-form-wrapper" data-vue-dom>
    <!-- Form  -->
    <div class="product-form__variant">
      <label v-for="(option, index) in optionsWithValues" :key="index">
        <div class="product-form__title" style="margin-top: 10px">
          {{ option.name }}
        </div>
        <select
          class="product-form__select xo-select xo-select--is-fullwidth filter__select"
          @change="onSelectChange($event)"
        >
          <option
            class="product-form__option"
            v-for="(value, index) in option.values"
            :key="index"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </label>
    </div>

    <!-- Button  -->
    <div class="product-from__submit">
      <template v-if="isVariantAvailable">
        <div
          class="xo-btn xo-btn--is-fullwidth"
          id="addToCart"
          @click="addToCart"
        >
          {{ addToCartStr }}
        </div>
        <button  id="checkout" class="xo-btn xo-btn--is-fullwidth" type="submit" name="checkout">
          {{ checkOutStr }}
        </button>
      </template>
      <template v-else>
        <div class="xo-btn xo-btn--is-fullwidth xo-btn--is-soldout">{{ soldoutStr }}</div>
      </template>
    </div>
  </form>
</template>

<script lang="ts">
import * as Cart from 'Helpers/cart/cart';
import { qs, qsa } from 'Helpers/dom/dom';
import { updateCartItemCount } from 'Helpers/utils';
import { IProduct } from 'Types/shopify/product.type';
import Vue from 'vue'
import Component from 'vue-class-component';

/**
 * Check xem 2 mảng có value khác nhau không
 * Nếu có trả về true
 * Đặt mảng chứa các giá trị của select ở phía trước
 */
const isDiffArr = (selectArr: string[], variantOptionArr: string[]): Boolean => {
  const diffValue = selectArr.filter((select) => variantOptionArr.indexOf(select) === -1);
  if(diffValue.length > 0) {
    return true;
  } else {
    return false;
  }
}

interface IOptions {
  name: string,
  position: number,
  values: string[]
}

declare let Toastify: any;
declare let theme: any;
declare let optionsWithValues: IOptions[];
declare let product: IProduct;

@Component
export default class ProductForm extends Vue {
  product: IProduct = product;

  /** ID của variant hiện tại */
  currentVariantID: number = product.variants?.[0].id as number;
  isVariantAvailable: boolean = product.variants?.[0].available as boolean;
  selectValueArr: string[] = product.variants?.find((variant) => variant.id === this.currentVariantID)?.options as string[];

  /** Build-in Shopify: Mảng chứa các options variant từ admin */
  optionsWithValues: IOptions[] = optionsWithValues;

  /** String cho change language */
  addToCartStr: string = theme.productStr.addToCart;
  checkOutStr: string = theme.productStr.checkOut;
  soldoutStr: string = theme.productStr.soldOut;

  /**
   * Mỗi khi có 1 select thay đổi value
   */
  public onSelectChange(event: any) {
    this.updateAllValueFromSelect();
    this.mergeSelectedVariantID();
    this.checkSoldoutVariant();
  }

  public addToCart() {
    this.addLoadingIcon();
    Cart.addItem(this.currentVariantID, 1, {},
    () => {
      Toastify({
        text: `Added ${product.title}: ${this.selectValueArr.join(' - ')}`,
        className: "xo-toast-msg xo-toast-msg--is-success",
        backgroundColor: "linear-gradient(90deg, #0072ff 0%, #00d4ff 100%)",
        duration: 2000,
        close: true,
        offset: {
          x: 10,
          y: 10
        },
      }).showToast();
      this.removeLoadingIcon();
      updateCartItemCount();
    },
    () => {
      Toastify({
        text: "Error! Try again.",
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

  /** Kiểm tra xem variant đang được chọn có còn hàng không */
  private checkSoldoutVariant(): void {
     this.isVariantAvailable = this.product.variants?.find((variant) => variant.id === this.currentVariantID)?.available as boolean;
  }

  /** Lấy tất cả giá trị từ các select riêng biệt rồi ném vào 1 mảng */
  private updateAllValueFromSelect(): void {
    this.selectValueArr = [];

    qsa('.product-form-wrapper .product-form__select').forEach((selectEl) => {
      const selectValue = (selectEl as HTMLSelectElement).value;
      this.selectValueArr.push(selectValue);
    })
  }

  /** Gộp các value từ nhiều select => merge lại tạo ra 1 variant ID duy nhất */
  private mergeSelectedVariantID(): void {
    this.currentVariantID = this.product.variants?.find((variant) => {
      return !isDiffArr(this.selectValueArr, variant.options as string[]);
    })?.id as number;
  }

  private addLoadingIcon(): void {
    const addToCartBtn = qs('#addToCart') as HTMLElement;
    addToCartBtn.classList.add('xo-btn--is-loading');
  }

  private removeLoadingIcon(): void{
    const addToCartBtn = qs('#addToCart') as HTMLElement;
    addToCartBtn.classList.remove('xo-btn--is-loading');
  }
}

</script>

<style lang="scss">
  .product-form-wrapper {
    margin-top: 50px;

    .product-from__submit {
      margin-top: 50px;

      .xo-btn {
        margin-bottom: 10px;
      }
    }
  }
</style>
