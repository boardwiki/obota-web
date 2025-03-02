<script lang="ts" setup>
const props = defineProps<{
  array: any[];
}>();
</script>

<template>
    <div class="rider">
        <span class="cnt">총 11명</span>
        <ul>
            <li v-for="id in 10" :key="id">
                <router-link to="/map/spot/1">
                    <img src="#" alt="">
                    <div>
                        <span class="tit">이름</span>
                        <span class="insta">@instagram</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
    
</template>


<style lang="scss" scoped>
.rider{
    .cnt{
        display: block;
        color:var(--c-lnk-dark);
        font-size:var(--f-theme-tiny);
        padding:20px 0 10px;
    }

    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }

    li{
        width:50%;
        margin-top:30px;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;

        img{
            width:40px;
            height:40px;
            border-radius: 50%;
            margin-right:10px;
        }

        span{
            display: block;
        }

        .tit{
            color:var(--c-lnk-dark);
            font-size:var(--f-theme-small);
            margin-bottom:10px;
        }
        
        .insta{
            color:var(--c-lnk-dark);
            font-size:var(--f-theme-tiny);
        }

    }

}  

</style>