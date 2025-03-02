<script setup lang="ts" >
    import Head from '@/components/community/Header.vue';
    import { useAuthStore } from "@/stores/auth";
    import { useChallengeStore } from '@/stores/challenge';
    import { onMounted,onBeforeUnmount } from 'vue';
    const stoAuth = useAuthStore();
    const stoChallenge = useChallengeStore();

    onMounted(async()=>{
        await stoChallenge.resetList();
        await stoChallenge.getList().then(()=>{
            window.addEventListener('scroll', handleScroll);
        });
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = () => {
        window.removeEventListener('scroll', handleScroll);
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadNextPage().then(() => {
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            window.addEventListener('scroll', handleScroll);
        }
    };

    const loadNextPage = async () => {
        await stoChallenge.getList();
    }

    const calculateDday = (targetDate:string)=>{
        // 현재 날짜와 시간
        const currentDate: Date = new Date();

        // 목표 날짜와 시간을 ISO 8601 형식의 문자열로부터 Date 객체로 파싱
        const targetDateObj: Date = new Date(targetDate);

        // 두 날짜의 차이 계산 (밀리초 단위)
        const timeDiff: number = targetDateObj.getTime() - currentDate.getTime();

        // 밀리초를 일로 변환하여 날짜 차이 계산
        const daysDiff: number = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // D-day 계산
        let dday: string = '';
        if (daysDiff > 0) {
            dday = 'D-' + daysDiff;
        } else if (daysDiff === 0) {
            dday = 'D-day';
        } else {
            dday = '마감';
            //dday = 'D+' + Math.abs(daysDiff);
        }

        return dday;
    }

</script>

<template>
    <main class="challenge">
        <Head></Head>
        <ul class="list">
            <li v-for="(item,id) in stoChallenge.list" :key="id">
                <router-link :to="`/community/challenge/${item.id}`" class="btn01">
                    <strong>{{item.title}}</strong>
                    <p>{{item.description}}</p>
                    <div class="cate" v-if="false">
                        <span class="tag frame_cate_btn02" v-if="false">크루</span>
                        <span class="tag frame_cate_btn02" v-if="false">개인</span>
                        <span class="tag frame_cate_btn02" v-if="false">샵</span>
                        <span class="txt">작성자</span>
                    </div>
                    <div class="date">
                        <span>~{{item.endDate}}(마감일)</span>
                        <span class="red">{{calculateDday(item.endDate)}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-link to="/community/challengewrite" class="btn_wrtie" v-if="stoAuth.info.role == 'ADMIN'">
            <font-awesome-icon :icon="['far', 'pen-to-square']" />
            챌린지 생성
        </router-link>
    </main>
</template>

<style lang="scss" scoped>  
    .challenge{
        padding-bottom:70px;
    } 
    
    .srot_cate{
        padding:40px 10px;
        display: flex;
        flex-direction: row-reverse;

        .sort{
            margin-left:10px;
        }
    }
    
    .challenge .list{
        padding:0 20px;
        li {
            font-size:var(--f-theme-regular);
            padding:20px 0 20px;
            border-bottom: 1px solid var(--c-lnk-light);
            strong{
                display: block;
                line-height: 1;
                padding-bottom: 10px;
            }

            p {
                font-size:var(--f-theme-small);
                line-height:1.6;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 표시할 줄 수 */
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-bottom: 10px;
            }
        }

        .cate{
            line-height: 26px;
            padding-bottom: 10px;
        }

        .tag{
            color:var(--c-lnk-basic);
            margin-right: 10px;
            min-width: 60px;
        }

        .txt{
            font-size:var(--f-theme-small);
        }

        .date{
            vertical-align: top;;
            color:var(--c-lnk-dark);
            font-size:var(--f-theme-tiny);
        }

        .red{
            margin-left: 10px;
            color:var(--c-theme-red)
        }
   }

   .btn_wrtie{
        position: fixed;
        bottom:70px;
        right:20px;
        background: rgba(0,0,0,0.7);
        color:var(--c-lnk-white);
        padding:15px 10px;
        display: flex;
        align-items: center;
        border-radius: 30px;

        svg{
            margin-right: 5px;
        }
        
   }
</style>