import { Bottomline, CRFS, ReviewsEntity } from 'Types/review';
import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';

enum MutationType {
  setCRFS = 'SET_CRFS',
  setIsFilterLoading = 'SET_IS_FILTER_LOADING',
  setReviewList = 'SET_REVIEW_LIST',
  setBottomLine = 'SET_BOTTOM_LINE',
  setDataFilter = 'SET_DATA_FILTER',
}

@Module({
  namespaced: true,
})
export default class ReviewStore extends VuexModule {
  crfs: CRFS[] = [];

  dataFilter = { domain_key: '6544979951678' };

  isFilterLoading = false;

  reviewList: ReviewsEntity[] = [] as ReviewsEntity[];

  bottomLine: Bottomline = {} as Bottomline;

  get getCrfs(): CRFS[] {
    return this.crfs;
  }

  get getIsFilterLoading(): boolean {
    return this.isFilterLoading;
  }

  get getReviewList(): ReviewsEntity[] {
    return this.reviewList;
  }

  get getBottomLine(): Bottomline {
    return this.bottomLine;
  }

  get getDataFilter(): any {
    return this.dataFilter;
  }

  @Mutation
  [MutationType.setCRFS](crf: CRFS): void {
    let flag = false;
    this.crfs.forEach((_crf: CRFS) => {
      if (_crf.question_id === crf.question_id) {
        // eslint-disable-next-line no-param-reassign
        _crf = crf;
        flag = true;
      }
    });
    if (!flag) {
      this.crfs = [...this.crfs, crf];
    }
  }

  @Mutation
  [MutationType.setIsFilterLoading](isFilterLoading: boolean): void {
    this.isFilterLoading = isFilterLoading;
  }

  @Mutation
  [MutationType.setReviewList](reviewList: ReviewsEntity[]): void {
    this.reviewList = reviewList;
  }

  @Mutation
  [MutationType.setBottomLine](bottomLine: Bottomline): void {
    this.bottomLine = bottomLine;
  }

  @Mutation
  [MutationType.setDataFilter](newData: any): void {
    this.dataFilter = { ...this.dataFilter, ...newData };
  }

  @Action
  async filterAPI(data: any): Promise<void> {
    this.context.commit(MutationType.setIsFilterLoading, true);
    const res = await fetch(
      'https://api.yotpo.com/v1/reviews/TO1vyGlOUMHn44dQPyVyRhpmCox6vCxnKg4HuPMD/filter.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const reviewFilter = await res.json();
    this.context.commit(MutationType.setIsFilterLoading, false);
    if (reviewFilter.status.code === 200) {
      this.context.commit(MutationType.setReviewList, reviewFilter.response.reviews);
    }
  }

  @Action
  updateReviewList(reviewList: ReviewsEntity[]): void {
    this.context.commit(MutationType.setReviewList, reviewList);
  }

  @Action
  updateCRFS(crf: CRFS): void {
    this.context.commit(MutationType.setCRFS, crf);
    this.context.commit(MutationType.setDataFilter, this.crfs);
  }

  @Action
  updateDataFilter(data: any): void {
    this.context.commit(MutationType.setDataFilter, data);
  }

  @Action
  updateBottomLine(bottomLine: Bottomline): void {
    this.context.commit(MutationType.setBottomLine, bottomLine);
  }
}
