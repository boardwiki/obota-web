<script setup lang="ts">
</script>

<template>
    <main>
        <div class="content">
            
            <div class="btn_wrap">
                <router-link to="/mypage/lessonmake" class="btn02">강습 신청하기</router-link>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.content{
    padding:20px;
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