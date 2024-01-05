import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModelssd1Store = defineStore('modelssd1', () => {
	const listmodelssd1 = ref()
	function getmodelssd1(state: any) {
		// make api request
		fetch('http://' + state.value.ip + ':' + state.value.port + '/api/v1/models/?base_models=sd-1&model_type=main').then(response => response.json()).then(data => {
			listmodelssd1.value = data;
		});
	}
	/*
		{"prepend":false,"batch":{"graph":{"id":"text_to_image_graph","nodes":{"main_model_loader":{"type":"main_model_loader","id":"main_model_loader","is_intermediate":true,"model":{"model_name":"cottoncandyPastel_v10_diffusers","base_model":"sd-1","model_type":"main"}},"clip_skip":{"type":"clip_skip","id":"clip_skip","skipped_layers":0,"is_intermediate":true},"positive_conditioning":{"type":"compel","id":"positive_conditioning","prompt":"green grass","is_intermediate":true},"negative_conditioning":{"type":"compel","id":"negative_conditioning","prompt":"copyright","is_intermediate":true},"noise":{"type":"noise","id":"noise","seed":1337,"width":512,"height":512,"use_cpu":true,"is_intermediate":true},"denoise_latents":{"type":"denoise_latents","id":"denoise_latents","is_intermediate":true,"cfg_scale":7.5,"scheduler":"euler_k","steps":50,"denoising_start":0,"denoising_end":1},"latents_to_image":{"type":"l2i","id":"latents_to_image","fp32":true,"is_intermediate":true},"metadata_accumulator":{"id":"metadata_accumulator","type":"metadata_accumulator","generation_mode":"txt2img","cfg_scale":7.5,"height":512,"width":512,"positive_prompt":"green grass","negative_prompt":"copyright","model":{"model_name":"cottoncandyPastel_v10_diffusers","base_model":"sd-1","model_type":"main"},"steps":50,"rand_device":"cpu","scheduler":"euler_k","controlnets":[],"loras":[],"ipAdapters":[],"t2iAdapters":[],"clip_skip":0},"save_image":{"id":"save_image","type":"save_image","is_intermediate":false,"use_cache":false}},"edges":[{"source":{"node_id":"main_model_loader","field":"unet"},"destination":{"node_id":"denoise_latents","field":"unet"}},{"source":{"node_id":"main_model_loader","field":"clip"},"destination":{"node_id":"clip_skip","field":"clip"}},{"source":{"node_id":"clip_skip","field":"clip"},"destination":{"node_id":"positive_conditioning","field":"clip"}},{"source":{"node_id":"clip_skip","field":"clip"},"destination":{"node_id":"negative_conditioning","field":"clip"}},{"source":{"node_id":"positive_conditioning","field":"conditioning"},"destination":{"node_id":"denoise_latents","field":"positive_conditioning"}},{"source":{"node_id":"negative_conditioning","field":"conditioning"},"destination":{"node_id":"denoise_latents","field":"negative_conditioning"}},{"source":{"node_id":"noise","field":"noise"},"destination":{"node_id":"denoise_latents","field":"noise"}},{"source":{"node_id":"denoise_latents","field":"latents"},"destination":{"node_id":"latents_to_image","field":"latents"}},{"source":{"node_id":"metadata_accumulator","field":"metadata"},"destination":{"node_id":"latents_to_image","field":"metadata"}},{"source":{"node_id":"main_model_loader","field":"vae"},"destination":{"node_id":"latents_to_image","field":"vae"}},{"source":{"node_id":"metadata_accumulator","field":"metadata"},"destination":{"node_id":"save_image","field":"metadata"}},{"source":{"node_id":"latents_to_image","field":"image"},"destination":{"node_id":"save_image","field":"image"}}]},"runs":1,"data":[[{"node_path":"noise","field_name":"seed","items":[488950081]},{"node_path":"metadata_accumulator","field_name":"seed","items":[488950081]}]]}}
	*/
	function invoke(state: object, prompt: object, config: object) {
		// make api request
		console.log(prompt, config);
		// /api/v1/queue/{queue_id}/enqueue_graph queue_id = default
		fetch('http://' + state.ip + ':' + state.port + '/api/v1/queue/default/enqueue_graph', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prepend: false,
				graph: {
					id: "text_to_image_graph",
					nodes: {
						main_model_loader: {
							type: "main_model_loader",
							id: "main_model_loader",
							is_intermediate: true,
							model: {
								model_name: config.model,
								base_model: "sd-1",
								model_type: "main"
							}
						},
						clip_skip: {
							type: "clip_skip",
							id: "clip_skip",
							skipped_layers: config.clip,
							is_intermediate: true
						},
						positive_conditioning: {
							type: "compel",
							id: "positive_conditioning",
							prompt: prompt.positive,
							is_intermediate: true
						},
						negative_conditioning: {
							type: "compel",
							id: "negative_conditioning",
							prompt: prompt.negative,
							is_intermediate: true
						},
						noise: {
							type: "noise",
							id: "noise",
							seed: config.seed,
							width: config.width,
							height: config.height,
							use_cpu: true,
							is_intermediate: true
						},
						denoise_latents: {
							type: "denoise_latents",
							id: "denoise_latents",
							is_intermediate: true,
							cfg_scale: config.cfg,
							scheduler: config.scheduler || "euler_k",
							steps: config.steps,
							denoising_start: 0,
							denoising_end: 1
						},
						latents_to_image: {
							type: "l2i",
							id: "latents_to_image",
							fp32: true,
							is_intermediate: true
						},
						metadata_accumulator: {
							id: "metadata_accumulator",
							type: "metadata_accumulator",
							generation_mode: "txt2img",
							cfg_scale: config.cfg,
							height: config.height,
							width: config.width,
							positive_prompt: prompt.positive,
							negative_prompt: prompt.negative,
						}
					},
					edges: [
						{
							"source": {
								"node_id": "main_model_loader",
								"field": "unet"
							},
							"destination": {
								"node_id": "denoise_latents",
								"field": "unet"
							}
						},
						{
							"source": {
								"node_id": "main_model_loader",
								"field": "clip"
							},
							"destination": {
								"node_id": "clip_skip",
								"field": "clip"
							}
						},
						{
							"source": {
								"node_id": "clip_skip",
								"field": "clip"
							},
							"destination": {
								"node_id": "positive_conditioning",
								"field": "clip"
							}
						},
						{
							"source": {
								"node_id": "clip_skip",
								"field": "clip"
							},
							"destination": {
								"node_id": "negative_conditioning",
								"field": "clip"
							}
						},
						{
							"source": {
								"node_id": "positive_conditioning",
								"field": "conditioning"
							},
							"destination": {
								"node_id": "denoise_latents",
								"field": "positive_conditioning"
							}
						},
						{
							"source": {
								"node_id": "negative_conditioning",
								"field": "conditioning"
							},
							"destination": {
								"node_id": "denoise_latents",
								"field": "negative_conditioning"
							}
						},
						{
							"source": {
								"node_id": "noise",
								"field": "noise"
							},
							"destination": {
								"node_id": "denoise_latents",
								"field": "noise"
							}
						},
						{
							"source": {
								"node_id": "denoise_latents",
								"field": "latents"
							},
							"destination": {
								"node_id": "latents_to_image",
								"field": "latents"
							}
						},
						{
							"source": {
								"node_id": "metadata_accumulator",
								"field": "metadata"
							},
							"destination": {
								"node_id": "latents_to_image",
								"field": "metadata"
							}
						},
						{
							"source": {
								"node_id": "main_model_loader",
								"field": "vae"
							},
							"destination": {
								"node_id": "latents_to_image",
								"field": "vae"
							}
						},
						{
							"source": {
								"node_id": "metadata_accumulator",
								"field": "metadata"
							},
							"destination": {
								"node_id": "save_image",
								"field": "metadata"
							}
						},
						{
							"source": {
								"node_id": "latents_to_image",
								"field": "image"
							},
							"destination": {
								"node_id": "save_image",
								"field": "image"
							}
						}
					]
				}
			})
		}).then(response => response.json()).then(data => {
			// todo - do something with data
		});
	}


	return { listmodelssd1, getmodelssd1, invoke }
})
