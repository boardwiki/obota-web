<script setup lang="ts">
import { defineEmits } from 'vue';

const props = defineProps<{
  labels      : Array<string|number|boolean>,
  values      : Array<string|number|boolean>,
  modelValue  : string|number|boolean,
  height     ?: string,
  radio      ?: boolean
}>()

const emits = defineEmits();
const handleChange = (value:string|number|boolean) => {
  let data = null;
  if(props.radio)
    data = value;
  else
    data = props.modelValue == value ? null : value;
  emits('update:modelValue',data);
};


</script>

<template>
    <div class="radio">
      <ul :style="{height: height ? height : ''}">
        <li
          :style="{width:`calc(100% / ${labels.length})`}"
          v-for="(value,id) in values" 
          :class="modelValue==value?'on':''"
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
      overflow: hidden;
    }

    button{
      font-size:var(--f-theme-tiny);
      color:var(--c-lnk-basic);
      background: var(--c-lnk-base);
      border-left: 1px solid var(--c-lnk-light);
      height:100%;
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
      font-weight: 700;;
    }

  }
</style>