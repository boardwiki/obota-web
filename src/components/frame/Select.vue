<script setup lang="ts">
import { defineEmits, ref } from 'vue';
const props = defineProps<{
  labels      : Array<string|number|boolean>,
  values      : Array<string|number|boolean>,
  modelValue  : string|number|boolean, 
  width       ?: string,
  placeholder ?: string,
  height      ?: string,
  line        ?: boolean
}>()

const emits = defineEmits();
const handleChange = (value:string|number|boolean) => {
  emits('update:modelValue', value);
};

const value = ref<string|number|boolean>(props.modelValue);
</script>

<template>
    <div class="select" :style="{'width' : width? width: '', 'height': height? height : ''}" :class="line? 'line':'' ">
        <select v-model="value" @change="handleChange(value)" :placeholder="'test'">
          <option value="" disabled selected>{{placeholder}}</option>
          <option  v-for="(value,id) in values" :key="id" :value="value">{{labels[id]}}</option>
        </select>
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="awesome-icons" />        
        </span>
    </div>
</template>

<style scoped lang="scss">
  .select{
  &.line{
    border:1px solid var(--c-lnk-light);
    border-radius: 10px;
  }
    height:50px;
    vertical-align: top;
    position: relative;

    overflow: hidden;

     > *{
      vertical-align: middle;
    }

    select{
        width:100%;
        border:0;
        height:100%;
        border-radius :  var(--s-theme-radius);
    }

    .awesome-icons{
        position: absolute;
        top:0;
        bottom:0;
        right:5px;
        margin: auto 0;
        transition: 0.3s all;
        transform: rotate(0deg);
    }
    select:focus + .awesome-icons{
        transform: rotate(180deg);
    }

    select:hover,
    select:focus{
        border:1px solid var(--c-h-border);
    }

  }
</style>