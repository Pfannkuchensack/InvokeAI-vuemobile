<script setup lang="ts">
import { ref, inject } from 'vue'
import HeaderView from "../components/HeaderView.vue";
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });
let loading = ref(false);
let generator_progress = ref(null);
const socket = inject('socket');
socket.on('generator_progress', (data) => {
	console.log(data);
	generator_progress.value = data;
});
</script>

<template>
	<div class="w-vhv">
		<HeaderView />
		<div class="bg-gray-200 p-6" v-if="generator_progress != null">
			<img :src="generator_progress.progress_image.dataURL" :height="generator_progress.progress_image.height"
				:width="generator_progress.progress_image.width" />
		</div>
		<div class="bg-gray-200 p-6" v-else>
			<p>Nothing to show</p>
		</div>
	</div>
</template>

<style scoped></style>
