import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });

export const useBoardsStore = defineStore('boards', () => {
	const listBoards = ref();
	const listBoardImages = ref();
	function getboards() {
		// make api request
		fetch('http://' + state.value.ip + ':' + state.value.port + '/api/v1/boards/?all=true').then(response => response.json()).then(data => {
			listBoards.value = data;
		});
	}
	async function getImagesInBoard(board_id: string) {
		await fetch('http://' + state.value.ip + ':' + state.value.port + '/api/v1/boards/' + board_id + '/image_names').then(response => response.json()).then(data => {
			listBoardImages.value = data;
		});
		return listBoardImages;
	}
	async function getImagesWithoutBoard() {
		await fetch('http://' + state.value.ip + ':' + state.value.port + '/api/v1/images/?categories=general&is_intermediate=false&board_id=none&offset=0&limit=100').then(response => response.json()).then(data => {
			let data2: any = [];
			data.items.forEach((e: { image_name: any; }) => {
				data2.push(e.image_name);
			})
			listBoardImages.value = data2;
		});
		return listBoardImages;
	}

	async function addImageToBoard(board_id: string, image_name: string) {
		await fetch('http://' + state.value.ip + ':' + state.value.port + '/api/v1/board_images/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ board_id: board_id, image_name: image_name })
		}).then(response => response.json()).then(data => {
			return data;
		});
	}

	return { listBoards, listBoardImages, getboards, getImagesInBoard, getImagesWithoutBoard, addImageToBoard }
})
