<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  labels: Array<string | number | boolean>,
  values: Array<string | number | boolean>,
  modelValue: Array<string | number | boolean>;
  col?: number;
  type?: string;
  title ?:string;
  width ?:string
}>();

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
  <div class="checkbox_wrap" :style="{width:width?width:''}">
    <span>{{title}}</span>
    <div class="checkboxs">
        <button
        :style="{
          'width': col ? `calc(100% / ${col} - 5px)` : '100%',
          'margin-top' : col !== undefined && id < col ? 0 : ''
        }"
        type="button"
        v-for="(value, id) in values"
        :class="{ 'on': modelValue.includes(value), [String(value)]: type === 'color', 'color': type === 'color' }"
        :key="id"
        @click="handleChange(value)"
        >
        {{ labels[id] }}
        </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

.checkbox_wrap > span{
    display: block;
    color:var(--c-lnk-dark);
    margin-bottom:10px;
}
.checkboxs {
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
    color:var(--c-lnk-dark);
  }

  button.on {
    border-color: var(--c-lnk-black);
    color: var(--c-lnk-black);
  }

  .color:before{
    content:"";
    width:18px;
    height:18px;
    border: 1px solid var(--c-lnk-black);
    border-radius: 50%;
    float: left;
    background: var(--c-lnk-light);
  }
  
  .color:after{
    content:"";
    clear: both;
    display: block;
  }


  .white:before{}
  .black:before{}
  .blue:before{}
  .pink:before{}
  .red:before{}
  .yellow:before{}
  .purple:before{}
  .green:before{}
  
}
</style>