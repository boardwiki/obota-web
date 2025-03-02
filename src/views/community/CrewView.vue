<script setup lang="ts" >
    import Head from '@/components/community/Header.vue';
    import Select from '@/components/frame/Select.vue';
    import { watch,ref } from 'vue';
    
    const sort = ref<string>('all');
    const sort2 = ref<string>('1');


</script>

<template>
    <main class="crew">
        <Head></Head>

        <div class="cate">
            <div class="sort">
                <Select
                    v-model="sort"
                    :labels="['지역','서울','경기']"
                    :values="['all','1','2','3']"
                    width="100px"
                    height="30px"
                ></Select>
            </div>

            
            <div class="sort">
                <Select
                    v-model="sort2"
                    :labels="['최신','좋아요','마감순']"
                    :values="['1','2','3']"
                    width="100px"
                    height="30px"
                ></Select>
            </div>
        </div>

        
        <div class="info">
            <span>총 26개</span>

            <router-link to="/community/crewcreate" class="btn_wrtie" v-if="true">
                크루 등록 요청
                <i class="material-icons">
                    add
                </i>
            </router-link>
        </div>

        <ul class="list">
            <li v-for="id in 4" :key="id">
                <router-link to="/community/crew/1" >
                    <div>
                        <strong>크루명</strong>
                        <button>
                            <i class="material-icons">
                                favorite
                            </i>
                            135
                        </button>
                    </div>

                    <ul>
                        <li>수도권</li>
                        <li>모집중</li>
                    </ul>

                    <p>
                        크루에대한 간략한 설명입니다.
                    </p>
                </router-link>
            </li>
        </ul>

    </main>
</template>

<style lang="scss" scoped>

    .crew{
        padding-bottom:70px;
    }

    .cate{
        display: flex;
        padding:20px 10px 10px;
        border-bottom:1px solid var(--c-lnk-light);

        > div{
            margin-right:5px;
        }
    }

    .info{
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-content: center;
        flex-direction: row;
        font-size:var(--f-theme-small);

        a{
            color:var(--c-theme-blue);
            border-radius: 10px;
            padding:7px 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            align-content: center;
            flex-direction: row;
            i{
                font-size:var(--f-theme-regular);
            }
        }

    }

    .list{
        padding:0 10px;

        > li{
            border:1px solid var(--c-lnk-light);
            background: var(--c-lnk-base);
            padding:20px;
            border-radius: 20px;
            margin-bottom: 5px;

            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            strong{
                font-size:var(--f-theme-large);
            }

            button{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            button i{
                font-size:var(--f-theme-large);
                margin-right: 5px;
                color:var(--c-lnk-dark)
            }

            ul{
                display: flex;
            }

            li{
                font-size:var(--f-theme-tiny);
                background: var(--c-lnk-light);
                padding:5px;
                margin-right: 5px;
                border-radius: 5px;
            }
            
            p{
                display: -webkit-box;
                -webkit-line-clamp:1; /* 표시할 줄 수 */
                -webkit-box-orient: vertical;
                overflow: hidden;
                color:var(--c-lnk-basic)
            }

        }
    }

</style>