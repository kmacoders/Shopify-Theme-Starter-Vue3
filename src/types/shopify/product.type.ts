import { IOption, IVariant } from './common.type';

export interface IProduct {
  id: number;
  title: string;
  handle: string;
  variants: IVariant[];
  description?: string;
  published_at: Date;
  created_at: Date;
  vendor?: string;
  type?: string;
  tags?: any[];
  price: number;
  price_min?: number;
  price_max?: number;
  available?: boolean;
  price_varies?: boolean;
  compare_at_price?: any;
  compare_at_price_min?: number;
  compare_at_price_max?: number;
  compare_at_price_varies?: boolean;
  images?: string[];
  featured_image?: string;
  options?: IOption[];
  url?: string;
  media?: IMedia[];
}

export interface IProductSearch {
  available: boolean;
  body: string;
  compare_at_price_max: string;
  compare_at_price_min: string;
  featured_image: {
    alt: string;
    aspect_ratio: number;
    height: number;
    url: string;
    width: number;
  };
  handle: string;
  id: number;
  image: string;
  price: string;
  price_max: string;
  price_min: string;
  tags: string[];
  title: string;
  type: string;
  url: string;
  variants: IVariant[];
  vendor: string;
}

export interface IMedia {
  alt: string;
  aspect_ratio: number;
  height: number;
  id: number;
  media_type: 'video' | 'image' | 'external_video'| 'model';
  position: number;
  preview_image: IPreviewObject;
  src: string;
  width: number;
}

export interface IPreviewObject {
  aspect_ratio: number;
  height: number;
  src: string;
  width: number;
}
