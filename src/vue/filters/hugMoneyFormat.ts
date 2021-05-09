import { formatMoney } from '@shopify/theme-currency';

declare let theme: any;

/**
 * Format money from Shopify theo money_format
 */

const hugMoneyFormat = (value: number | string): string => {
  if (!value) return '';
  return formatMoney(Number(value), theme.moneyFormat);
};

export default hugMoneyFormat;
