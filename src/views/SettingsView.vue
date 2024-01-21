<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import HeaderView from '../components/HeaderView.vue'
const state = useStorage('invokeip', { ip: '', port: '' })
</script>

<template>
  <div>
    <HeaderView v-if="state.ip != '' && state.port != ''" />
    <div class="bg-gray-200 p-6 grid gap-4 lg:grid-cols-8 grid-cols-2 grid-rows-auto">
      <input
        v-model="state.ip"
        type="text"
        placeholder="IP"
        class="border-2 border-gray-300 p-2 rounded-lg"
      />
      <input
        v-model="state.port"
        type="text"
        placeholder="Port"
        class="border-2 border-gray-300 p-2 rounded-lg"
      />
    </div>
    <p class="text-center">This project is not affiliated with InvokeAi</p>
  </div>
</template>

<style scoped></style>
