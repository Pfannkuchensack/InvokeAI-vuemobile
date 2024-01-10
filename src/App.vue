<script setup lang="ts">
import { provide } from 'vue'
import { RouterView } from 'vue-router';
import { useModelssd1Store } from '@/stores/modelssd1';
import { useStorage } from '@vueuse/core';
import { io } from 'socket.io-client';
const state = useStorage('invokeip', { ip: '', port: '' });

const modelssd1 = useModelssd1Store();
if (state.value.ip != '' && state.value.port != '') {
  modelssd1.getmodelssd1(state);
	const socket = io(`ws://${state.value.ip}:${state.value.port}`, {
		transports: ['websocket'],
		path: '/ws/socket.io/',
	});
	socket.connect();
	socket.on('connect', () => {
    const queue_id = 'default';
    socket.emit('subscribe_queue', { queue_id });
  });
	provide('socket', socket);
}

</script>

<template>
  <div class="md:container md:mx-auto">
    <RouterView/>
  </div>
</template>

<style scoped></style>
