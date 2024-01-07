<script setup lang="ts">
import { ref } from 'vue'
import HeaderView from "../components/HeaderView.vue";
import { useBoardsStore } from '@/stores/boards';
import { useStorage } from '@vueuse/core';
const state = useStorage('invokeip', { ip: '', port: '' });
//const props = defineProps(['boards']);
const boards = useBoardsStore();
let loading = ref(false);
if (boards.listBoards == null)
	boards.getboards();
const loadBoardImages = async (board_id) => {
	loading.value = true;
	await boards.getImagesInBoard(board_id);
	loading.value = false;
}
</script>

<template>
	<div class="w-vhv">
		<HeaderView />
		<div class="bg-gray-100 p-6 rounded-lg grid gap-4 lg:grid-cols-8 grid-cols-2 grid-rows-auto" v-if="boards.listBoards">
			<div class="h-40 w-40 mx-1">
				<RouterLink :to="`/gallery/none`">
					<figure class="relative h-40 w-40">
						<figcaption class="absolute text-black bottom-0 right-0 left-0 bg-white align-middle text-center rounded-lg">
							<p>No Board</p>
						</figcaption>
					</figure>
				</RouterLink>
			</div>
			<div v-for="board in boards.listBoards" :key="board.board_id" class="h-40 w-40 mx-1">
				<RouterLink :to="`/gallery/${board.board_id}`">
					<figure class="relative h-40 w-40">
						<img class="rounded-lg h-40 w-40 object-cover" :alt="board.board_name + ' images'"
							:src="`http://localhost:9090/api/v1/images/i/${board.cover_image_name}/thumbnail`" />
						<figcaption class="absolute text-black bottom-0 right-0 left-0 bg-white align-middle text-center rounded-lg">
							<p>{{ board.board_name }}</p>
						</figcaption>
					</figure>
				</RouterLink>
			</div>
		</div>
		<div v-else>
			<p>LADE BOARDS</p>
		</div>
	</div>
</template>

<style scoped></style>
