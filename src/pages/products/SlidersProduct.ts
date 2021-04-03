import { onSectionSelected } from 'Helpers/sections';

declare let Swiper: any;

const handleAllSliders = (): void => {
  const productThumbsSwiper = new Swiper('.product-thumb-swiper', {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 'auto',
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const productFeatureSwiper = new Swiper('.product-feature-swiper', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: productThumbsSwiper,
    },
  });

  const swiper = new Swiper('.product-feature-swiper', {});
};

onSectionSelected('.product-container', () => {
  handleAllSliders();
});
