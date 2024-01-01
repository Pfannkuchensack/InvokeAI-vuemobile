<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useModelssd1Store } from '@/stores/modelssd1';
const modelssd1 = useModelssd1Store();
modelssd1.getmodelssd1();
</script>

<template>
  <div class="md:container md:mx-auto">
  <RouterView />
  </div>
</template>

<style scoped>
</style>
