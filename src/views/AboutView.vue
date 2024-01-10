<script setup lang="ts">
import HeaderView from "../components/HeaderView.vue";
const gitHash = import.meta.env.VITE_GIT_COMMIT_HASH
</script>

<template>
	<div>
		<HeaderView />
		<div class="bg-gray-100 p-6 rounded-lg">
			<h1 class="text-center text-2xl text-gray-700">About</h1>
			<p class="text-center text-gray-500">This is a little Mobile Vue GUI for InvokeAi</p>
			<p class="">Version: {{ gitHash }}</p>
		</div>
	</div>
</template>

<style scoped></style>
