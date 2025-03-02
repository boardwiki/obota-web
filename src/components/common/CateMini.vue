<script lang="ts" setup>

const props = defineProps<{
  list:string[]|number[]|boolean[];
}>();

</script>

<template>
    <ul class="cate">
        <li v-for="(item,id) in list" :key="id">{{item}}</li>
    </ul>
</template>

<style lang="scss" scoped>
    .cate{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .cate li {
    background: var(--c-lnk-dark);
    margin-right:10px;
    padding:3px 10px;
    margin-top:5px;
    font-size:var(--f-theme-tiny);
    color:var(--c-lnk-white);
    border-radius: 20px;
    }

</style>