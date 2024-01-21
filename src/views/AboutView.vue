<script setup lang="ts">
import HeaderView from "../components/HeaderView.vue";
const gitHash = import.meta.env.VITE_GIT_COMMIT_HASH
</script>

<template>
	<div>
		<HeaderView />
		<div class="bg-gray-200 p-6">
			<h1 class="text-center text-2xl text-gray-700">About</h1>
			<p class="text-center text-gray-600">This is a little Mobile Vue GUI for InvokeAi</p>
			<p class="text-center text-gray-600">This GUI is intended for use with mobile devices.</p>
			<p class="text-center text-gray-600">Not all features from the original InvokeAI GUI are supported.</p>
			<br/>
			<p class="text-center text-gray-600">This project is not affiliated with InvokeAi</p>
			<p class="text-center text-gray-500">Git Hash: {{ gitHash }}</p>
		</div>
	</div>
</template>

<style scoped></style>
