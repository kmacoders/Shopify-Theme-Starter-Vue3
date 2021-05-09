import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';

enum MutationType {
  setIsSearchOpening = 'SET_IS_SEARCH_OPENING',
}

@Module({
  namespaced: true,
})
export default class SearchStore extends VuexModule {
  /**
   * State of search
   */
  isSearchOpening = false;

  get getIsSearchOpening(): boolean {
    return this.isSearchOpening;
  }

  @Mutation
  [MutationType.setIsSearchOpening](): void {
    this.isSearchOpening = !this.isSearchOpening;
    document.body.classList.toggle('remove-scrolling');
  }

  @Action
  toggleSearchBar(): void {
    this.context.commit(MutationType.setIsSearchOpening);
  }
}
