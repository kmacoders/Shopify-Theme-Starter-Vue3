// import {
//   Action,
//   Module,
//   Mutation,
//   VuexModule,
// } from 'vuex-module-decorators';

// enum MutationType {
//   setIsCollectionLoading = 'SET_IS_COLLECTION_LOADING',
// }

// @Module({
//   namespaced: true,
// })
// export default class CollectionStore extends VuexModule {
//   /**
//    * State of loading ui in Alles page
//    */
//   isCollectionLoading = true;

//   get getIsCollectionLoading(): boolean {
//     return this.isCollectionLoading;
//   }

//   @Mutation
//   [MutationType.setIsCollectionLoading](): void {
//     this.isCollectionLoading = false;
//   }

//   @Action
//   onDisabledLoading(): void {
//     this.context.commit(MutationType.setIsCollectionLoading);
//   }
// }
