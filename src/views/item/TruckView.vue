<script setup lang="ts">
import ItemHeader from '@/components/item/Header.vue';
import List from '@/components/item/List.vue';
import listData from '@/test/list.json';

</script>

<template>
    <ItemHeader>
        <List :list="listData.list" />
    </ItemHeader>
</template>

<style lang="scss" scoped>
</style>