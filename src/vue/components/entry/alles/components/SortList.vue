<template>
  <div :class="'collection-sort' + (isExpand ? ' is-expand' : '')">
    <div class="collection-sort__selected" @click="toggleExpand()">
      <div class="collection-sort__heading">sorteren op:</div>
      <template v-for="(option, index) in sortLists">
        <h4
          :key="index"
          v-if="option.handle === handleChoosen"
          class="collection-sort__title">
            {{option.title | hugUppercase}}
        </h4>
      </template>
    </div>
    <ul class="collection-sort__wrapper">
      <li
        v-for="(option, index) in sortLists"
        :key="index"
        @click="onSelectOption(option.handle)"
        class="collection-sort__option">
          {{option.title}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const SortListProps = Vue.extend({
  props: {
    defaultSelect: String,
  }
})

type TSortType = 'product-type' | 'lowest-price' | 'highest-price';

@Component
export default class SortList extends SortListProps {
  private isExpand: Boolean = false;
  private handleChoosen: TSortType = this.defaultSelect as TSortType;
  private sortLists = [
    {
      handle: 'product-type',
      title: 'Product Type'
    },
    {
      handle: 'lowest-price',
      title: 'Lowest Price'
    },
    {
      handle: 'highest-price',
      title: 'Highest Price'
    }
  ]

  mounted() {
    console.log(this.handleChoosen);
  }

  toggleExpand(): void {
    this.isExpand = !this.isExpand;
  }

  onSelectOption(handle: TSortType): void {
    this.toggleExpand();
    this.handleChoosen = handle;
    this.$emit('onClickOption', this.handleChoosen)
  }
}
</script>
<style lang="scss">
  .collection-sort {
    position: relative;
    width: 200px;
  }
  .collection-sort.is-expand {
    .collection-sort__wrapper {
      max-height: 999px;
    }

    .collection-sort__selected::after {
      transform-origin: center center;
      transform: rotate(-135deg);
    }
  }

  .collection-sort__wrapper {
    position: absolute;
  }

  .collection-sort__selected {
    background-color: #f5efe8;
    padding: 12px 40px;
    padding-left: 17px;

    border-radius: 15px;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: 22px;
      right: 17px;
      width: 10px;
      height: 10px;
      border: 2px solid #242424;
      border-top: none;
      border-left: none;
      transform: rotate(45deg);
      transition: all .35s;
    }

    .collection-sort__heading {
      color: #666;
      margin-bottom: 2px;
      font-size: 15px;
    }
  }

  ul.collection-sort__wrapper {
    width: 100%;
    text-align: center;
    z-index: 9;
    border-radius: 6px;
    top: 110%;
    max-height: 0px;
    transition: all .35s ease-in-out;
    overflow: hidden;

    li.collection-sort__option {
      background: #f5efe8;
      padding: 10px 0;
      margin: 5px 0;
      border-radius: 6px;
      cursor: pointer;
      transition: all .35s;

      &:hover {
        font-weight: 600;
      }
    }
  }
</style>
