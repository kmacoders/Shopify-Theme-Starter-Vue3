import Vue from 'vue';
import { formatMoney } from '@shopify/theme-currency';

declare let theme: any;

/**
 * Format money from Shopify theo money_format
 */
Vue.filter('hugMoneyFormat', (value: number | string) => {
  if (!value) return '';
  return formatMoney(Number(value), theme.moneyFormat);
});

/**
 * Uppercase
 */
Vue.filter('hugUppercase', (value: string) => value.toUpperCase());

/**
 * Same as img_url shopify theme
 */
Vue.filter('imgURL', (src: string, size: string, crop: string): string => src
  .replace(/_(pico|icon|thumb|small|compact|medium|large|grande|original|500x500|768x768|1024x1024|2048x2048|master)+\./g, '.')
  .replace(/\.jpg|\.png|\.gif|\.jpeg/g, (match: string) => `_${size}_crop_${crop}${match}`));
