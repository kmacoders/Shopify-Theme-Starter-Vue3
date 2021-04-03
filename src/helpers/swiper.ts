import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  SwiperOptions,
  Swiper,
} from 'swiper';
import { AutoplayOptions } from 'swiper/types/components/autoplay';
import { NavigationOptions } from 'swiper/types/components/navigation';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';
import { qsa, qs } from './dom/dom';

type TPaginationType = 'bullets' | 'fraction' | 'progressbar' | 'custom';
type TEffectType = 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
interface IBreakpointSwiper {
  [ratio: string]: SwiperOptions;
  [width: number]: SwiperOptions;
}

class SwiperCustom {
  wrapperElement: HTMLElement;

  swiperEl: HTMLElement;

  swiperOptions: SwiperOptions;

  breakpoints: IBreakpointSwiper;

  constructor(element: HTMLElement) {
    this.wrapperElement = element;
    this.swiperEl = qs('.xo-swiper', element) as HTMLElement || qs('.swiper-container', element) as HTMLElement;
    this.swiperOptions = {};
    this.breakpoints = {};
  }

  init(): void {
    const {
      autoplay,
      effect,
      loop,
      autoHeight,
      initialSlide,
      slidesPerView,
      spaceBetween,
      navigation,
      pagination,
      breakpoints,
      scrollbar,
      loopedSlides,
    } = this;

    this.swiperOptions = {
      autoplay,
      effect,
      loop,
      centeredSlides: false,
      autoHeight,
      breakpoints,
      grabCursor: true,
      initialSlide,
      pagination,
      navigation,
      spaceBetween,
      slidesPerView,
      scrollbar: scrollbar || false,
      loopedSlides: loopedSlides || undefined,
    };
    Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);
    const swiper = new Swiper(this.swiperEl, this.swiperOptions);
  }

  /**
   * Get autoplay from data-auto-play
   */
  get autoplay(): AutoplayOptions | boolean {
    if (+this.swiperEl.dataset.autoPlay! === 0) return false;
    return this.swiperEl.dataset.autoPlay
      ? { delay: +this.swiperEl.dataset.autoPlay, disableOnInteraction: false }
      : false;
  }

  /**
   * Get pagination from data-pagination, data-pagination-type
   */
  get pagination(): PaginationOptions | undefined {
    let pagination: PaginationOptions | undefined;
    let pagination2: PaginationOptions | undefined = {
      el: qs('.swiper-pagination', this.wrapperElement) as HTMLElement,
      type: 'bullets' as TPaginationType,
      clickable: true,
    };

    const pagins = this.swiperEl.dataset.pagination?.split('|');
    pagins?.forEach((pagin: string) => {
      const itemSplit = pagin.split(':');
      pagination = {
        el: qs('.swiper-pagination', this.wrapperElement) as HTMLElement,
        type: itemSplit[1] as TPaginationType,
        clickable: true,
      };
      if (itemSplit[0] === 'df') {
        pagination2 = {
          el: qs('.swiper-pagination', this.wrapperElement) as HTMLElement,
          type: itemSplit[1] as TPaginationType,
          clickable: true,
        };
      } else this.setBreakpoint(itemSplit[0], { pagination });
    });

    return pagination2;
  }

  /**
   * Get effect from data-effect
   */
  get effect(): TEffectType {
    return this.swiperEl.dataset.effect as TEffectType ? this.swiperEl.dataset.effect as TEffectType : 'slide';
  }

  /**
   * Get loop from data-loop
   */
  get loop(): boolean {
    let loop = false;
    if ('loop' in this.swiperEl.dataset) {
      loop = true;
    }
    return loop;
  }

  /**
   * Get autoHeight from data-auto-height
   */
  get autoHeight(): boolean {
    let autoHeight = false;
    if ('autoHeight' in this.swiperEl.dataset) {
      autoHeight = true;
    }
    return autoHeight;
  }

  /**
   * Get slidesPerView from data-slides-per-view
   */
  get slidesPerView(): number | 'auto' {
    let slidesPerView: number | 'auto' = 1;
    let slidesPerView2: number | 'auto' = 1;

    const slides = this.swiperEl.dataset.slidesPerView?.split('|');
    slides?.forEach((slide: string) => {
      const itemSplit = slide.split(':');
      slidesPerView = Number(itemSplit[1]) || 'auto';
      if (itemSplit[0] === 'df') {
        slidesPerView2 = Number(itemSplit[1]) || 'auto';
      } else this.setBreakpoint(itemSplit[0], { slidesPerView });
    });

    return slidesPerView2;
  }

  /**
   * Get scrollbar from data-scrollbar
   */

  get scrollbar(): ScrollbarOptions | boolean {
    let scrollbar: ScrollbarOptions;
    if ('scrollbar' in this.swiperEl.dataset) {
      scrollbar = {
        el: qs('.swiper-scrollbar', this.wrapperElement) as HTMLElement,
        dragSize: 'auto',
      };
      return scrollbar;
    }

    return false;
  }

  /**
   * Get spaceBetween from data-space-between
   */
  get spaceBetween(): number {
    let spaceBetween = 0;
    let spaceBetween2 = 0;

    const spaces = this.swiperEl.dataset.spaceBetween?.split('|');
    spaces?.forEach((space: string) => {
      const itemSplit = space.split(':');
      spaceBetween = Number(itemSplit[1]);
      if (itemSplit[0] === 'df') {
        spaceBetween2 = Number(itemSplit[1]);
      } else this.setBreakpoint(itemSplit[0], { spaceBetween });
    });

    return spaceBetween2;
  }

  /**
   * get slidesPerGroup from data-slides-per-group
   */
  get slidesPerGroup(): number {
    return Number(this.swiperEl.dataset.slidesPerGroup) || 1;
  }

  /**
   * get initialSlide from data-init-slide
   */
  get initialSlide(): number {
    return Number(this.swiperEl.dataset.initSlide) || 0;
  }

  /**
   * Get navigation from data-navigation
   */
  get navigation(): NavigationOptions | boolean {
    let navigation: NavigationOptions;

    if ('navigation' in this.swiperEl.dataset) {
      navigation = {
        nextEl: qs('.swiper-button-next', this.wrapperElement) as HTMLElement,
        prevEl: qs('.swiper-button-prev', this.wrapperElement) as HTMLElement,
      };
      return navigation;
    }
    return false;
  }

  /**
    * Get loopedSlides from data-looped-slides
    */
  get loopedSlides(): number {
    return Number(this.swiperEl.dataset.loopedSlides);
  }

  /**
   * Set breakpoint of option swiper
   * @example
   * ```
   * data-pagination="df:progressbar|sm:progressbar|md:fraction"
   * data-slides-per-view="sm:1|lg:2"
   * data-space-between="df:10|sm:20|xl:30"
   * ```
   * df: default, no breakpoint
   * sm: small ~ >= 576px
   * md: medium ~ >= 768px
   * lg: large ~ >= 992px
   * xl: extra large ~ >= 1200px
   * number: breakpoint = number
   * if dont set 'df', it will use default value of Swiper
   * @param {string} breakpoint: breakpoint of option
   * @param {SwiperOptions} option: option of swiper
   */
  setBreakpoint(breakpoint: string, option: SwiperOptions): void {
    const { breakpoints } = this;
    switch (breakpoint) {
      case 'sm':
        breakpoints[576] = { ...breakpoints[576], ...option };
        break;
      case 'md':
        breakpoints[768] = { ...breakpoints[768], ...option };
        break;
      case 'lg':
        breakpoints[992] = { ...breakpoints[992], ...option };
        break;
      case 'xl':
        breakpoints[1200] = { ...breakpoints[1200], ...option };
        break;
      default:
        breakpoints[+breakpoint] = { ...breakpoints[+breakpoint], ...{ ...option } };
        break;
    }
  }
}

qsa<HTMLElement>('[data-slide-swiper]').forEach((el) => {
  const sp = new SwiperCustom(el);
  sp.init();
});
