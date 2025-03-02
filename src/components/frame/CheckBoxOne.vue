<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  labels: Array<string | number | boolean>,
  values: Array<string | number | boolean>,
  modelValue: string | number | boolean;
  col?: number;
  type?: string;
  title?: string;
  width?: string;
}>();

const emits = defineEmits();
const handleChange = (value: string | number | boolean) => {
  emits('update:modelValue', value);
};

</script>

<template>
  <div class="radio_wrap" :style="{ width: width ? width : '' }">
    <span>{{ title }}</span>
    <div class="radios">
      <button
        :style="{
          'width': col ? `calc(100% / ${col} - 5px)` : '100%',
          'margin-top': col !== undefined && id < col ? 0 : ''
        }"
        type="button"
        v-for="(value, id) in values"
        :class="{ 'on': modelValue === value, [String(value)]: type === 'color', 'color': type === 'color' }"
        :key="id"
        @click="handleChange(value)"
      >
        {{ labels[id] }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio_wrap > span {
  display: block;
  color: var(--c-lnk-dark);
  margin-bottom: 10px;
}

.radios {
  padding: 5px;
  display: flex;
  border-radius: var(--s-theme-radius);
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    height: var(--s-theme-btn);
    font-size: var(--f-theme-small);
    height: 50px;
    font-weight: 700;
    padding: 0 10px;
    border-radius: var(--s-theme-radius);
    border: 1px solid var(--c-lnk-light);
    margin-top: 15px;
    position: relative;
    color: var(--c-lnk-dark);
  }

  button.on {
    border-color: var(--c-lnk-black);
    color: var(--c-lnk-black);
  }

  .color:before {
    content: "";
    width: 18px;
    height: 18px;
    border: 1px solid var(--c-lnk-black);
    border-radius: 50%;
    float: left;
    background: var(--c-lnk-light);
  }

  .color:after {
    content: "";
    clear: both;
    display: block;
  }

  .white:before {}
  .black:before {}
  .blue:before {}
  .pink:before {}
  .red:before {}
  .yellow:before {}
  .purple:before {}
  .green:before {}
}
</style>