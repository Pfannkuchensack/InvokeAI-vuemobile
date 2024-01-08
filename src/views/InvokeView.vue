<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useModelssd1Store } from '@/stores/modelssd1';
import HeaderView from "../components/HeaderView.vue";
const state = useStorage('invokeip', { ip: '', port: '' });
const modelssd1 = useModelssd1Store();
if (modelssd1.listmodelssd1 == null) {
	modelssd1.getmodelssd1(state);
}
const prompts: any = useStorage('prompts', { positive: '', negative: '' });
const config: any = useStorage('config', { steps: 25, iterations: 1, cfg: 7, model: '', seed: 0, rseed: false, width: 512, height: 512, clip: 0, scheduler: 'euler' });
const schedulers: any = ['ddim', 'ddpm', 'deis', 'lms', 'lms_k', 'pndm', 'heun', 'heun_k', 'euler', 'euler_k', 'euler_a', 'kdpm_2', 'kdpm_2_a', 'dpmpp_2s', 'dpmpp_2s_k', 'dpmpp_2m', 'dpmpp_2m_k', 'dpmpp_2m_sde', 'dpmpp_2m_sde_k', 'dpmpp_sde', 'dpmpp_sde_k', 'unipc'];
</script>

<template>
	<div>
		<HeaderView />
		<form clas="w-full max-w-lg">
			<textarea v-model="prompts.positive" autocomplete="off" role="presentation" id="pprompt"
				class="w-full px-3 py-1 text-gray-700 border rounded-lg text-base mt-1" placeholder="Positive Prompt" rows="4"></textarea>
			<textarea v-model="prompts.negative" autocomplete="off" role="presentation" id="nprompt"
				class="w-full px-3 py-1 text-gray-700 border rounded-lg text-base mt-1" placeholder="Negative Prompt" rows="4"></textarea>
			<!-- Lists of models -->
			<div class="mb-4">
				<select v-if="modelssd1.listmodelssd1" id="model" v-model="config.model"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<option v-for="model in modelssd1.listmodelssd1.models" :key="model.model_name">
						{{ model.model_name }}
					</option>
				</select>
				<label for="model" class=" text-gray-700 text-sm font-bold mb-2">Model:</label>
			</div>
			<div class="mb-4">
				
				<select v-if="modelssd1.listmodelssd1" id="scheduler" v-model="config.scheduler"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<option v-for="scheduler in schedulers" :key="scheduler">
						{{ scheduler }}
					</option>
				</select>
				<label for="scheduler" class=" text-gray-700 text-sm font-bold mb-2">Scheduler:</label>
			</div>
			<div class="mb-4">
				
				<input type="number" min="1" v-model="config.iterations" id="iterations"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-right">
					<label for="iterations" class=" text-gray-700 text-sm font-bold mb-2">Iterations:</label>
			</div>
			<div class="mb-4">
				
				<input type="number" min="1" v-model="config.steps" id="steps"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="steps" class=" text-gray-700 text-sm font-bold mb-2">Steps:</label>
			</div>
			<div class="mb-4">
				
				<input type="number" min="1" v-model="config.cfg" id="cfg"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="cfg" class=" text-gray-700 text-sm font-bold mb-2">CFG:</label>
			</div>
			<div class="mb-4">
				
				<input :disabled="config.rseed" type="number" min="0" v-model="config.seed" id="seed"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="seed" class=" text-gray-700 text-sm font-bold mb-2">Seed:</label>
			</div>
			<div class="mb-4">
				
				<input type="checkbox" v-model="config.rseed" id="rseed" class="w-3/4 px-4 py-3 text-gray-700 border rounded-lg text-base float-end" />
			</div>
			<label for="rseed" class=" text-gray-700 text-sm font-bold mb-2">Random Seed:</label>
			<div class="mb-4">
				
				<input type="number" min="0" v-model="config.clip" id="clip"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="clip" class=" text-gray-700 text-sm font-bold mb-2">Clip:</label>
			</div>
			<div class="mb-4">
				
				<input type="number" min="1" v-model="config.width" id="width"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="width" class=" text-gray-700 text-sm font-bold mb-2">Width:</label>
			</div>
			<div class="mb-4">
				
				<input type="number" min="1" v-model="config.height" id="height"
					class="w-3/4 px-4 py-1 text-gray-700 border rounded-lg text-base float-end">
					<label for="height" class=" text-gray-700 text-sm font-bold mb-2">Height:</label>
			</div>
			<button type="button"
				class="w-1/4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg focus:shadow-outline float-left"
				@click="modelssd1.invoke(state, prompts, config, false)">Invoke</button>
			<button type="button"
				class="w-1/2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg focus:shadow-outline float-right"
				@click="modelssd1.invoke(state, prompts, config, true)">Invoke with Preview</button>
		</form>
	</div>
</template>

<style scoped></style>
