<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import HeaderView from "../components/HeaderView.vue";
const props = defineProps(['modelssd1']);
const state = useStorage('invokeip', { ip: '', port: '' })
</script>

<template>
  <HeaderView v-if="state.ip != '' && state.port != ''"/>
  <input v-model="state.ip" type="text" placeholder="IP" class="border-2 border-gray-300 p-2 rounded-lg">
  <input v-model="state.port" type="text" placeholder="Port" class="border-2 border-gray-300 p-2 rounded-lg">
</template>

<style scoped>
</style>
