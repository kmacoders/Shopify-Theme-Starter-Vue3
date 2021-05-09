/**
 * Description:
 *  Import Vue component to .ts file in ./Shopify folder
 */

declare module "*.vue" {
  import Vue from 'vue';
  export default Vue;
}
