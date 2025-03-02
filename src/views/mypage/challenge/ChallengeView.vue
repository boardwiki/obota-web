
<script setup lang="ts">
import Header     from '@/components/mypage/Header.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
const stoAuth = useAuthStore();

onMounted(()=>{
    stoAuth.authExtend();
})

</script>


<template>
    <main>
        <Header :info="stoAuth.info"></Header>

        <div class="content">
        </div> 

    </main>
</template>

<style lang="scss" scoped>
.content{
}
</style>