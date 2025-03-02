<script setup lang="ts">
const props = defineProps<{
    iconName?:string,
    closeUse?:boolean,
    txt:string,
    cnt?:number
}>()
</script>
<template>
    <button
        class="btn" 
        type="button"
    >
        <i class="material-icons icon1" v-if="iconName">{{iconName}}</i>

        <span>{{txt}}</span>

        <span v-if="cnt" class="num">{{cnt > 999 ? `${cnt}+`: cnt}}</span>

        <i class="material-icons icon2" v-if="closeUse">close</i>
    </button>
</template>

<style lang="scss" scoped>
    .btn{
        font-size:var(--f-theme-tiny);
        height:36px;
        padding:0 15px;
        border-radius: 36px;
        *{
            display         : inline-block;
            vertical-align  : middle;
        }
    }

    .icon1{
        margin-right:5px;
    }

    .icon2{
        margin-left:5px;
    }

    .num{

    }

</style>