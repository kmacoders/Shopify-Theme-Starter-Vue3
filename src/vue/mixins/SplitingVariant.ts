// import { VariantsEntity } from 'Types/product-information/information';
// import Vue from 'vue';
// import Component from 'vue-class-component';

// /**
//  * Spliting variant title || count package variant
//  */
// @Component
// export default class SplitingVariant extends Vue {
//   hoverVariant: VariantsEntity = {} as VariantsEntity;

//   get metaVariant(): string {
//     const res = (this.hoverVariant.title || '').split(' ');
//     let metaVariant = '';
//     if (res.length > 1) {
//       (res.slice(0, -1)).forEach((title: string) => {
//         metaVariant += `${title} `;
//       });
//     } else {
//       [metaVariant] = res;
//     }
//     return metaVariant || '';
//   }

//   get quantityVariant(): string {
//     const res = (this.hoverVariant.title || '').split(' ');
//     const quantityVariant = (res.length > 1) ? res[Number(res.length - 1)] : '';
//     return quantityVariant || '';
//   }
// }
