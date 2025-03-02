<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
const ImgLogin = new URL('@/assets/login.png', import.meta.url).href
const authStore = useAuthStore();



const login=async()=>{
    
    if(import.meta.env.MODE === 'development'){
        await authStore.login().then(()=>{
            setTimeout(() => {
                router.push('/');
            }, 10);
        });
    }else{
        location.href =  "https://accounts.google.com/o/oauth2/auth?client_id=489175987465-akp72dg5isebuf2en9coubotife7p2ic.apps.googleusercontent.com&redirect_uri=https://longboard.monster/&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar";
    }
}

</script>


<template>
    <main class="login">
        <img :src="ImgLogin" alt="" class="img_login">
        <div class="btn_wrap">   
            <button type="button" @click="login" class="frame_btn01 btn_login">
                로그인
            </button>
        </div>
    </main>
</template>


<style lang="scss" scoped>
.img_login{
    max-width: 220px;
    display: block;
    width:100%;
    height:auto;
    margin:0 auto;
}

.login{
    position: absolute;
    display: flex;
    align-content: center;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    padding:100px 30px;

    .btn_login{
        border:1px solid var(--c-lnk-dark);
    }
}

.btn_wrap{
    a,button{
        display: block;
        width:100%;
        text-align: center;
        margin-top:10px;
    }
}
</style>