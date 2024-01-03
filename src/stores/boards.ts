import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });

export const useBoardsStore = defineStore('boards', () => {
	const listBoards = ref();
	const listBoardImages = ref();
	function getboards() {
		// make api request
		fetch('http://' + state.value.ip + ':' +state.value.port + '/api/v1/boards/?all=true').then(response => response.json()).then(data => {
			console.log(data);
			listBoards.value = data;
		});
	}
	async function getImagesInBoard(board_id: string)
	{
		await fetch('http://' + state.value.ip + ':' +state.value.port + '/api/v1/boards/'+board_id+'/image_names').then(response => response.json()).then(data => {
			listBoardImages.value = data;
		});
		return listBoardImages;
	}

	return { listBoards, listBoardImages, getboards, getImagesInBoard }
})
