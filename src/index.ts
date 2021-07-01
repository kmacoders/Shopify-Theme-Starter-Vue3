// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue, { createApp } from 'vue';
import 'Vue/config';
import 'Vue/filters';
import store from './vue/store';

/**
 * SCSS
 */
import 'swiper/swiper-bundle.css';
import './styles/main.scss';

/**
 * TS
 */
import './helpers';
import './vue/components/entry';

/**
 * Auto find and import all .ts file in Shopify folder
 */
const tsFiles = require.context('Shopify/', true, /\.ts$/);
tsFiles.keys().forEach(tsFiles);

/**
 * vue components
 * auto-import all vue components
 */
const vueComponents = require.context('./vue/components/globals/', true, /\.vue$/);
// vueComponents.keys().forEach((key) => {
//   const component = vueComponents(key).default;
//   Vue.component(component.name, component);
// });

/**
 * All SECTION is vue instance ( template vue )
 *
 * Properly render vue components inside sections on user insert in the theme editor
 * add the 'vue' keyword to the section's wrapper classes e.g.:
 *
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */

/* If merchant in designMode */
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue-section')) {
    const app = createApp({
      delimiters: ['${', '}'],
      store,
    });

    vueComponents.keys().forEach((key) => {
      const component = vueComponents(key).default;
      app.component(component.name, component);
    });

    app.mount(event.target);
  }
});

/* If merchant in normalMode ( is Section ) */
document.querySelectorAll('.shopify-section').forEach((section) => {
  if (section.classList.value.includes('vue-section')) {
    const app = createApp({
      delimiters: ['${', '}'],
      store,
    });

    vueComponents.keys().forEach((key) => {
      const component = vueComponents(key).default;
      app.component(component.name, component);
    });

    app.mount(section);
  }
});

/** If vue instace != section */
document.querySelectorAll('[data-vue-instance]').forEach((element) => {
  const newInstanceVue = createApp({
    el: element,
    store,
  });
  vueComponents.keys().forEach((key) => {
    const component = vueComponents(key).default;
    newInstanceVue.component(component.name, component);
  });
});

console.log('kmacoders developing..');
