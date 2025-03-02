<script setup lang="ts" >
    import Head from '@/components/community/Header.vue';
    import Feed from '@/components/skill/Feed.vue';
    import Comment from '@/components/common/CommentFix.vue';
    import Empty from '@/components/common/Empty.vue';
    import { ref,onMounted,onBeforeUnmount} from 'vue';
    import { useFeedStore} from '@/stores/feed';
    import { useProfileStore } from '@/stores/profile';
    const comment = ref<boolean>(false);
    const stoFeed = useFeedStore();
    const stoProfile = useProfileStore();

    const skillInfo = ref<any[]>([]);


    const getComment = async(id:number) => {
        await stoFeed.getComments(id).then(()=>{
            comment.value = true;
        });
    }

    const closeComment = () => {
        stoFeed.resetComments().then(()=>{
            comment.value = false;
        });
    }

    onMounted( async()=>{
        await stoFeed.resetList();
        await stoFeed.getList().then(()=>{
            window.addEventListener('scroll', handleScroll);
        });
        const userIds = stoFeed.list.map(feed => feed.userId);
        await stoProfile.fetchProfiles(userIds);
        await stoProfile.fetchSkills(stoFeed.list).then((res)=>{
            res.map((itemInfo)=>{
                skillInfo.value.push(itemInfo);
            })
        });
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = () => {
        window.removeEventListener('scroll', handleScroll);
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadNextPage().then(() => {
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            window.addEventListener('scroll', handleScroll);
        }
    };

    const loadNextPage = async () => {
        await stoFeed.getList().then(()=>{
            skillInfo.value = [];
            const userIds = stoFeed.list.map((feed) => feed.userId);
            stoProfile.fetchProfiles(userIds);
            stoProfile.fetchSkills(stoFeed.list).then((res)=>{
                res.map((itemInfo)=>{
                    skillInfo.value.push(itemInfo);
                })
            });
        })
    }

</script>

<template>
    <main class="feed">
        <Head></Head>

        <div class="list">
            <ul>
                <li v-for="(feed,num) in stoFeed.list" :key="num">
                    <Feed 
                        @openComment="(id)=>{getComment(id)}"
                        :titleUse="true"
                        :item="{
                            categoryType: feed.categoryType,
                            commentCount: feed.commentCount,
                            commentYn: feed.commentYn,
                            description: feed.description,
                            likeCount: feed.likeCount,
                            skillId: feed.skillId,
                            userId: feed.userId,
                            videoId: feed.videoId,
                            id: feed.id,
                            likeYn : feed.likeYn
                        }"
                        :name="skillInfo.length > num ? skillInfo[num].name : '' "
                        :subName="skillInfo.length > num ? skillInfo[num].subName : '' "
                        :url="skillInfo.length > num ? skillInfo[num].url : '' "
                        :userInfo="stoProfile.list.find((user)=>user.id === feed.userId)"
                    ></Feed>
                </li>
                <li v-if="stoFeed.list.length < 1">
                    <Empty msg="올라온 기술이 없습니다"/>
                </li>
            </ul>
        </div>
        <Comment v-if="comment" :comments="stoFeed.comments" @closeComment="()=>{closeComment()}"></Comment>
    </main>
</template>

<style lang="scss" scoped>
.feed{
    .list{
        padding:var(--content-padding);
        padding-bottom: 70px;
        li{
            padding-top:40px;
        }
    }
}
</style>