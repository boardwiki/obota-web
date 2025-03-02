<script setup lang="ts">
import CheckBox from '@/components/frame/CheckBox.vue';
import Range from '@/components/frame/Range.vue';
import { ref } from 'vue';


const colorLabel: string[] = [
  '화이트',
  '블랙',
  '블루',
  '핑크',
  '레드',
  '엘로우',
  '퍼플',
  '그린'
];

const colorValue: string[] = [
  'white',
  'black',
  'blue',
  'pink',
  'red',
  'yellow',
  'purple',
  'green'
];

const priceValue: number[]=[];


for (let i = 0; i <= 500000; i += 10000) {
    priceValue.push(i);
}

const show = ref<string>('all');
const sale  = ref<boolean[]>([]);
const inch  = ref<number[]>([36,50]);
const flex  = ref<string[]>(['hard','soft']);
const price = ref<number[]>([0,5000000]);
const concave = ref<string[]>([]);
const material = ref<string[]>([]);
</script>

<template>
<div class="brand">
    <ul class="cate">
        <li><button type="button" :class="{on:show=='all'}" @click="show='all'">공통</button></li>
        <li><button type="button" :class="{on:show=='deck'}" @click="show='deck'">데크</button></li>
        <li><button type="button" :class="{on:show=='truck'}" @click="show='truck'">트럭</button></li>
        <li><button type="button" :class="{on:show=='wheel'}" @click="show='wheel'">휠</button></li>
        <li><button type="button" :class="{on:show=='bushing'}" @click="show='bushing'">부싱</button></li>
    </ul>

    <ul class="list">
        <li v-if="show=='all'">
            <strong>상세옵션</strong>
            <CheckBox 
                v-model="sale"
                title="판매여부"
                :labels="['판매중','미판매']"
                :values="[true,false]"
                :col="2"
            />
            <Range
                :array="priceValue"
                v-model="price"
                type="hide"
                title="가격"
            />
            <CheckBox 
                v-model="sale"
                title="색상"
                :labels="colorLabel"
                :values="colorValue"
                :col="2"
                type="color"
            />
         </li>
        <li v-if="show=='deck'">
            <strong>상세옵션</strong>
            <Range
                :array="[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]"
                v-model="inch"
                type="hide"
                title="인치(데크길이)"
            />
            <Range
                :array="['hard','middle','soft']"
                v-model="flex"
                title="플렉스"
            />
            
            <CheckBox 
                v-model="concave"
                title="컨케이브"
                :labels="['flatcave', 'u', 'w']"
                :values="['flatcave', 'u', 'w']"
                :col="3"
            />

            <CheckBox 
                v-model="material"
                title="소재(혼합)"
                :labels="['글라스','카본','우레탄']"
                :values="['glass','carbon','polyurethane']"
                :col="3"
            />

        </li>
        <li v-if="show=='truck'">
            <strong>상세옵션</strong>
        </li>
        <li v-if="show=='wheel'">
            <strong>상세옵션</strong>
        </li>
        <li v-if="show=='bushing'">
            <strong>상세옵션</strong>
        </li>
    </ul>
</div>
</template>

<style lang="scss" scoped>
.brand{
    display: flex;
}

.cate{
    padding:10px;
    padding-left:0;
    button {
        background: var(--c-lnk-base);
        color:var(--c-lnk-dark);
        padding:15px 0;
        width:75px;
    }

    button.on{
        background: var(--c-theme-green);
        color:var(--c-lnk-black);
    }

    li{
        margin-bottom:10px;
    }
}

.list{
    padding:10px;
    min-width: calc(100% - 75px);

    li{
        padding-top:20px;
    }

    > li > strong{
        font-size:var(--f-theme-small);
        color:var(--c-lnk-black);
        display: block;
    }

    > li > div{
        padding:20px;
    }
}
</style>