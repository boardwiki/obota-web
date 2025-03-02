<script setup lang="ts">

const props = defineProps<{
  label         ?: string;
  type          ?: string;
  guideMessage  ?: string;
  modelValue    ?: string;
  label_hide    ?: boolean;
  err_msg       ?: string;
  placeholder   ?: string;
}>();

const emits = defineEmits();

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emits('update:modelValue', value);
};

</script>

<template>
  <div class="input">
    <label :for="props.label" :class="label_hide ? 'sound_only' : ''">{{ props.label }}</label>
    <input :type="props.type" :value="props.modelValue" :placeholder="placeholder" @change="handleChange"/>
    <p class="info_message" v-if="!err_msg">{{ props.guideMessage }}</p>
    <p class="error_message" v-if="err_msg">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>
          {{props.err_msg}}
        </span>
    </p>
  </div>
</template>

<style lang="scss">
.input {
    width:100%;

    input{
        width         : 100%;
        height        : 50px;
        padding-left  : 10px;
        border-radius :  var(--s-theme-radius);
        font-size     : var(--f-theme-small);
        color         : var(--c-font);
        border        : 1px solid var(--c-lnk-light);
    }
    
    input:hover,
    input:focus{
        border        : 1px solid var(--c-h-border);
        color         : var(--c-h-font);
    }

    .info_message,
    .error_message{
      display: flex;
      align-items: center;
      padding: 3px;
    }

    .info_message{
        color         : var(--c-theme-blue);
    }

    .error_message{
        color         : var(--c-theme-red);
        line-height   : 24px;
        *{
            display: inline-block;
            vertical-align: top;
            line-height   : 24px;
        }

        span{
          margin-left: 5px;;
        }
    }
}
</style>