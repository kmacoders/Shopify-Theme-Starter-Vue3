/**
 * General className when using Swiper
 */
export interface ISwiperClassName {
  /**
   * Class of section container
   */
  sectionClass?: string;

  swiperContainerClass: string;
  paginationClass?: string;
  navigationClass?: {
    nextEl?: string;
    prevEl?: string;
  };
  scrollbarClass?: string;
}
