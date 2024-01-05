<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useModelssd1Store } from '@/stores/modelssd1';
import HeaderView from "../components/HeaderView.vue";
const state = useStorage('invokeip', { ip: '', port: '' });
const modelssd1 = useModelssd1Store();
if (modelssd1.listmodelssd1 == null) {
	modelssd1.getmodelssd1(state);
}
const prompts = useStorage('prompts', { positive: '', negative: '' });
const config = useStorage('config', { steps: 25, iterations: 1, cfg: 7, model: '', seed: 0, width: 512, height: 512, clip: 0, scheduler: 'euler' });
const schedulers = [ 'ddim', 'ddpm', 'deis', 'lms', 'lms_k', 'pndm', 'heun', 'heun_k', 'euler', 'euler_k', 'euler_a', 'kdpm_2', 'kdpm_2_a', 'dpmpp_2s', 'dpmpp_2s_k', 'dpmpp_2m', 'dpmpp_2m_k', 'dpmpp_2m_sde', 'dpmpp_2m_sde_k', 'dpmpp_sde', 'dpmpp_sde_k', 'unipc' ];
</script>

<template>
	<div>
		<HeaderView />
		<textarea v-model="prompts.positive" autocomplete="off" role="presentation" id="pprompt"
			class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mt-1" placeholder="Positive Prompt"
			rows="4"></textarea>
		<textarea v-model="prompts.negative" autocomplete="off" role="presentation" id="nprompt"
			class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mt-1" placeholder="Negative Prompt"
			rows="4"></textarea>
		<!-- Lists of models -->
		<div class="flex items-center space-x-3 mt-1">
			<label for="model" class="text-gray-700">Model:</label>
			<select v-if="modelssd1.listmodelssd1" id="model" v-model="config.model"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
				<option v-for="model in modelssd1.listmodelssd1.models" :key="model.model_name">
					{{ model.model_name }}
				</option>
			</select>
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="scheduler" class="text-gray-700">Scheduler:</label>
			<select v-if="modelssd1.listmodelssd1" id="scheduler" v-model="config.scheduler"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
				<option v-for="scheduler in schedulers" :key="scheduler">
					{{ scheduler }}
				</option>
			</select>
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="iterations" class="text-gray-700">Iterations:</label>
			<input type="number" min="1" v-model="config.iterations" id="iterations"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="steps" class="text-gray-700">Steps:</label>
			<input type="number" min="1" v-model="config.steps" id="steps"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="cfg" class="text-gray-700">CFG:</label>
			<input type="number" min="1" v-model="config.cfg" id="cfg"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="seed" class="text-gray-700">Seed:</label>
			<input type="number" min="0" v-model="config.seed" id="seed"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="clip" class="text-gray-700">Clip:</label>
			<input type="number" min="0" v-model="config.clip" id="clip"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="width" class="text-gray-700">Width:</label>
			<input type="number" min="1" v-model="config.width" id="width"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<div class="flex items-center space-x-3 mt-1">
			<label for="height" class="text-gray-700">Height:</label>
			<input type="number" min="1" v-model="config.height" id="height"
				class="w-full x-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
		</div>
		<button type="button"
			class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
			@click="modelssd1.invoke(state, prompts, config)">Invoke</button>
	</div>
</template>

<style scoped></style>
