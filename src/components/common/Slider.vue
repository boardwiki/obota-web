<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  slides: any[];
}>();

const active = ref<number>(1);
const startX = ref<number | null>(null);

const move = (amount: number) => {
  let newActive;
  const newIndex = active.value + amount;
  if (newIndex > props.slides.length) newActive = 1;
  if (newIndex === 0) newActive = props.slides.length;
  active.value = newActive || newIndex;
};

const jump = (index: number) => {
  active.value = index + 1;
};

const touchStart = (event: TouchEvent | MouseEvent) => {
  startX.value = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
};

const touchEnd = (event: TouchEvent | MouseEvent) => {
  if (startX.value === null) return;

  const endX = event instanceof TouchEvent ? event.changedTouches[0].clientX : event.clientX;
  const deltaX = endX - startX.value;

  if (deltaX > 30) {
    move(-1); // 오른쪽으로 이동
  } else if (deltaX < -30) {
    move(1); // 왼쪽으로 이동
  }

  startX.value = null;
};
</script>

<template>
  <div
    class="slider_wrap"
    @mousedown="touchStart"
    @touchstart="touchStart"
    @mouseup="touchEnd"
    @touchend="touchEnd"
  >
    <div class="slides">
      <transition-group
        name="slide"
        mode="out-in"
        enter-class="slide-enter"
        leave-class="slide-leave"
        enter-active-class="animated slide-enter-active"
        leave-active-class="animated slide-leave-active"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index + 1 === active }"
        >
          <img :src="slide.img" alt="">
          <div class="con">{{ index + 1 }}</div>
        </div>
      </transition-group>
    </div>
    <ul class="dots">
      <li v-for="(dot, index) in slides" :key="index" :class="{ active: index + 1 === active }">
        <button @click="jump(index)">{{ index }}</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.slider_wrap {
  position: relative;
  background: var(--c-lnk-base);
}

.dots {
  position: absolute;
  display: flex;
  width: 100%;
  text-align: center;
  bottom: 20px;
  justify-content: center;
  align-items: center;

  li button {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #221e21;
    opacity: 0.2;
    display: inline-block;
    margin: 0 3px;
    cursor: pointer;
    transition: opacity 0.4s ease-in-out, width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-size: 0;
  }

  .active button {
    width: 22px;
    opacity: 1;
  }
}

.slides {
  height: 100%;
  width: 100%;
  position: relative;

  > div {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  > div.active {
    opacity: 1;
    transition: opacity 0.5s ease-in-out; // 페이드인/페이드아웃 트랜지션
    position: static;
  }

  .con {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  img {
    width: 100%;
  }

  .animated {
    transition: transform 400ms;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.5s ease-in-out; // 페이드인/페이드아웃 트랜지션
  }

  .slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    opacity: 1;
  }

  .slide-leave-active, .slide-enter /* .slide-enter-active in <2.1.8 */ {
    opacity: 0;
  }
}
</style>