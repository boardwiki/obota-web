<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar';
import Title      from '@/components/common/Title.vue';
import router from '@/router';

const stoCalendar = useCalendarStore();

function back(){
        router.go(-1)
}

</script>

<template>
    <main>

        <header class="header">
            <h2 class="sound_only">아이템정보</h2>
            <Title  title="Logo" :align="'center'" ></Title>
            <button @click="back()" type="button" class="back_icon"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
        </header>

        <div class="content">
            <div>
                <div class="input_wrap">
                    <label for="">Cate</label>
                    <select name="" id=""></select>
                </div>

                <div class="input_wrap">
                    <label for="">Date</label>
                    <input type="date"> 
                </div>
                <div class="input_wrap">
                    <label for="">Time</label>
                    <input type="time">
                </div>
                <div class="input_wrap">
                    <label for="">Memo</label>
                     <textarea></textarea>
                </div>
            </div>

            <div class="btn_wrap">
                <router-link to="/calendar/write" class="btn02">일정 등록하기</router-link>
            </div>
        </div>
    </main>
</template>

  
<style lang="scss" scoped>
.content {
    padding: 20px;
}

.back_icon{
    position: absolute;
    top:0;
    bottom:0;
    margin: auto 0 ;
    left:20px;
}

.content {
    padding: 20px;
    padding-bottom:5000px;
}

.btn_wrap{
    position: fixed;
    max-width: var(--device-max-width);
    width: 100%;
    bottom:70px;
    left:0;
    right:0;
    margin: 0 auto;
    padding:0 20px;
}



</style>