<script setup lang="ts">
import {ObjectBrand} from '@/types/brand';
const props = defineProps<{
  list : ObjectBrand[]
}>();
</script>

<template>
<div class="brand">
    <ul class="cate">
        <li><button type="button">전체</button></li>
        <li><button type="button">데크</button></li>
        <li><button type="button">트럭</button></li>
        <li><button type="button">휠</button></li>
        <li><button type="button">부싱</button></li>
    </ul>

    <ul class="list">
        <li v-for="(item,id) in list" :key="id">
            <router-link :to="`brand/${item.id}`">
                <span class="kr">{{item.name}}</span>
                <span class="en">{{item.name_en}}</span>
                <div class="icon"></div>
            </router-link>
        </li>
    </ul>
</div>
</template>

<style lang="scss" scoped>
.brand{
    display: flex;
}

.cate{
    max-width: 120px;
    padding:10px;
    width:37.5%;
    button {
        background: var(--c-lnk-base);
        color:var(--c-lnk-dark);
        width:100%;
        padding:15px 0;
    }

    li{
        margin-bottom:10px;
    }
}

.list{
    padding:10px;
    min-width: 72.5%;
    li{
        margin-bottom:10px;
    } 
    a{
        display: block;
        padding: 10px 20px;
        color:var(--c-lnk-dark);
        position: relative;
        width: 100%;
        text-align: left;
    }

    span{
        display: block;
    }

    .kr{
        margin-bottom:8px;
        color:var(--c-lnk-dark);
        font-size:var(--f-thme-small);
    }

}


.icon {
  position: absolute;
  right:10px;
  top:0;
  bottom:0;
  margin: auto;
  width: 10px; /* 아이콘의 너비 설정 */
  height: 10px; /* 아이콘의 높이 설정 */
}

.icon::before,
.icon::after {
  content: '';
  position: absolute;
  width: 100%; /* 선의 너비를 100%로 설정하여 아이콘 전체에 표시 */
  height: 2px; /* 선의 높이 설정 */
  background-color: #333; /* 선의 색상 설정 */
  transform: translateY(-50%);
}

.icon::before {
  transform: translateY(-50%) rotate(45deg); /* 첫 번째 선에 45도 회전을 적용하여 화살표 효과 생성 */
    top:10%;
}

.icon::after {
  transform: translateY(-50%) rotate(-45deg); /* 두 번째 선에 -45도 회전을 적용하여 화살표 효과 생성 */
  bottom:10%;
}
</style>