<script setup lang="ts">
//import Menu from './components/common/Menu.vue';
import Boot from './components/common/Boot.vue';
import router from './router'
//import { useAuthStore } from './stores/auth';  
//import { useProfileStore} from './stores/profile'; 
import { onMounted,computed,ref } from 'vue'; //watch,

//const authStore = useAuthStore();
//const profileStore = useProfileStore();
const currentRouteName = ref<any>('');

onMounted(async() => {
  currentRouteName.value = router.currentRoute.value.name;
  /*
  await authStore.versionCheck();
  await authStore.authCheck();
  await profileStore.allUserFind();
  */
});

// currentRoute 상태 관리 
/*
watch(() => router.currentRoute.value.name, (newRouteName) => {
  currentRouteName.value = newRouteName;
});
*/

// Menu show 제어
/*
const shouldShowMenu = computed<boolean>(() => {
  return authStore.joined && !['join','skillEnroll', 'skillDetail','profileFind','month','week','error'].includes(currentRouteName.value);
});
<Menu v-if="shouldShowMenu"></Menu>
*/


</script>

<template>
    <RouterView />
    <Boot />
</template>

<style>
@import url('./assets/style/main.scss');
@import url('./assets/style/reset.scss');
@import url('./assets/style/base.scss');
</style>
