<template>
  <div class="product-review xo-container" id="product-review" data-vue-dom>
    <div class="review-overview">
      <div class="xo-row xo-no-gutters">
        <div class="review__total xo-col-6 xo-col-md-3">
          <div class="review-number h3" v-cloak>{{ bottomLine.total_review || 0 }}</div>
          <span>reviews</span>
        </div>

        <div class="review-average xo-col-6 xo-col-md-3">
          <div class="review-star">
            <div class="review-number h3" v-cloak>{{ (bottomLine.average_score || 0).toFixed(1) }}</div>
            <star-voting :current="bottomLine.average_score"></star-voting>
          </div>
          <span>gemiddelde beoordeling</span>
        </div>

        <div class="review-write xo-col-12 xo-col-md-6">
          <button type="button" class="review__btn">
            <h3>schrijf een review</h3>
          </button>
        </div>
      </div>
    </div>

    <div class="review-create__container">
      <div class="review-create__wrapper">
        <div class="create-score">
          <input
            type="number"
            name="score"
            class="review__btn"
            v-model="review_score"
            required
          />
          <label for="score">Score</label>
        </div>
        <div class="create-title">
          <input
            type="text"
            name="title"
            class="review__btn"
            v-model="review_title"
            required
          />
          <label for="title">Title</label>
        </div>

        <div class="create-content">
          <input
            type="textarea"
            name="content"
            class="review__btn"
            v-model="review_content"
            required
          />
          <label for="content">Content</label>
        </div>

        <div class="create-name">
          <input
            type="text"
            name="name"
            class="review__btn"
            v-model="display_name"
            required
          />
          <label for="name">Name</label>
        </div>

        <div class="create-email">
          <input
            type="email"
            name="email"
            class="review__btn"
            v-model="email"
            required
          />
          <label for="email">Email</label>
        </div>

        <button type="button" @click="submitReview">Summit</button>
      </div>
    </div>

    <div class="review-filter">
      <div class="filter-title">
        <svg
          width="44"
          height="44"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="33 7419 44 44"
        >
          <image
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAD7klEQVRYR82ZaYiNYRTHfyMpyRf7niUNIY0lpZQlpSgk2UWyNEqWkl3Zdymy+0ApUmP7qCQliQ/2JUu2YcaMrexr/9t56/G6yzP3vt33nk/3PnPe5/zeM+c5y3OL+FcWA1OBjqH1uL4+BQ4Dq4CfgigyknrABaBnXGQZ7N4D+gMVAfBloE+BwgZYD4BiAY8CTjiwd4CNwOOYX6A1MA/o7XCUCvi8uVvrL4D2wI+YYV3zd4FOtnBdwK+AZrag4F5ZQLBCmQ3sNKYqAVcATWxhPrC9wIAnAkdc4JdAC1tYAqwvMODpwD5jSmSJbIGVCtsAirGaSGegEqj2fCgS4HbARaAlsBlY6GlchWkd8A7oB9z2eC4S4LmhWK/jmVnk1QY1POCRAJcCu8ywvNXUE/gh0MGeWwaszZeH3WLzGmjuYVgqKrHFprvIClSmR3Py8HgrMiVAL7P0DSgDngGHgPtpCPIKLKgRmdxhOqdS6OUNWFlA/YWvqBC9SaKcN+BH1mOIoRy46sD8BuoDA4Batj7TSfYud96AFZ/qniSpyvcToK3prABWx+lhtZoqFpIZwP4kMGpLVcUkKhAbMugol+/wiLGssoTaTlU1yRpgeciQCodeKtCJ3cM3ga4GqV5ZLyBRL6IYrhvKxWOBY6Yz2lpEhZR6j9q2/h5QDte0s9TORjKHZ+VhGT3u8e+TSpXF+1ebGLZ5PCf4LimgswKWTZVRtZ/pRAdvGKB4VsuqTtBXTgIjkyhnDay9VOH6AoOczT9ZXCuTaDb8bkYn2YiurxrRt5r3lfr+mM4QYKB9/gA0BH6FoHMCDvaSF8/YF41YwQDg2poF7LYF9b9qkMIyFDhri2/t0CqUXIkE2IVRRdOBUk+RylCql3KB3diPBVj5eq9Z/gwITp4O7kIUFvKe8rHkI9AoSZuaNw/3AK75njjgFtAt6kMX7OcTEtLVyR/uCT0YOBc3sOwfBKY4jVGY6TmgZv5oihfLW0i49lXhlElU/fRZogyinkShkO6mKRbgAP6GE6cCOeARLpEALwC2mLEvNgmH82cyFreJUvupJimTRAIcHkLVpakJyiRuE5VXDwtMF4e6VZSnr2Qitb+r41NrKk9r7AqX4WTbROJhT75I1P4D1owW3Cv43hVEQuK5yTTncFaqTKpcNraHfccWT1uRqI1zcnS1gN2JWE36mEjMRLeJLrN1qS0pF/AeQGN5IBPSVJ3oMPx2Uht72mmYygSs0VyTgiuXbKhURxV0V34mctcKbLZyfnsJdi0JYOZ4jty542S/Q2Jad72nK9RNgG7WC0k0XulqNnFVFv53a4yZDHQvAHCVfN3Q6wcZzYsJ+QvTnEsrRWR+MAAAAABJRU5ErkJggg=="
            width="44"
            height="44"
            x="33"
            y="7419"
          />
        </svg>
        <h3>FILTER REVIEWS</h3>
      </div>
      <div class="filter-inputs xo-row xo-no-gutters">
        <div class="filter-input xo-col-6 xo-col-md-2">
          <modal-review listOption="Man,Vrouw" label="Geslacht" :id="55638"
            >Geslacht</modal-review
          >
        </div>
        <div class="filter-input xo-col-6 xo-col-md-2">
          <modal-review
            listOption="17-24,25-30,31-40,41-50,51-60,60+"
            label="Leeftijd"
            :id="55639"
            >Leeftijd</modal-review
          >
        </div>
        <div class="filter-input xo-col-6 xo-col-md-2">
          <modal-review
            listOption="Heel actief,Gemiddeld,Niet zo actief"
            label="Activiteit"
            :id="55636"
            >Activiteit</modal-review
          >
        </div>
        <div class="filter-input xo-col-6 xo-col-md-2">
          <div class="filter-btn review__btn">
            <span>Met foto's</span>
            <span :class="'checkbox' + (isPictured ? ' is-checked' : '')" @click="filterPicture">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                />
              </svg>
            </span>
          </div>
        </div>
        <form
          action=""
          class="search-review xo-col-12 xo-col-md-4"
          @submit="textSearchReview"
        >
          <input
            type="text"
            class="search-input review__btn"
            placeholder="Zoek reviews..."
            v-model="free_text_search"
          />
          <button type="submit">
            <svg
              width="22"
              height="23"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="692 4161 22 23"
            >
              <image
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAACV0lEQVRIS62VTYiOYRSGr9tCSVkwlGIYJCxslP+RKX/5aVZsKMICZRJFs/JXjFJoFpRSEkWUFc00+RlCFkb+NigSJWZFSHHrfD3v9H7TN/PNfJ9n977nOddz3nPu535FH8t2LbAGmA9MBYYDH4AXQIekm33lxnv1DtoeDRwCtvWXmA5okXSx1L4isO3FwDVgZNr8FmgHXgG/gLHAbGB1DnZJ0vre8B6w7QbgVtrwEdgl6WqpalKb9gE7Urxd0vL83gLYdlT4BRgCPAaWSPpWphWRtwG4kPa1SmrKcjLwdaARiEprJf0tB83itrcCZ9PzTEnPC8OzPT31MJ7rJd0fKDQHvwcsBNokrcjAx4C9wBNJswYLTa2sBzpTbo2k7qj4NhBq2C3pRCXgBP8KjAJWSboR4HfABGCppI4qwG3AMqBJUmuAQw01wDxJj6oAXwHWAs2SWgL8GpiSfUIV4LvAImC7pDMBjjsfkzwo6UAlYNuh/+/AMKBB0p0ANwNHgPeSJlYIXgdcBv4AIyT9CPAY4HMCbpJ0frBw22+AycA5SVsKOk5SOQ7sAX4DMySF+Qxo2T4VSgB+AnWSCkXmTSi8dhzQnaTXVY5sO1oYrYxVGFqWkwcH9GkSecSPAqclxYFFy3Y42f6QaC4Q9tooKey12OhtjwfCuOOKZitkFJKMNsVPIK79pFz8JLA5hga8DL8uDK/U59rembx2Wj/tCK8+LOmZ7TnAw1RouNuCkuAMZnsuEEl1wNDU/6iqU9Kn/KG2oy0P0ruufsHlhlei9z3w/wpO0l0JbPwHynXdj70w5aEAAAAASUVORK5CYII="
                width="22"
                height="23"
                x="692"
                y="4161"
              />
            </svg>
          </button>
        </form>

        <div class="filter-input xo-col-12 xo-col-md-2" style="margin-top: 30px">
          <modal-review :isSort=true >Sorteer op..</modal-review>
        </div>
      </div>
    </div>

    <div class="customer-comments" style="margin-top: 20px">
      <div
        class="customer-comment"
        v-for="comment in reviewList"
        :key="comment.id"
      >
        <div class="xo-row">
          <div class="customer-info xo-col-12 xo-col-md-2">
            <div class="customer-info--first">
              <div
                class="customer-name"
                :data-user-id="comment.user.id"
                v-cloak
              >
                {{ comment.user.display_name }}
              </div>
              <div
                class="customer-address"
                v-for="(value, key) in comment.custom_fields"
                :key="key"
              >
                <template v-if="value.title == 'Locatie'" v-cloak>
                  {{ value.value }}
                </template>
              </div>
            </div>
            <div class="customer-info--second">
              <div
                class="customer-sex"
                v-for="(value, key) in comment.custom_fields"
                :key="key"
              >
                <template v-if="value.title != 'Locatie'">
                  <span v-cloak>{{ value.title }}</span>
                  <span v-cloak>{{ value.value }}</span>
                </template>
              </div>
            </div>
          </div>
          <div class="customer-comment__content xo-col-12 xo-col-md-10">
            <star-voting :current="comment.score"></star-voting>
            <div class="comment-title" v-cloak>{{ comment.title }}</div>
            <div class="comment-content" v-cloak>{{ comment.content }}</div>
            <div class="comment-vote">
              <div class="comment-vote__title">
                Vond je dit een nuttige reivew?
              </div>
              <div class="comment-vote__info">
                <button
                  type="button"
                  class="comment-vote--up"
                  @click="
                    comment.votes_up++;
                    voteReview(comment.id, 'up');
                  "
                >
                  <svg
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="34 8651 16 24"
                  >
                    <image
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAACQElEQVQ4T2NkwAEKCws5X758GRsTE7Pey8vrNS51jNgk0tLSuN6+fdu7du3aDFdX161VVVUJjo6Ob7CpxTCgoaGBY9++ff0nTpzI+PXrF1iPiYnJ5o6OjkQXF5e36IagGBAaGsrGzMw8ccWKFRnoCl1cXLZWV1fHODo6fkCWgxvQ0NDAdejQoYn79u1LweVfQ0PDnTNmzIg2NzeHuwRsQGhoKM/3798nbtu2Lenfv38MoqKid3/9+vX348ePatzc3I94eXk/vXjxQgek1sPDY1dSUlJ8WFjYCxCfERRgV65cmXzy5Mmkv3//Mmhpad11d3f3nzt3bs2nT58i2NnZD6WkpGSdP39+6rFjx+xBmjQ0NPYsWLAgxsLC4iWjv7//vE2bNiX+//+fQVFR8UFubm54UVHRKQYGhi0MDAzeDAwMZ5KSkpw8PDy4Ozo61p87d84CZIiDg8Pe5ubmYpAX/oMEpKWl7/X394eFhYWdhYbBNgYGBk8GBgYQ34uBgeHVuXPn5JOSkpZduHDBCqRGRERkNaO6uvoxXl7e3z4+PoUNDQ3nkAIQwwCQ3Nq1a2W6urpmvH79WjEiIqKX0dPTU1RQUPDPsmXL3qOFPlYDQGqysrJ4Ll++zHv48OHnWFMiLi8QlRIJeQFvSiTWC1hTIhbn4QyDUQNQQ2sQpwNGRsa9////d2JkZLzMxcXl+vXr15ckpcTk5OSOpUuXZjo6Om4JCAhISE9P/02SAcuWLdMrLy+Pi42N3d7W1rYXVzEHAMHQ9Udx4pNjAAAAAElFTkSuQmCC"
                      width="12"
                      height="18"
                      x="34"
                      y="8651"
                    />
                  </svg>
                  <span v-cloak>{{ comment.votes_up }}</span>
                </button>
                <button
                  type="button"
                  class="comment-vote--down"
                  @click="
                    comment.votes_down++;
                    voteReview(comment.id, 'down');
                  "
                >
                  <svg
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="34 8651 16 24"
                  >
                    <image
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAACQElEQVQ4T2NkwAEKCws5X758GRsTE7Pey8vrNS51jNgk0tLSuN6+fdu7du3aDFdX161VVVUJjo6Ob7CpxTCgoaGBY9++ff0nTpzI+PXrF1iPiYnJ5o6OjkQXF5e36IagGBAaGsrGzMw8ccWKFRnoCl1cXLZWV1fHODo6fkCWgxvQ0NDAdejQoYn79u1LweVfQ0PDnTNmzIg2NzeHuwRsQGhoKM/3798nbtu2Lenfv38MoqKid3/9+vX348ePatzc3I94eXk/vXjxQgek1sPDY1dSUlJ8WFjYCxCfERRgV65cmXzy5Mmkv3//Mmhpad11d3f3nzt3bs2nT58i2NnZD6WkpGSdP39+6rFjx+xBmjQ0NPYsWLAgxsLC4iWjv7//vE2bNiX+//+fQVFR8UFubm54UVHRKQYGhi0MDAzeDAwMZ5KSkpw8PDy4Ozo61p87d84CZIiDg8Pe5ubmYpAX/oMEpKWl7/X394eFhYWdhYbBNgYGBk8GBgYQ34uBgeHVuXPn5JOSkpZduHDBCqRGRERkNaO6uvoxXl7e3z4+PoUNDQ3nkAIQwwCQ3Nq1a2W6urpmvH79WjEiIqKX0dPTU1RQUPDPsmXL3qOFPlYDQGqysrJ4Ll++zHv48OHnWFMiLi8QlRIJeQFvSiTWC1hTIhbn4QyDUQNQQ2sQpwNGRsa9////d2JkZLzMxcXl+vXr15ckpcTk5OSOpUuXZjo6Om4JCAhISE9P/02SAcuWLdMrLy+Pi42N3d7W1rYXVzEHAMHQ9Udx4pNjAAAAAElFTkSuQmCC"
                      width="12"
                      height="18"
                      x="34"
                      y="8651"
                    />
                  </svg>
                  <span v-cloak>{{ comment.votes_down }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <template v-if="comment.comment">
          <div class="comment-reply">
            <div class="shop-info">
              <div class="shop__image">
                <img :src="comment.comment.comments_avatar" alt="" />
              </div>
              <div class="shop__name">{{ comment.comment.display_name }}</div>
            </div>
            <div class="reply__content">{{ comment.comment.content }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import StarVoting from "Vue/components/globals/StarVoting.vue";
import { mapActions, mapGetters } from "vuex";
import store from "Vue/store/index";
import ModalReview from "Vue/components/globals/ModalReview.vue";
import { Bottomline, ReviewsEntity } from "Types/review/index";

@Component({
  store,
  components: {
    StarVoting,
    ModalReview,
  },
  computed: {
    ...mapGetters("ReviewStore", {
      reviewList: "getReviewList",
      bottomLine: "getBottomLine",
      dataFilter: "getDataFilter"
    }),
  },
  methods: {
    ...mapActions("ReviewStore", [
      "filterAPI",
      "updateReviewList",
      "updateBottomLine",
      "updateDataFilter"
    ]),
  },
})
export default class ProductReview extends Vue {
  private readonly reviewList!: ReviewsEntity[];

  private readonly bottomLine!: Bottomline;

  private readonly dataFilter!: any;

  review_score = 1;

  review_title = "";

  isPictured = false;

  review_content = "";

  email = "";

  display_name = "";

  free_text_search = "";

  appkey = "TO1vyGlOUMHn44dQPyVyRhpmCox6vCxnKg4HuPMD";
  domain = "upfrontreep.myshopify.com";
  sku = "6572332843070";
  product_title = "[NEW] Upfront Oats";
  product_description = "This is description";
  product_url = "https://upfrontfood.com/products/new-upfront-oats-chocolade";
  product_image_url =
    "https://cdn.shopify.com/s/files/1/0254/4667/8590/products/oatsppi_ef6afa72-db93-4e94-8e25-b1811205e764_600x800_crop_center.jpg?v=1618835100";

  filterAPI!: (data: any) => Promise<void>;
  updateReviewList!: (reviewList: ReviewsEntity[]) => void;
  updateBottomLine!: (bottomLine: Bottomline) => void;
  updateDataFilter!: (data:any) => void;

  created() {
    this.fetchData();
  }

  async fetchData() {
    const res = await fetch(
      "https://api.yotpo.com/v1/widget/TO1vyGlOUMHn44dQPyVyRhpmCox6vCxnKg4HuPMD/products/4777311830078/reviews.json?a"
    );
    const review = await res.json();
    if (review.status.code === 200) {
      this.updateReviewList(review.response.reviews as ReviewsEntity[]);
      this.updateBottomLine(review.response.bottomline);
    }
  }

  async submitReview() {
    const {
      appkey,
      domain,
      sku,
      product_title,
      product_description,
      product_url,
      product_image_url,
      review_score,
      review_title,
      review_content,
      email,
      display_name,
    } = this;

    const data = {
      appkey,
      domain,
      sku,
      product_title,
      product_description,
      product_url,
      product_image_url,
      review_score,
      review_title,
      review_content,
      email,
      display_name,
    };

    const res = await fetch("https://api.yotpo.com/v1/widget/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async voteReview(reviewID: number, typeVote: string) {
    const res = await fetch(
      `https://api.yotpo.com/reviews/${reviewID}/vote/${typeVote}`
    );
    const dataRes = await res.json();
    console.log(dataRes);
  }

  filterPicture() {
    this.isPictured = !this.isPictured;
    this.updateDataFilter({ pictured: this.isPictured });
    this.filterAPI(this.dataFilter);
  }

  textSearchReview(e: any) {
    e.preventDefault();
    const data = {
      domain_key: "6544979951678",
      free_text_search: this.free_text_search,
    };

    this.filterAPI(data);
  }
}
</script>

<style lang="scss">
.product-review {
  padding-top: 25px;
  padding-bottom: 25px;

  * {
    font-size: var(--font-size-small);
  }

  @media (min-width: 768px) {
    padding-top: 80px;
    padding-bottom: 80px;
    * {
      font-size: var(--font-size-base);
    }
  }

}
// Review input
.review-write {
  margin-top: 25px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}

.review__btn {
  border: 2px solid #000;
  border-radius: 10px;
  height: 49px;
  width: 100%;
  margin-bottom: 10px;

  span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    height: 60px;
  }
}
// Product review overview
.review-overview {
  > div span {
    margin-top: 25px;
  }
  .review-number {
    font-size: var(--font-h3-mobile);
    margin-bottom: 10px;

    @media (min-width: 768px) {
      font-size: var(--font-h2-desktop);
    }
  }
}

.review-average {
  .review-star {
    display: flex;
    .star-rating {
      align-self: center;
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
}

// Customer comment
.customer-comment {
  padding-bottom: 20px;
  border-bottom: 3px solid #000;

  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }
}
.customer-info {
  .customer-name {
    font-weight: 700;
  }
}
.customer-info--second {
  margin-top: 15px;
  span:first-child {
    font-weight: 700;

    &::after {
      content: ":";
    }
  }
}

// Comment content
.customer-comment__content  {
  .star-rating {
    margin-top: 13px;
  }
}
.comment-title {
  margin: 5px 0;
  font-weight: 700;
}

.comment-content {
  margin: 10px 0;
}

.comment-vote {
  margin-top: 20px;

  .comment-vote__info {
    margin-top: 10px;
    display: flex;

    button {
      display: flex;
      align-items: center;

      padding: 0;
      margin-right: 20px;
    }

    svg {
      margin-right: 5px;
    }
  }

  .comment-vote--down svg {
    transform: rotate(180deg);
  }
}
// Filter
.review-filter {
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 80px;
  }
}

.filter-title {
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  svg {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }
}
.filter-input {
  .checkbox {
    border-radius: 5px;
    border: 2px solid #000;
    width: 20px;
    height: 20px;
    display: flex;
    cursor: pointer;
    margin-right: 10px;

    &.is-checked {
      background-color: #000;
      svg {
        fill: #fff;
      }
    }

    svg {
      width: 14px;
      height: 14px;
      margin: auto;
    }
  }

  &:nth-child(2n+1) {
    padding-right: 10px;
  }
  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      padding-right: 10px !important;
    }
  }
}

.search-review {
  display: flex;
  align-items: center;
  margin-top: -5px;

  .search-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    flex: 1;

    padding: 0 25px;
    margin-bottom: 0;
  }

  button {
    background-color: #000;
    width: 60px;
    height: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}

// Create review
.review-create__container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  width: 100%;
  height: 100%;

  background-color: rgba($color: #000000, $alpha: 0.3);

  display: none;
  justify-content: center;
  align-items: center;
}
.review-create__wrapper {
  background-color: #f5efe8;
  padding: 20px;
  width: 95%;
  max-width: 700px;

  > div {
    display: flex;
    flex-direction: column-reverse;

    margin-bottom: 10px;
  }

  input[required] {
    & + label::after {
      content: "*";
      color: #f00;
    }
  }
}

.comment-reply {
  border-left: 2px solid #999;
  margin-left: 20px;
  margin-top: 20px;
  padding: 10px 20px;

  display: flex;

  .shop-info {
    margin-right: 20px;
    .shop__name {
      font-weight: 700;
      text-align: center;
    }
  }

  .shop__image {
    img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }
  }
}
</style>
