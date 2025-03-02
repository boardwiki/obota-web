
<script setup lang="ts">
import Header     from '@/components/mypage/Header.vue';
import { ObjectNav } from '@/types/nav';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
const stoAuth = useAuthStore();

onMounted(()=>{
    stoAuth.authExtend();
})

const list:ObjectNav[] = [
     new ObjectNav('샵관리자신청', '', '/mypage/setting/shopjoin'),
     new ObjectNav('내 크루 보기', '', '/mypage/crew'),
]

const versionReset = () => {
    localStorage.setItem('foot_version', '');
    localStorage.setItem('basic_version', '');
    localStorage.setItem('dancing_version', '');
    localStorage.setItem('skill_cnt_version', '');
    localStorage.setItem('foot_category', '');
    localStorage.setItem('foot_skill', '');
    localStorage.setItem('dancing_skill', '');
    localStorage.setItem('dancing_category', '');
    localStorage.setItem('basic_category', '');
    localStorage.setItem('hand_category_keyword', '');
    localStorage.setItem('foot_category_keyword', '');
    localStorage.setItem('dancing_category_keyword', '');


    alert('버전초기화 완료')
}

</script>


<template>
    <main>
        <Header :info="stoAuth.info"></Header>

        <div class="list">
            <ul>
                <li>
                    <span>설정</span>
                    <ul>
                        <li><button @click="versionReset">
                            버전 초기화
                        </button></li>
                    </ul>
                </li>
                
                <li v-if="stoAuth.info?.role == 'ADMIN'">
                    <span>관리자</span>
                    <ul>
                        <li>
                            <router-link :to="'/frame'">테스트 프레임</router-link>
                            <router-link :to="'/admin/skill'">스킬인증 관리</router-link>
                            <router-link :to="'/admin/skill'">챌린지 관리</router-link>
                        </li>
                    </ul>
                </li>

            </ul>
            <ul v-if="false">
                <li>
                    <span>내 정보</span>
                    <ul>
                        <li><router-link  to="/mypage/setting">스킬 생성</router-link></li>
                        <li><router-link  to="/mypage/setting">샵/크루/회원 관리</router-link></li>
                    </ul>
                </li>

                <li>
                    <span>내 정보</span>
                    <ul>
                        <li><router-link  to="/mypage/setting">알림</router-link></li>
                        <li><router-link  to="/mypage/setting">계정 관리</router-link></li>
                    </ul> 
                </li>

                <li>
                    <span>고객센터</span>
                    <ul>
                        <li><router-link  to="/mypage/setting">약관 및 정책</router-link></li>
                        <li><router-link  to="/mypage/setting">문의하기</router-link></li>
                    </ul>
                </li>

            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .list{
        padding: 10px 20px;

        > ul > li > span{
            display: block;
            height:40px;
            line-height: 40px;
            font-size:var(--f-theme-tiny);
            color:var(--c-lnk-dark);
        }

        > ul > li{
            margin-bottom: 20px;;
        }

        ul ul {
            a,button{
                display: block;
                height:40px;
                line-height: 40px;
                font-size:var(--f-theme-small);
                font-weight:700;
            }
        }

    }
</style>