<script lang="ts" setup>
const props = defineProps<{
  array: any[];
}>();
</script>

<template>
    <ul class="schedule">
        <li v-for="(info,id) in array" :key="id">
            <router-link to="/myapge/spot/1">
                <div class="txt_left">
                    <span>Aug 18</span>
                    <span class="weight_md">10:00</span>
                </div>
                <div class="txt_right">
                    <span class="weight_md">롱보드 페스티벌</span>
                    <span class="skip">헬맷 미착용 시 대회 참여가 불가능합니다헬맷 미착용 시 대회 참여가 불가능합니다.</span>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
            </router-link>
        </li>
    </ul>
</template>


<style lang="scss" scoped>
.schedule{
    color:var(--c-lnk-dark);

    a{
        display: block;
        padding:20px;
        margin-top:10px;
        border-radius: 10px;
        border:1px solid var(--c-lnk-light);
        display: flex;
        position: relative;
        span{
            display: block;
            width:100%;
        }

        div span:first-child{
            margin-bottom:20px;
        }

        .txt_left{
            width:60px;
        }

        .txt_right{
            width:calc(100% - 60px);
            padding-right:30px;
        }

        .txt_left span:first-child{
            color:var(--c-lnk-dark);
        }

        .skip{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        .material-icons{
            position: absolute;
            right:10px;
            top:50%;
            margin-top:-12px;

        }
    }
}
</style>