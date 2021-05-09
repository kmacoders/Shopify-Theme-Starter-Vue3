<template>
  <div class="filter-container">
    <button class="filter-btn review__btn" type="button" @click="popupModal">
      <span>
        <template v-if="optionSelected || sortSelected.label">
          {{ optionSelected || sortSelected.label }}
        </template>
        <slot v-else></slot>
      </span>
      <svg
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="width: 30px; height: 30px"
      >
        <path
          d="M8,10l4,4l4,-4"
          stroke-linecap="round"
          stroke-width="1.5"
          stroke="#323232"
          fill="none"
          stroke-linejoin="round"
        ></path>
        <path fill="none" d="M0,0h24v24h-24Z"></path>
      </svg>
    </button>
    <div class="filter-modal" :id="'filter-modal-' + id" ref="modal">
      <div class="modal__wrapper">
        <div class="modal__title">
          <h3>Filter by <slot></slot></h3>
          <button type="button" @click="popupModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20"
              height="20"
              viewBox="628 42 34 34"
              style="fill: #000"
            >
              <image
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADR0lEQVRYR7WYy6tXVRTHP18NJ0I48C9oKFg+EjO1hyhyEaQyS0REnTiRpMKriY98S6gYOpUbRERpplwRUcRHSjSLSh3YA7WBaD5SJw5kybrs3+Xcc8/av3P0d/fwt/de6/Nb730EYGYvAEuBJ0CPJPPfh3KZ2QJgFHBE0k2Z2YvAT8DLSfFvwFRJj4YKxMxOALOT/PvARAfZC6wsKf0DeFvSf52EMbPhQC/QVZLb6yDngekVCq8BYyU97BSMmV0EXq/S5SDvAwcDZZeSZW4/D0yKwWMFd5TFdSsF6xZgXaDsRrLM/88KY2Y/A68F9z1Y3+0DSTC7gE+Dw78Db0q61wTGzFy+x8Sc4N53kjx76AdJMJuB9cGl655ZkmpbxszO+h8I5P0o6b3W3gCQBPMFsCq47Nn0lqQ7OcuY2TDAY6KcHa1r30paWJQxCCTB7ADWBMr+TZYJ3ZTJRBf5gyRPkAGrEiTB7AE+DmAuA1MkPSjvm9nxjCUOSvqgSmYIkmC2A58FMF5nJki6Wwj4M+664HwIMShYqwSYWS6brkgak6CLZbssqj87otjKWqTwT7cBawMhvwDeL1q9o3zse0kf5oK7lkUKMLuBT9oJLO0PSNHc3VoWKcDksqmxO9qmb47czDYA3cDI4JzPNAckLW9ivUYWKVjmL+ClQNFjYHTTeaYxSGmoif70rz5aNIFpBGJmp4CZNU1+FZgm6Vad87VBzCxXrCJd7sLxdYarWiBmdhqYEWjzgucj5c5g32EmtRsh2oKY2TngjUBJf7Eys1zRcze9WtWbWnLb9ZqTwKwA4rCkecU9M8uNEA7jlqmcZ3LdNxqqXXfYO8wsN3b+mSwzCCaaR3LZcUjS/DZFz+NldXCmEqZqQrvgD6xAyKDJKgIys02AV+Gq5QHsMePNsm+VZ1Yf76JB96ikd+rUhEIFzo0QfwOvtIpecYr3Z+e0QNE3khY1gSjAfA5szLhpsg9XrXdNzhK1W3nGTV8CHwX7/wDj/KXnDyuP9Kr1taTFz2KJ8p3UtT1uqtZXDhK5pFfS3E5AFNy0D1hRIfOag/iXAP8iUFwds0SFZTxePG6Ka38rRnqAJWnHP9Qs66QlKmC2pkfcCMBbSNdT1jhCaQladI0AAAAASUVORK5CYII="
                width="20"
                height="20"
                x="628"
                y="42"
              />
            </svg>
          </button>
        </div>
        <div class="modal__items">
          <template v-if="!isSort">
            <div
              :class="[
                'modal__item',
                option === optionSelected ? 'is-selected' : '',
              ]"
              v-for="(option, index) in listOptionArray"
              :key="index"
              @click="selectOption(option)"
            >
              <span>{{ option }}</span>
              <span></span>
            </div>
          </template>
          <template v-else>
            <div
              :class="[
                'modal__item',
                option === sortSelected ? 'is-selected' : '',
              ]"
              v-for="(option, index) in listSort"
              :key="index"
              @click="selectSort(option)"
            >
              <span>{{ option.label }}</span>
              <span></span>
            </div>
          </template>
        </div>

        <div class="modal__buttons">
          <button
            type="button"
            :class="['review__btn', isFilterLoading ? 'btn--is-loading' : '']"
            @click="filter"
          >
            <h3>apply</h3>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CRFS } from "Types/review";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import store from "Vue/store/index";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

interface Sort {
  sort_by: string,
  ascending: boolean,
  label?: string
}

const ModalProps = Vue.extend({
  props: {
    listOption: String,
    id: Number,
    isSort: Boolean,
  },
});

@Component({
  store,
  computed: {
    ...mapGetters("ReviewStore", {
      crfs: "getCrfs",
      isFilterLoading: "getIsFilterLoading",
      dataFilter: "getDataFilter",
    }),
  },
  methods: {
    ...mapActions("ReviewStore", ["filterAPI", "updateCRFS", "updateDataFilter"]),
  },
})
export default class ModalReview extends ModalProps {
  private readonly crfs!: CRFS[];

  private readonly isFilterLoading!: boolean;

  private readonly dataFilter!: any;

  optionSelected: string = "";

  modalEl: HTMLElement;

  listSort = [
    { sort_by: 'reviewer_type', ascending: false, label: "Type of review" },
    { sort_by: 'score', ascending: false, label: "Highest score" },
    { sort_by: 'score', ascending: true, label: "Lowest score" },
    { sort_by: 'date', ascending: false, label: "Lastest" },
    { sort_by: 'votes_up', ascending: false, label: "Highest votes" },
    { sort_by: 'votes_down', ascending: false, label: "Lowest votes" },
    { sort_by: 'image_count', ascending: false, label: "Image" },
    { sort_by: 'grouping_originated', ascending: true, label: "Grouping" }
  ] as Sort[];

  sortSelected: Sort = {} as Sort;

  filterAPI!: (data: any) => Promise<void>;

  updateCRFS!: (crf: CRFS) => void;

  updateDataFilter!: (data: any) => void;

  mounted() {
    this.modalEl = this.$refs.modal as HTMLElement;
  }

  selectOption(option: string) {
    this.optionSelected = option;
  }

  selectSort(sort: Sort) {
    this.sortSelected = sort;
  }

  filter() {
    if (this.isSort) {
      const { label, ...sort } = this.sortSelected;
      const sortings = [sort];
      this.updateDataFilter({sortings});
    }
    else {
      const { id, optionSelected } = this;
      const dataCRF = {
        question_id: id,
        answer: [optionSelected],
      };
      this.updateCRFS(dataCRF);
    }

    const { dataFilter } = this;
    this.filterAPI(dataFilter);
  }

  popupModal() {
    this.modalEl.classList.toggle("is-popup");
    document.body.classList.toggle("remove-scrolling");
  }

  @Watch("isFilterLoading")
  onLoading(newValue: boolean, oldValue: boolean) {
    if (oldValue && !newValue) {
      this.modalEl.classList.remove("is-popup");
      document.body.classList.remove("remove-scrolling");
    }
  }

  get listOptionArray(): String[] {
    return this.listOption.split(",");
  }
}
</script>

<style lang="scss">
.filter-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 15px;
}

.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100%;
  height: 100%;

  visibility: hidden;

  background-color: rgba($color: #000000, $alpha: 0.3);

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.is-popup {
    visibility: visible;
  }

  .modal__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 30px;

    background-color: #f5efe8;

    box-shadow: rgba($color: #000000, $alpha: 0.2) 0px 0px 12px,
      rgba($color: #000000, $alpha: 0.5) 0px 0px 0.5px;

    @media (min-width: 768px) {
      position: initial;
      width: 700px;
      border-radius: 15px;
    }

    .modal__title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 30px 30px 0;
    }

    .modal__buttons {
      margin-top: 20px;
      padding: 0 30px;
    }
  }
}

.modal__items {
  margin-top: 20px;
}

.modal__item {
  padding: 15px 30px;

  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &.is-selected {
    background-color: #f8e3cb;

    span:last-child::before {
      position: absolute;
      top: 1px;
      left: 1px;
      content: "";

      width: 14px;
      height: 14px;
      background-color: #000;

      border-radius: 50%;
    }
  }

  &:hover {
    background-color: #f8e3cb;
  }

  span:last-child {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #000;
    position: relative;
  }
}
</style>
