<script lang="ts" setup>
//import Title    from '@/components/common/Title.vue';
import router   from '@/router';
//import Search   from '@/components/Search.vue';

</script>

<template>
    <main>
        <header class="header">
            <h2 class="sound_only">아이템정보</h2>
            <button @click="router.go(-1)" type="button" class="icon1"><font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" /></button>
            <div class="search">
                <Search/>
            </div>
        </header>

        <div class="content">
            <div class="brand list
            "> 
                <strong>Brand</strong>
                <span>검색결과 총 x개</span>
                <div>
                    <ul>
                        <li v-for="item in 10" :key="item">
                            <router-link :to="''">{{item}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="item list">
                <strong>Item</strong>
                <span>검색결과 총 x개</span>
                <div>
                    <ul>
                        <li v-for="item in 10" :key="item">
                            <router-link :to="''">{{item}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </main>     
</template>

<style lang="scss" scoped>

.header{
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
}

.icon1{
}

.header > .search{
    width:calc(100% - 40px);
}

.content{
    padding-left:20px;
}
.list{
    margin-bottom:30px;
    div{
        overflow-x: auto;
    }
    > * {
        display: block;
    }

    > strong {
        font-size:var(--f-theme-title2);
        color:var(--c-lnk-dark);
    }

    > span{
        font-size:var(--f-theme-tiny);
        color:var(--c-lnk-dark);
        padding: 12px 0;
    }

    ul li a{
        width:230px;
        height:230px;
        display: block;
        background: var(--c-lnk-light);
        border-radius: 5px;
    }

    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    li{
        margin-right: 10px;;
    }
}
</style> 