<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { AdjustmentsHorizontalIcon, PhotoIcon, InformationCircleIcon, PresentationChartBarIcon } from '@heroicons/vue/24/solid'
</script>

<template>
	<header class="bg-gray-300">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex  justify-between items-center py-6 md:justify-start md:space-x-10">
				<nav class="md:flex space-x-10">
					<RouterLink active-class="underline decoration-solid text-[#ddf50a]" to="/" class="text-base font-medium text-gray-500 hover:text-gray-900">
						<AdjustmentsHorizontalIcon class="h-6 w-6 inline" title="Settings" />
					</RouterLink>
					<RouterLink active-class="underline decoration-solid text-[#ddf50a]" to="/t2i" class="text-base font-medium text-gray-500 hover:text-gray-900">
						Txt2Img
					</RouterLink>
					<RouterLink active-class="underline decoration-solid text-[#ddf50a]" to="/preview" class="text-base font-medium text-gray-500 hover:text-gray-900">
						<PresentationChartBarIcon class="h-6 w-6 inline" title="Preview" />
					</RouterLink>
					<RouterLink active-class="underline decoration-solid text-[#ddf50a]" to="/gallery" class="text-base font-medium text-gray-500 hover:text-gray-900">
						<PhotoIcon class="h-6 w-6 inline" title="Gallery" />
					</RouterLink>
					<RouterLink active-class="underline decoration-solid text-[#ddf50a]" to="/about" class="text-base font-medium text-gray-500 hover:text-gray-900">
						<InformationCircleIcon class="h-6 w-6 inline" title="About" />
					</RouterLink>
				</nav>
			</div>
		</div>
	</header>
</template>

<style scoped></style>
