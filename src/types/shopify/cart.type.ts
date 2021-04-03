import { ILineItem } from './common.type';

export interface ICart {
  token?: string;
  note?: string;
  attributes?: any;
  original_total_price?: number;
  total_price?: number;
  total_discount?: number;
  total_weight?: number;
  item_count?: number;
  requires_shipping?: boolean;
  cart_level_discount_applications: any[];
  currency: string;
  items: ILineItem[];
  items_subtotal_price: number;
}

/**
 * Properties in formData request '/cart/add.js'
 */
export interface IProperty {
  [propsKey: string]: string|number;
}

export interface IItemsResponse {
  items: ILineItem[];
}
