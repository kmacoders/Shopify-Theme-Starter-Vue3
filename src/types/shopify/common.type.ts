export interface ILineItem {
  id?: number;
  properties?: any;
  quantity?: number;
  variant_id?: number;
  key?: string;
  title?: string;
  price?: number;
  line_price?: number;
  original_line_price?: number;
  total_discount?: number;
  discounts?: any[];
  discounted_price?: number;
  featured_image?: {
    alt: string,
    aspect_ratio: number;
    height: number;
    url: string;
    width: number;
  };
  sku?: any;
  grams?: number;
  vendor?: string;
  product_id?: number;
  gift_card?: boolean;
  url?: string;
  image?: string;
  handle?: string;
  requires_shipping?: boolean;
  product_type?: string;
  product_title?: string;
  product_description?: string;
  variant_title?: string;
  variant_options?: string[];
  final_line_price?: number;
  line_level_discount_allocations?: any[];
  line_level_total_discount?: number;
  options_with_values?: {
    name: string;
    value: number;
  }[];
  original_price?: number;
  product_has_only_default_variant?: boolean;
  taxable: boolean;
}

export interface IVariant {
  price: number;
  id: number;
  title?: string;
  option1?: string;
  option2?: any;
  option3?: any;
  sku?: any;
  requires_shipping?: boolean;
  taxable?: boolean;
  featured_image?: any;
  available?: boolean;
  name?: string;
  options?: string[];
  weight?: number;
  compare_at_price?: any;
  inventory_quantity?: number;
  inventory_management?: string;
  inventory_policy?: string;
  barcode?: string;
}

export interface IOption {
  name?: string;
  position?: number;
  values?: string[];
}
