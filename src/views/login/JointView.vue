<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {useShowsStore} from '@/stores/show';
import CheckBoxOne from '@/components/frame/CheckBoxOne.vue';
import Input from '@/components/frame/Input.vue';
import Star from '@/components/icons/Star2.vue'
import router from '@/router';
import BasicNote from '@/components/basic/Basic.vue'
const ImgLogin = new URL('@/assets/login.png', import.meta.url).href
const ImgGoofy = new URL('@/assets/Goofy.png', import.meta.url).href
const ImgRegular = new URL('@/assets/Regular.png', import.meta.url).href
const page = ref<number>(0);
const stoAuth = useAuthStore();
const stoShow = useShowsStore();

const nick      = ref<string>('');
const local     = ref<string>('');
const old       = ref<boolean>(false);
const stance    = ref<string>('');
const err_msg   = ref<string>('');
const showBasic = ref<boolean>(false);

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

const joinPass = ref<boolean>(false);

const next = async ()=>{

    let pass:boolean = false;
    switch(page.value){
        case 1:
            if(local.value == '')
                alert('활동지역을 선택해주세요')
            else
                pass = true;
        break;

        case 2:
            if(!old.value){
                showBasic.value = true
            }
            pass = true;
        break;

        case 3:
            if(stance.value == '')
                alert('스탠스를 선택해주세요')
            else
                pass = true; 
        
        case 4:
            const regex = /^[a-zA-Z0-9가-힣]*$/;
            if (nick.value.length < 2) {
                err_msg.value = '글자는 2글자이상 입력해주세요!';
            }else if (!regex.test(nick.value)) {
                err_msg.value = '특수문자는 입력할 수 없습니다.';
            }else{
                err_msg.value = '';
                pass = true; 
            }
        break;

    }

    if(pass && page.value !== 4){
        page.value ++;
    }else if(page.value == 4 && pass){

        const data = {
            nickName        : nick.value,
            location        : local.value,
            stance          : stance.value,
            isExperienced   : old.value
        }
        await stoAuth.join(data).then((pass:boolean)=>{
            if(pass){
                page.value++;
                joinPass.value = true;
            }
        });
    }
}

const back = () =>{

    if(page.value == 4 && old.value == false){
        page.value -= 2;
    }else{
        page.value --;
    }
}

onMounted(()=>{
    stoShow.on();
    setTimeout(() => {
        if(stoAuth.joined){
            stoShow.off();
            router.push('/');
        }else{
            page.value ++;
            stoShow.off();
        }
    }, 500);
})

</script>

<template>
    <main class="join">
        <header>
            <button type="button"  @click="back" v-if="page > 1 && page < 5"> 
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>
            <strong>
                회원가입
            </strong>
            <div class="bar">
                <span :style="{'width':`${Math.floor(100 / 4 * (page))}%`}"></span>
                <span class="txt">
                    {{Math.floor(100 / 4 * (page)) > 100 ? 100 : Math.floor(100 / 4 * (page))}}%
                </span>
            </div>
        </header>

        <div class="randing" v-if="page ==0">
            <img :src="ImgLogin" alt="" class="img_login">
        </div>

        <BasicNote v-if="showBasic" @endBasic="(res)=>{showBasic=false}"/>
        <ul>
            <li class="info1" :class="page == 1 ? 'active' : '' ">
                <strong class="label">활동지역</strong>
                <CheckBoxOne 
                    v-model="local"
                    title=""
                    :labels="['서울','경기','인천','세종','강원','경남','경북','부산','대구','전남','전북','제주','충북','충남']"
                    :values="['서울','경기','인천','세종','강원','경남','경북','부산','대구','전남','전북','제주','충북','충남']"
                    :col="2"
                />
            </li>
            
            <li class="info2" :class="page > 1 ? 'active' : '' ">
                <strong class="label">롱보드를 타본 적이 있나요?</strong>
                <CheckBoxOne 
                    v-model="old"
                    title=""
                    :labels="['네','아니오']"
                    :values="[true,false]"
                    :col="2"
                    width="100%"
                />
            </li>


            <li class="info3" :class="page > 2 ? 'active' : '' ">
                <strong class="label">스탠스</strong>
                <CheckBoxOne 
                    v-model="stance"
                    title=""
                    :labels="['구피','레귤러']"
                    :values="['Goofy','Regular']"
                    :col="2"
                    width="100%"
                />
                <img :src="ImgRegular" alt="" v-if="stance == 'Regular'">
                <img :src="ImgGoofy" alt="" v-if="stance =='Goofy'">
                <p v-if="stance == ''">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    한 발씩 들고 중심을 잡아보세요.<br>어떤 발로 버티는 것이 편한지 선택해 주세요.  
                </p>

                <p v-if="stance == 'Regular'">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    왼발로 버티는 것이 쉬우면 왼발을 앞에 놓고 주행하는 레귤러 스탠스입니다.  
                </p>

                <p v-if="stance == 'Goofy'">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
                    오른발로 버티는 것이 쉬우면 오른발을 앞에 놓고 주행하는 구피 스탠스입니다.  
                </p>
                
            </li>

            
            <li class="info4" :class="page > 3 ? 'active' : '' ">
                <strong class="label">롱켓 앱에 사용할 닉네임을 입력해주세요.</strong>
                <Input
                    label="롱켓 앱에서 사용할 닉네임을 입력해주세요."
                    :label_hide="true"
                    placeholder="닉네임은 중복이 불가능해요"
                    guideMessage="최소 2글자 이상 입력해주세요"
                    v-model="nick"
                    type="text"
                    :err_msg="err_msg"
                ></Input>
            </li>

            <li class="info5" :class="page > 4 ? 'active' : '' ">
                <router-link to="/">
                    <Star></Star>
                    <span class="txt1">{{formattedDate}}</span>
                    <strong>가입 완료</strong>
                    <p class="txt2">롱켓 가입이 완료되었습니다.</p>
                </router-link>
            </li>
        </ul>
        
        <button type="button" v-if="page < 5" @click="next()" class="next_btn frame_btn01" :class="{
            on: page == 1 && local ||
                page == 2  ||
                page == 3  && stance ||
                page == 4  && nick
        }">{{
            page == 4 ? '가입하기' : '다음'
        }}</button>

        <router-link to="/" v-if="joinPass" class="next_btn frame_btn01">
            롱켓 이용하기
        </router-link>


    </main>
</template>

<style lang="scss" scoped>
    .join{
        position: absolute;
        height:100%;
        width:100%;
        overflow: hidden;

        .randing{
            display: flex;
            position: absolute;
            width:100%;
            height:100%;
            left:0;
            top:0;
            width:100%;
            z-index:999;
            align-items: center;
            background: var(--c-lnk-white);
            justify-content: center;
            img{
                max-width: 220px;
                height:auto;
                display: block;
                margin:0 auto;
                width:100%;
            }
        }

        header{
            height:78px;
            position: absolute;
            top:0;
            left:0;
            z-index:60;
            width:100%;

            
            strong{
                display: block;
                height:60px;
                line-height:60px;
                font-size:var(--f-theme-large);
                color:var(--c-lnk-black);
                text-align: center;
                width:100%;
                padding:0 20px;
            }

            button{
                position: absolute;
                left:20px;
                height:60px;
            }
            
        }

        .bar {
            width:calc(100% - 70px);             
            background: var(--c-lnk-light);
            margin-left:20px;
            position: relative;
            height:10px;
            border-radius: 20px;
        }

        .bar span:first-child{
            background: var(--c-theme-blue);
            display: block;
            height: 100%;
            border-radius: 20px;
            max-width:100%;
            transition: 0.5s all;
        }
        
        .bar .txt{
            position: absolute;
            right:-35px;
            top:0;
            line-height: 10px;
        }
        
        .label{
            font-size:var(--f-theme-large);
            color: var(--c-lnk-black);
            text-align: left;
            width:100%;
            display: block;
            padding-bottom:20px;
        }
        
        .date{
            display: flex;
            width:100%;
            justify-content: space-between
        }

        .next_btn{
            position: absolute;
            bottom:10px;
            right:20px;
            z-index:60;
            width:100%;
            width:calc(100% - 40px);
            background: var(--c-lnk-light);
        }

        .next_btn.on,
        .next_btn:hover,
        .next_btn:focus{
            color:var(--c-lnk-light);
            background: var(--c-lnk-black);
        }

        li{
            padding:78px 20px 20px 20px;
            position: absolute;
            top:0;
            left:100%;
            width:100%;
            height:100%;
            transition: 0.5s all;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #fff;
        }

        .info5{

            *{
                display: block;
                text-align: center;
            }

            svg{
                margin-bottom: 30px;
            }

            .txt1,.txt2{
                color:var(--c-lnk-basic);
                font-size: var(--f-theme-regular);
            }

            strong{
                padding: 10px 0 5px;
                font-size: var(--f-theme-large);
            }
        }

        li.active{
            left:0;
        }

        
        .info0{
            z-index: 50;
        }

        .info1{
            z-index: 51;
        }

        
        .info2{
            z-index: 52;
        }
        
        .info3{
            z-index: 53;
            img{
                max-width: 100%;
                width:100%;
            }

            p{
                margin-top: 20px;
                line-height: 1.4;
                width:100%;
                color:var(--c-theme-blue)
            }
        }
        
        .info4{
            z-index: 54;
        }

        .info5{
            z-index: 55;
        }

        .info6{
            z-index: 56;
        }

        .info7{
            z-index: 57;
        }

        
    }

    
</style>