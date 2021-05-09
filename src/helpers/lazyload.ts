/**
 * Note: Lazyload luôn phải được import sau cùng
 * Mặc định 1 số lib Swiper sẽ duplicate DOM để tạo hiệu ứng
 * => Lazyload import trước sẽ không observer được el vừa được duplicate
 */
interface IlazyGlobalConfig {
  lazyClass: string,
  lazyBgClass: string,
  loadingClass: string,
  loadedClass: string,
}

declare let lazyGlobalConfig: IlazyGlobalConfig;

/**
 * Kiểm tra xem có phải bot của Google không
 */
const runningOnBrowser = typeof window !== 'undefined';
const isBot =
  (runningOnBrowser && !('onscroll' in window)) ||
  (typeof navigator !== 'undefined' &&
    /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

const options = {
  /**
   * Element có thể scroll để xác định vùng lazyload
   * Null => default viewport
   */
  root: null,

  /**
   * Margin tằng/giảm vùng kiểm soát của root
   */
  rootMargin: '0px 0px 400px 0px',

  /**
   * Phần trăm mức độ hiện thị của lazy el trước khi callback được gọi
   */
  threshold: 0,
};

const addStyleBgToHead = (className: string): void => {
  const style = document.createElement('style') as HTMLStyleElement;

  style.innerHTML = `
  .${className} {
    background-image: none !important;
    background: #eee !important;
  }
  `;
  document.head.appendChild(style);
};

/**
 * Với Img
 */
const observerLazyImg = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src', String(entry.target.getAttribute('data-src')));
      // entry.target.src = entry.target.dataset.src;
      entry.target.classList.add(`${lazyGlobalConfig.loadedClass}`);
      observer.unobserve(entry.target);
    }
  });
}, options);

/**
 * Với background img
 */
const observerLazyBg = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(`${lazyGlobalConfig.lazyBgClass}`);
      entry.target.classList.add(`${lazyGlobalConfig.loadedClass}`);

      observer.unobserve(entry.target);
    }
  });
}, options);

const initLazyload = (): void => {
  /**
   * Nếu là bot => để lại như cũ
   */
  if (isBot) {
    document.querySelectorAll(`.${lazyGlobalConfig.lazyClass}`).forEach((img) => {
      img.setAttribute('src', String(img.getAttribute('data-src')));
    });

    document.querySelectorAll(`.${lazyGlobalConfig.lazyBgClass}`).forEach((el) => {
      el.classList.remove(`${lazyGlobalConfig.lazyBgClass}`);
    });

    return;
  }

  /**
   * Add name bg lazyload
   */
  addStyleBgToHead(lazyGlobalConfig.lazyBgClass);

  /**
   * Observer img
   */
  document.querySelectorAll(`.${lazyGlobalConfig.lazyClass}`).forEach((img) => {
    observerLazyImg.observe(img);
  });

  /**
   * Observer bg
   */
  document.querySelectorAll(`.${lazyGlobalConfig.lazyBgClass}`).forEach((el) => {
    observerLazyBg.observe(el);
  });
};

initLazyload();

export default initLazyload;
