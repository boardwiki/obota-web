<script lang="ts" setup>
import FilterHeader from '@/components/item/FilterHeader.vue';
import BrandFilter from '@/components/item/BrandFilter.vue';
import listData from '@/test/brand.json';

</script>

<template>
    <FilterHeader>
        <BrandFilter :list="listData.list"></BrandFilter>
    </FilterHeader>
</template>

<style lang="scss" scoped>
</style> 