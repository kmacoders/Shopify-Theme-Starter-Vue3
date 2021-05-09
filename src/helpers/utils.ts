import * as Cart from './cart/cart';
import { qs } from './dom/dom';

const updateHeightWrapperSlide = (): void => {
  const slideWrapper = qs('.product-slide__wrapper') as HTMLElement;
  const productContainer = qs('.product-container') as HTMLElement;

  const screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  if (screenWidth >= 768) {
    slideWrapper.style.height = `${productContainer?.clientHeight - 70}px`;
  } else {
    slideWrapper.style.height = 'initial';
  }
};

const handleHeightWrapperSlide = (): void => {
  updateHeightWrapperSlide();
  window.addEventListener('resize', (): void => {
    updateHeightWrapperSlide();
  });
};

const updateTime = (): string => new Date().getTime().toString();

export {
  updateTime,
  handleHeightWrapperSlide,
};
