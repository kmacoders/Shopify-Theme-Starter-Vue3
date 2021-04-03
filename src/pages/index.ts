import { onSectionSelected } from 'Helpers/sections';
import './login/login';
import './products/SlidersProduct';
import './products/zoomMainImage';
import ProductForm from './products/ProductForm.vue';
import Cart from './cart/Cart.vue';
import ProductRecommendations from './products/ProductRecommendations.vue';

onSectionSelected('#product-form', () => {
  const productForm = new ProductForm().$mount('#product-form');
});
onSectionSelected('#cartContainer', () => {
  const cart = new Cart().$mount('#cartContainer');
});
onSectionSelected('#ProductRecommendations', () => {
  const productRecommendations = new ProductRecommendations().$mount('#ProductRecommendations');
});
