<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useModelssd1Store } from '@/stores/modelssd1';
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });

const modelssd1 = useModelssd1Store();
if (state.value.ip != '' && state.value.port != '') {
  modelssd1.getmodelssd1(state);
}
</script>

<template>
  <div class="md:container md:mx-auto">
    <RouterView :modelssd1="modelssd1" />
  </div>
</template>

<style scoped></style>
