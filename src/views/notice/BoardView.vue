<script setup lang="ts">
    import Title from '@/components/common/Title.vue';

</script>


<template>
    <main class="notice">

        <div class="top">
            <Title title="obota" :align="'center'"></Title>
        </div>

        <ul class="list">
            <li v-for="id in 5" :key="id">
                <router-link to="/notice/detail/1">
                    <strong class="tit">
                        <span>
                            <font-awesome-icon :icon="['far', 'bell']" />
                            Title
                        </span>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="left_icon"/>
                    </strong>

                    <p>
                        본문내용입니다.
                    </p>

                    <div class ="info">
                        <span class="level">회원등급</span>
                        <span class="name">Title</span>
                    </div>

                    <div class="limit">
                        ~01.16(화) <span>마감</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </main>
</template>


<style lang="scss" scoped>
.notice{
    .list{
        padding: 20px;
        font-size:var(--f-theme-small);
        li{
            border-bottom: 1px solid var(--c-lnk-light);
            padding-bottom: 10px;
        }

        p{
            padding-bottom: 10px;
            width:100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2; 
        }


        .info{
            display: flex;
            align-items: center;
        }        

        .limit{
            padding-top:10px;

        }

        .limit span{
            color:var(--c-theme-red)
        }
        .level {
            color:var(--c-lnk-basic);
            border:1px solid var(--c-lnk-light);
            padding:5px 10px;
            border-radius: 20px;
            margin-right:5px; 
        }
    }
    .top{
        position: relative;
    }

    .left_icon{
        color:var(--c-lnk-basic)
    }
    .tit{
        padding:15px 0;
        display: block;
        font-size:var(--f-theme-regular);
        display: flex;
        justify-content: space-between;
    }
}
</style>