<script setup lang="ts">
import { ref } from 'vue';
import HeaderView from "../components/HeaderView.vue";
import { useBoardsStore } from '@/stores/boards';
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });
const props = defineProps(['board_id', 'board_name']);
const boards = useBoardsStore();
let loading = ref(false);
const loadBoardImages = async (board_id) => {
	loading.value = true;
	if(board_id == 'none')
	{
		await boards.getImagesWithoutBoard();
		boards.listBoardImages.reverse();
	}
	else
		await boards.getImagesInBoard(board_id);
	loading.value = false;
}
loadBoardImages(props.board_id);
console.log(boards.listBoards);
const board = boards.listBoards.find((board) => board.board_id == props.board_id);
const showImageFull = async (image) => {
	// open new tab with image
	window.open(`http://${state.value.ip}:${state.value.port}/api/v1/images/i/${image}/full`);
}
</script>

<template>
	<div class="w-vhv">
		<HeaderView />
		<div v-if="board" class="bg-gray-200 p-4">Board: {{ board.board_name }}</div>
		<div class="bg-gray-300 p-6 grid gap-4 lg:grid-cols-8 grid-cols-2 grid-rows-auto"
			v-if="boards.listBoardImages && !loading">
			<div v-for="image in boards.listBoardImages.reverse()" :key="image.id" class="h-40 w-40 mx-1">
				<a @click="showImageFull(image)">
					<figure class="relative h-40 w-40">
						<img class="rounded-lg h-40 w-40 object-cover" alt="image"
							:src="`http://${state.ip}:${state.port}/api/v1/images/i/${image}/thumbnail`" />
					</figure>
				</a>
			</div>
		</div>
		<div class="bg-gray-200 p-6" v-else-if="loading">
			<p>Load Images</p>
		</div>
	</div>
</template>

<style scoped></style>
