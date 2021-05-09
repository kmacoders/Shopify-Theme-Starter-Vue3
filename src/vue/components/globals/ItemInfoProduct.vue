<template>
  <div
    :class="
      'infor__item' +
      (percent !== undefined ? ' infor__item-percent' : '') +
      (isExpand ? ' is--expand' : '')
    "
    :style="percentStyle"
  >
    <div class="item__label" @click="expand">
      <span>
        <template v-if="percent !== undefined"> {{ percent }}% </template>
        <slot></slot>
      </span>
      <div class="item__icon">
        <svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
          <g
            stroke="currentColor"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="square"
          >
            <path d="M8,1 L8,15"></path>
            <path d="M1,8 L15,8"></path>
          </g>
        </svg>
        <svg class="Icon Icon--minus" role="presentation" viewBox="0 0 16 2">
          <path
            d="M1,1 L15,1"
            stroke="currentColor"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="square"
          ></path>
        </svg>
      </div>
    </div>
    <div class="item__expand" ref="item_expand">
      <span>{{ value }}</span>
      <div class="item__image" v-if="image">
        <img :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { handleHeightWrapperSlide } from "Helpers/utils";
import Vue from "vue";
import Component from "vue-class-component";

const ItemProps = Vue.extend({
  props: {
    value: String,
    image: String,
    percent: Number,
  },
});

@Component
export default class ItemInfoProduct extends ItemProps {
  isExpand: boolean = false;

  expand(): void {
    this.isExpand = !this.isExpand;
    const el = this.$refs.item_expand as HTMLElement;
    const maxHeight = el.scrollHeight;
    el.style.setProperty("--max-height", maxHeight + "px");
    setTimeout(() => {
      handleHeightWrapperSlide();
    }, 400);
  }

  get percentStyle() {
    return {
      "--width-percent": `${this.percent}%`,
    };
  }
}
</script>

<style lang="scss">
.infor__item {
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #333;
  overflow: hidden;

  &.infor__item-percent {
    .item__label {
      background: -webkit-linear-gradient(
        left,
        #444444 var(--width-percent),
        #333 var(--width-percent)
      );
      background: -moz-linear-gradient(
        left,
        #444444 var(--width-percent),
        #333 var(--width-percent)
      );
      background: -ms-linear-gradient(
        left,
        #444444 var(--width-percent),
        #333 var(--width-percent)
      );
      background: -o-linear-gradient(
        left,
        #444444 var(--width-percent),
        #333 var(--width-percent)
      );
      background: linear-gradient(
        to right,
        #444444 var(--width-percent),
        #333 var(--width-percent)
      );
    }
  }
  > * {
    color: #faf9f7;
  }

  .item__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    cursor: pointer;
  }

  .item__expand {
    transition: max-height 0.3s ease-in-out;
    max-height: 0;
    overflow: hidden;

    span,
    .item__image {
      margin: 25px;
      display: inline-block;
    }
  }

  .item__icon {
    width: 10px;
    height: 10px;

    position: relative;

    .Icon {
      position: absolute;
      left: 0;
      top: 0;
      transition: transform 0.3s ease-in-out, opacity 0.3s;
    }
    .Icon--minus {
      transform: translateY(5px);
      opacity: 0;
    }
  }

  &.is--expand {
    .item__expand {
      max-height: var(--max-height);
    }
    .Icon--plus {
      opacity: 0;
    }

    .Icon--minus {
      transform: translateY(5px) rotate(180deg);
      opacity: 1;
    }
  }

  .item__image {
    width: 70%;
    margin-top: 40px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}
</style>
