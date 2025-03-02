<script setup lang="ts">
import { defineEmits } from 'vue';

const props = defineProps<{
  labels      : Array<string|number|boolean>,
  values      : Array<string|number|boolean>,
  modelValue: Array<string | number | boolean>;
  height     ?: string

}>()

const emits = defineEmits();
const handleChange = (value: string | number | boolean) => {
  const updatedModelValue = [...props.modelValue];
  const index = updatedModelValue.indexOf(value);

  if (index !== -1) {
    // If the value is already in the array, remove it
    updatedModelValue.splice(index, 1);
  } else {
    // If the value is not in the array, add it
    updatedModelValue.push(value);
  }

  emits('update:modelValue', updatedModelValue);
};



</script>

<template>
    <div class="radio">
      <ul :style="{height: height ? height : ''}">
        <li
          :style="{width:`calc(100% / ${labels.length})`}"
          v-for="(value,id) in values" 
          :class="{ 'on': modelValue.includes(value)}"
          :key="id" 
        >
          <button 
          type="button" 
          @click="handleChange(value)">{{labels[id]}}</button>
        </li>
      </ul>
    </div>
</template>

<style scoped lang="scss">
  .radio{
    ul{
      height: 50px;
      display: flex;
      border:1px solid var(--c-lnk-light);
      border-radius : 40px;
      background: var(--c-lnk-base);
      overflow: hidden;
    }

    button{
      font-size:var(--f-theme-tiny);
      border-left: 1px solid var(--c-lnk-light);
      height:100%;
      color:var(--c-lnk-light);
      text-align: center;
      width:100%;
      height:100%;
    }

    li:first-child button{
      border-left: 0;
    }

    .on button{
      color:var(--c-lnk-black);
      background: var(--c-lnk-white);
      font-weight: 700;
    }

  }
</style>