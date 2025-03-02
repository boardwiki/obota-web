<script setup lang="ts">
import Select from '@/components/frame/Select.vue';
import Input from '@/components/frame/Input.vue';
import { ref } from 'vue';

const local = ref<number>(0);
</script>

<template>
    <main>
        <div class="content">
            <div class="top">

                <div class="input">
                    <Select :labels="['전체','서울']" :values="[0,1]" v-model="local" width="90"></Select>
                    <input type="date">
                </div>
                

                <router-link :to="'/mypage/lesson/lessonmake'">
                    강사 신청하기
                </router-link>
            </div>
            <ul class="list">
                <li v-for="id in 10" :key="id">
                    <router-link :to="'/mypage/lesson/1'">
                        <img src="" alt=""  width="139" height="98">
                        <div class="txt">
                            <strong class="title">장석환의 살곶이 수련</strong>
                            <span class="start"><i class="material-icons">star</i>
                                4.6 (11)</span>
                            <span class="info">살곶이, 반포 스팟에서 진행</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.content{
    padding:20px;
}

.top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    a{
        color:var(--c-theme-blue);
        font-size:var(--f-theme-small);
    }
        
    .input{
        display: flex;

        > *{
            border:1px solid var(--c-lnk-dark);
            border-radius: 10px;
            margin-right: 10px;
        }

        input[type=date]{
            padding: 0 10px;
        }

    }
}

.list{
    li a{
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    img{
        width:38%;
        height:auto;
        background: var(--c-lnk-light);
        border-radius: 10px;
    }

    .txt{
        padding: 10px;
        strong{
            display: block;
            margin-bottom:10px;
            font-size:var(--f-theme-small);
        }

        .start{
            display: flex;
            align-items: center;
            font-size:var(--f-theme-nano);
            margin-bottom: 15px;
        }

        .start i {
            font-size:20px;
        }

        .info{
            font-size:var(--f-theme-tiny);
            color:var(--c-lnk-dark);
        }
    }
}

</style>