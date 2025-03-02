<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps<{
  array: string[] | number[];
  type?: string;
  modelValue: string[] | number[];
  title?: string;
}>();

const emits = defineEmits();

const updateValue = () => {
  emits('update:modelValue', [minIndex.value, maxIndex.value].map((index) => props.array[index]));
};

const findIndex = (value: string | number): number => {
  return props.array.findIndex((item) => item === value);
};

const minIndex = ref<number>(-1);
const maxIndex = ref<number>(-1);
const isDragging = ref<boolean>(false);

const isBetweenArrayIndex = (index: number): boolean => {
  return (
    minIndex.value !== -1 &&
    maxIndex.value !== -1 &&
    index >= Math.min(minIndex.value, maxIndex.value) &&
    index <= Math.max(minIndex.value, maxIndex.value)
  );
};

const isLastIndex = (index: number): boolean => {
  return index === Math.max(minIndex.value, maxIndex.value);
};

const isFirstIndex = (index: number): boolean => {
  return index === Math.min(minIndex.value, maxIndex.value);
};

const startDrag = (index: number) => {
  minIndex.value = index;
  isDragging.value = true;
};

const endDrag = (index: number) => {
  maxIndex.value = index;
  isDragging.value = false;
  updateValue();
};

const handleStart = (event: MouseEvent | TouchEvent) => {
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  startDrag(findClosestIndex(clientX, event));
};

const handleEnd = (event: MouseEvent | TouchEvent) => {
  const clientX = 'touches' in event ? event.changedTouches[0].clientX : event.clientX;
  endDrag(findClosestIndex(clientX, event));
};

const handleMove = (event: MouseEvent | TouchEvent) => {
  if (isDragging.value) {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    endDrag(findClosestIndex(clientX, event));
  }
};

const handleMouseDownButton = (event: MouseEvent) => {
  if (isDragging.value) {
    endDrag(findClosestIndex(event.clientX, event));
  }
};

const handleTouchStartButton = (event: TouchEvent) => {
  const touch = event.touches[0];
  startDrag(findClosestIndex(touch.clientX, event));
};

const handleTouchEndButton = (event: TouchEvent) => {
  const touch = event.changedTouches[0];
  if (isDragging.value) {
    endDrag(findClosestIndex(touch.clientX, event));
  }
};

const handleTouchMoveButton = (event: TouchEvent) => {
  const touch = event.touches[0];
  if (isDragging.value) {
    endDrag(findClosestIndex(touch.clientX, event));
  }
};

const findClosestIndex = (clientX: number, event: MouseEvent | TouchEvent): number => {
  const sliderWidth = (event.currentTarget as HTMLElement).offsetWidth;
  const mouseX = clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
  const percentage = (mouseX / sliderWidth) * 100;
  let index = (percentage * (props.array.length - 1)) / 100;

  if (Math.abs(index - Math.round(index)) > 0.15) {
    index = Math.round(index);
  } else {
    index = Math.floor(index);
  }

  return Math.min(Math.max(index, 0), props.array.length - 1);
};

onMounted(() => {
  minIndex.value = findIndex(props.modelValue[0]);
  maxIndex.value = findIndex(props.modelValue[1]);
  updateValue();
});
</script>

<template>
  <div class="slider_wrap" :class="{'type_hide': type=='hide'}">
    <span v-if="title">{{title}}</span>
    <div
      class="slider"
      @mousedown.prevent="handleStart"
      @touchstart.prevent="handleStart"
      @mouseup.prevent="handleEnd"
      @touchend.prevent="handleEnd"
      @mousemove.prevent="handleMove"
      @touchmove.prevent="handleMove"
    >
      <div class="bar"></div>
      <ul class="items">
        <li
          :style="{ width: index + 1 === array.length ? 0 : `calc(100% / ${array.length - 1})` }"
          :key="index"
          v-for="(item, index) in array"
          :class="{ 
            'active': isBetweenArrayIndex(index), 
            'dragging': isDragging, 
            'last-active': isLastIndex(index) ,
            'first-active' : isFirstIndex(index)  
          }"
        >
          <button
            type="button"
            @mousedown="handleMouseDownButton"
            @touchstart.prevent="handleTouchStartButton"
            @touchend.prevent="handleTouchEndButton"
            @touchmove.prevent="handleTouchMoveButton"
          >
            <span>{{ item }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slider {
    width: 100%;
    height: 30px;
    padding-top: 5.5px;
    position: relative;
  }

  .slider_wrap > span{
    display: block;
    color:var(--c-lnk-dark);
    margin-bottom:10px;
  }

  .bar {
    content: "";
    width: 100%;
    height: 4px;
    top: 0;
    left: 0;
    background: var(--c-lnk-base);
  }

  .items {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    top: -4px;
    height: 100%;
  }

  .items li {
    height: 100%;
    position: relative;
  }

  .items li.active:after {
    content: "";
    width: 100%;
    height: 4px;
    position: absolute;
    background: var(--c-lnk-black);
    top:-1px;
  }

  .items li.active.last-active:after {
    background: none !important;
  }

  .items li.dragging:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: calc((var(--c-lnk-black) - var(--c-lnk-base)) / 2);
    background-color: var(--c-lnk-base);
  }

  button {
    transition: background-color 0.3s;
    width: 12px;
    position: relative;
    border-radius: 50%;
    height: 12px;
    top: -6px;
  }

  button span {
    position: absolute;
    top: 100%;
    right: 0;
    text-align: center;
    margin-right: -44px;
    width: 100px;
    font-size:var(--f-theme-tiny);
  }

  .items li:hover button,
  .active button {
    background-color: var(--c-lnk-black);
    color: var(--c-lnk-black);
  }

  .type_hide .active button {
    background-color: transparent;
  }
  .type_hide li button span{
    font-size:0;
  }

  .items li:hover button span,
  .type_hide li.active.first-active button span ,
  .type_hide li.active.last-active button span{
    font-size:var(--f-theme-tiny);
  }

  .type_hide .active.first-active button ,
  .type_hide .active.last-active button {
    background-color: var(--c-lnk-black);
  }
</style>