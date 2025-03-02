<script setup lang="ts">
    import Title from '@/components/common/Title.vue';

    /*

    
            <li>
                <Profile :content_user_id="1"/>
            </li>

            <li>
                <div>
                    <BoardUtility/>
                </div>

                <ul>
                    <li> <Comment/></li>
                </ul>
            </li>
    */

</script>


<template>
    <main class="notice_detail">

        <div class="top">
            <Title title="obota" :useCancel="true" :align="'center'" ></Title>
        </div>

        <ul class="con">
            <li>
                <div class="tit">
                    <strong >제목</strong>
                </div>
                <DayInfo/>
            </li>

            <li>
                <p>본문내용 <br/> 롱앱이 2월 출시가 된다고? 개발자 나는 보드타고 클밍하고 <br> 코딩공부하고 이 앱만들고 회사업무하고 <br/> 팀관리하고 보더들이랑 토크토크하고 <br> 현생일도 몇개해야하고 너무 바쁘다</p>
            </li>


        </ul>

    </main>
</template>


<style lang="scss" scoped>
.con{
    .tit{
        display: flex;
        font-size:var(--f-theme-title2);
        padding:20px 0 30px;
        align-items: center;
        justify-content: space-between;
    }

    > li{
        padding: 10px 20px;
        border-top: 1px solid var(--c-lnk-light);
    }
}
</style> 