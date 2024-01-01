// http://192.168.178.58:9090/api/v1/models/?base_models=sd-1&model_type=main
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModelssd1Store = defineStore('modelssd1', () => {
	const listmodelssd1 = ref()
	function getmodelssd1() {
		// make api request
		fetch('http://192.168.178.58:9090/api/v1/models/?base_models=sd-1&model_type=main').then(response => response.json()).then(data => {
			console.log(data)
			listmodelssd1.value = data;
		});
	}

	return { listmodelssd1, getmodelssd1 }
})
