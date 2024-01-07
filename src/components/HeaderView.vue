<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
	<header class="bg-white shadow">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
				<nav class="md:flex space-x-10">
					<RouterLink active-class="underline decoration-solid" to="/" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Settings
					</RouterLink>
					<RouterLink active-class="underline decoration-solid" to="/t2i" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Txt2Img
					</RouterLink>
					<RouterLink active-class="underline decoration-solid" to="/preview" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Preview
					</RouterLink>
					<RouterLink active-class="underline decoration-solid" to="/gallery" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Gallery
					</RouterLink>
					<RouterLink active-class="underline decoration-solid" to="/about" class="text-base font-medium text-gray-500 hover:text-gray-900">
						About
					</RouterLink>
				</nav>
			</div>
		</div>
	</header>
</template>

<style scoped></style>
