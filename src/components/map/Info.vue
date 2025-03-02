<script lang="ts" setup>
const props = defineProps<{
  array: any[];
}>();
</script>

<template>
    <ul class="info">
        <li v-for="(info,id) in array" :key="id" :class="info.class?info.class:''">
            <i class="material-icons">{{info.icon}}</i>
            <span v-if="info.icon_txt" class="icon_txt">{{info.icon_txt}}</span>
            <span v-if="info.txt">{{info.txt}}</span>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
.info{
    padding-bottom:10px;

    li{
        color:var(--c-lnk-dark);
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        font-size:var(--c-theme-tiny);
        padding:5px 20px;
        .material-icons{
            margin-right:8px;
        }        

        i{
            font-size:20px
        }
    }

    .icon_txt{
        width:60px;
        border-right: 1px solid var(--c-lnk-light);
        margin-right:10px;
    }

    .top{
        font-size:var(--f-theme-small);
        color:var(--c-lnk-black);
        padding:15px 20px;
        border-bottom:1px solid var(--c-lnk-light)
    }

}  

</style>