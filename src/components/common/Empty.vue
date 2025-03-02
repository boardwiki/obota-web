<script lang="ts" setup>
  const imageEmpty = new URL('@/assets/empty_img.png', import.meta.url).href // 마커이미지의 주소입니다

  const props = defineProps<{
    msg :string
  }>();
</script>


<template>
    <div class="empty-content">
        <img :src="imageEmpty" alt="">
        <p>{{msg}}</p>
    </div>
</template>

<style scoped lang="scss">
    .empty-content{
        width: 100%;
        padding:50px 20px;
        text-align: center;
        color:var(--c-lnk-basic);

        img{
            width: 100%;
            max-width: 250px;;
        }
        p{
            margin-top:20px;
            font-size:var(--f-theme-small)
        }
    }
</style>