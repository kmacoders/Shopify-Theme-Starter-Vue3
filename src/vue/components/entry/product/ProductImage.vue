<template>
  <div class="product__slide">
    <div class="product__slide-feature swiper-container">
      <div class="swiper-wrapper">
        <template v-for="(media, index) in allMedia">
          <!-- Image  -->
          <template v-if="media.mediaContentType === 'IMAGE'">
            <div class="product__item swiper-slide" :key="index">
              <img :src="media.image.originalSrc" alt="Image product Upfront">
            </div>
          </template>
          <!-- Video  -->
          <template v-if="media.mediaContentType === 'VIDEO'">
            <div class="product__item swiper-slide" :key="index">
              <video
                class="product-image__video"
                autoplay loop playsinline muted controls
                style=" width: 100%; height: 100%; object-fit: contain;display: inline-block;"
              >
                <source :src="media.originalSource.url" type="video/mp4">
              </video>
            </div>
          </template>
        </template>
      </div>

      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>

    <div class="product__slide-thumbs swiper-container">
      <div class="swiper-wrapper">
        <template v-for="(preview, index) in allPreview">
          <div class="product-thumb__item  swiper-slide" :key="index">
            <img :src="preview.originalSrc" alt="">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Swiper, { Pagination, Thumbs, EffectFade } from 'swiper';
import { Media } from "Types/product-information/information";
import Vue from "vue";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

Swiper.use([Pagination, Thumbs, EffectFade]);

const handleThumbSlider = (): Swiper => {
  const productThumbSwiper = new Swiper('.product__slide-thumbs', {
    slidesPerView: 'auto',
    direction: 'vertical',
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  return productThumbSwiper;
};

const handleMainSlider = (): Swiper => {
  const productMainSwiper = new Swiper('.product__slide-feature', {
    slidesPerView: 2,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    pagination: {
      el: '.product__slide-feature .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    },
    effect: 'fade',
    thumbs: {
      swiper: handleThumbSlider(),
    },
  });

  return productMainSwiper;
};

const ProductImageProps = Vue.extend({
  props: {
    generalMedia: Array,
    variantMedia: Array,
  }
})


@Component
export default class ProductImage extends ProductImageProps {
  readonly generalMedia!: Media[];

  readonly variantMedia!: Media[];

  allMedia: Media[] = [];

  allPreview: Partial<Media>[] = [];

  mounted() {
    this.generalMedia?.forEach((media) => {
      this.allMedia.push(media);
      this.allPreview.push(media.preview.image)
    })
    this.variantMedia?.forEach((media) => {
      this.allMedia.push(media);
      this.allPreview.push(media.preview.image)
    })


    console.log(this.allPreview);
  }

  updated() {
    const swiperInstance = handleMainSlider();
    swiperInstance.init();
  }

  get featuredImageOrVideo(): { available: boolean, type: string, src: string} {
    let type: string = '';
    let src: string = '';
    if (this.generalMedia.length === 0) return { available: false, type, src};

    const available: boolean = (this.generalMedia.length > 0);
    type = this.generalMedia[0].mediaContentType;

    if (type === 'IMAGE') {
      src = this.generalMedia[0].image?.originalSrc as string;
    } else if (type === 'VIDEO') {
      src = this.generalMedia[0].originalSource?.url as string;
    }

    return {
      available,
      type,
      src
    };
  }

  @Watch('variantMedia')
  onChangeVariantMedia() {
    this.allMedia = [];
    this.allPreview = [];
    this.generalMedia?.forEach((media) => {
      this.allMedia.push(media);
      this.allPreview.push(media.preview.image)
    })
    this.variantMedia?.forEach((media) => {
      this.allMedia.push(media);
      this.allPreview.push(media.preview.image)
    })
  }
}
</script>
