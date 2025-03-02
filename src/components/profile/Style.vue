<script setup lang="ts">
import Star from '@/components/icons/Star.vue'
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
    <div class="style">
        <Star></Star>
        <span v-if="title">{{title}}</span>
    </div>
</template>

<style lang="scss" scoped>
.style{
    background: var(--c-theme-blue-lighter);
    padding:10px;
    border-radius: 30px;
    text-align: center;
    span{ 
        display: block;
        padding-top:20px;
        color:var(--c-lnk-black);
        font-size:var(--f-theme)
    }
}
</style>