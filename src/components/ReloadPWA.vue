<template>
  <div>
    pwa
  </div>
</template>

<script lang="ts" setup>
/*
<template>
  <div class="modal-wrap full" v-if="offlineReady || needRefresh" role="alert">
    <div class="modal" style="max-width: 640px; margin: 0 auto; z-index: 99;">
      <section class="content">
        <p style="padding: 20px">
          <span v-if="offlineReady">오프라인에서 작업 가능</span> <!-- 변경된 부분: 오프라인 메시지 -->
          <span v-else>새로운 버전의 앱이 준비되었습니다.</span> <!-- 변경된 부분: 업데이트 메시지 -->
          <button @click="close" class="btn01" style="background: #555; width: 100%" v-if="offlineReady">
            오프라인 작업하기 <!-- 변경된 부분: 버튼 텍스트 -->
          </button>
        </p>
        <div class="display: flex;">
          <button v-if="needRefresh" @click="updateServiceWorkerHandler" class="btn01" style="width: 100%;">
            업데이트 <!-- 변경된 부분: 버튼 텍스트 -->
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

const updateServiceWorkerHandler = async () => {
  await updateServiceWorker();
};
</script>
*/
</script>