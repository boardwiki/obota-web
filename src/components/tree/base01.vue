<template>
  <div ref="scene"></div>
</template>

<script setup lang="ts">
/*
import { ref, onMounted } from 'vue';
import * as THREE from 'three';

const scene = ref<THREE.Scene>();
const camera = ref<THREE.PerspectiveCamera>();
const renderer = ref<THREE.WebGLRenderer>();
const cube = ref<THREE.Mesh>();

onMounted(() => {
  // 씬, 카메라, 렌더러 생성
  scene.value = new THREE.Scene();
  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer.value = new THREE.WebGLRenderer();
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene')?.appendChild(renderer.value.domElement);

  // 큐브 생성
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube.value = new THREE.Mesh(geometry, material);
  scene.value.add(cube.value);

  // 카메라 위치 설정
  camera.value.position.z = 5;

  // 창 크기 조정 시 카메라 비율 업데이트
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.value.aspect = newWidth / newHeight;
    camera.value.updateProjectionMatrix();

    renderer.value.setSize(newWidth, newHeight);
  });

  // 애니메이션 루프 시작
  animate();
});

function animate() {
  requestAnimationFrame(animate);

  // 큐브 회전
  if (cube.value) {
    cube.value.rotation.x += 0.01;
    cube.value.rotation.y += 0.01;
  }

  // 렌더링
  renderer.value.render(scene.value, camera.value);
}
*/
</script>

<style scoped>
/* 필요한 스타일 지정 */
</style>