
<script setup lang="ts">
import Header     from '@/components/mypage/Header.vue';

</script>


<template>
    <main>
        <Header></Header>

        <div class="content">
            <ul>
                <li>
                    <strong>Crew Name</strong>
                    <span>크루원</span>
                    <p>
                        <span>크루의 제목</span>
                        크루 간판 소개글입니다.
                    </p>
                    <router-link  to="/mypage/crew">
                        Home
                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="awesome-icons" />
                    </router-link>

                </li>
            </ul>
        </div>

    </main>
</template>

<style lang="scss" scoped>
.content{
    background: var(--c-lnk-base);
    padding:30px 20px;
    
    li {
        position: relative;

        strong,span{
            display: block;
        }

        > strong{
            font-size:var(--f-theme-title2);
            color:var(--c-lnk-dark);
        }

        > span{
            margin: 10px 0;
            color:var(--c-lnk-dark);
        }

        > p {
            background: var(--c-lnk-light);
            padding:15px;
            border-radius: 10px;
            line-height: 1.4;
            color:var(--c-lnk-dark)
        }

        > p span{
            line-height: 1;
            margin-bottom: 10px;;
            font-size:var(--f-theme-small);
            color:var(--c-lnk-dark)
        }

        > a{
            position: absolute;
            right:0;
            top:10px;
            color:var(--c-lnk-dark);
            display: flex;
            align-items: center;
        }
    }
}
</style>