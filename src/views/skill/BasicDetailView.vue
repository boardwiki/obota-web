<script setup lang="ts">
    import router from '@/router';
    import {onMounted, ref } from 'vue';
    import { useBasicStore } from '@/stores/basic';
    import type { ObejctBasicInfo } from '@/types/basic';

    const stoBasic  = useBasicStore();
    const props = defineProps<{
        id: string
    }>();

    const myVideo = ref<boolean>(false);
    const detail = ref<ObejctBasicInfo|null>()
    onMounted(async() => {
        await stoBasic.getSaveCategory();
        const detail_search = await stoBasic.list.filter(skill=>{
            return skill.engName === props.id
        })
        detail.value = detail_search[0];
    });

    const back = () =>{
        router.push('/skill/basic')
    }

</script>

<template>

    <main class="skill_detail" v-if="detail">
      
        <header class="hd">
            <div class="title">
                <span class="tit">
                    {{
                        detail.engName
                    }}
                </span>

                <button class="btn_back"  @click="back()" type="button">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="awesome-icons" />
                </button>
            </div>
        </header>
        
        <section>
            <h2 class="sound_only">트릭 정보</h2>

            <ul class="video_content">
                <li v-if="!myVideo" class="sample">
                    <div class="shorts-container">
                        <iframe width="480" height="560" class="shorts-iframe" :src="`https://www.youtube.com/embed/${detail.youTubeLink}?rel=0`" allowfullscreen>
                        </iframe>
                    </div>
                </li>
            </ul> 

            <article class="info">
                <h3>
                    <strong>
                        {{detail.korName }}
                    </strong>
                    <span class="level_info basic">기초</span>
                </h3>

                <p class="description" v-html="detail.description.replace(/\r\n/g, '<br>')"></p>
            </article>
        </section>
    </main>
</template>


<style lang="scss" scoped>



</style>