import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModelssd1Store = defineStore('modelssd1', () => {
	const listmodelssd1 = ref()
	function getmodelssd1(state: any) {
		// make api request
		fetch('http://' + state.value.ip + ':' +state.value.port + '/api/v1/models/?base_models=sd-1&model_type=main').then(response => response.json()).then(data => {
			listmodelssd1.value = data;
		});
	}

	return { listmodelssd1, getmodelssd1 }
})
