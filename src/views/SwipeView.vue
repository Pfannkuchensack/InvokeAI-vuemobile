<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/vue/24/solid'
import HeaderView from '../components/HeaderView.vue'
import { useBoardsStore } from '@/stores/boards'
import { useStorage } from '@vueuse/core'
const state = useStorage('invokeip', { ip: '', port: '' })
const boards = useBoardsStore()
let loading = ref(false)
let aktuellebild = ref('')
const swipeboards: any = useStorage('swipeboards', { yes: '', no: '' })

const init = async () => {
  loading.value = true
  if (boards.listBoards == null) await boards.getboards()
  await boards.getImagesWithoutBoard()
  boards.listBoardImages.reverse()
  aktuellebild.value = boards.listBoardImages[0]
  loading.value = false
}
const say_no = async (image: string) => {
	console.log(swipeboards.value.no)
	if(swipeboards.value.no == '')
		return;
  await boards.addImageToBoard(swipeboards.value.no, image)
  boards.listBoardImages.shift()
  aktuellebild.value = boards.listBoardImages[0]
  if (aktuellebild.value == undefined) await reset()
}
const say_yes = async (image: string) => {
	console.log(swipeboards.value.no)
	if(swipeboards.value.yes == '')
		return;
  await boards.addImageToBoard(swipeboards.value.yes, image)
  boards.listBoardImages.shift()
  aktuellebild.value = boards.listBoardImages[0]
  if (aktuellebild.value == undefined) await reset()
}
const reset = async () => {
  await boards.getImagesWithoutBoard()
  boards.listBoardImages.reverse()
  aktuellebild.value = boards.listBoardImages[0]
  if (aktuellebild.value == undefined) {
    alert('No Images left')
    window.location.href = '/'
  }
}
const showImageFull = async (image: string) => {
  // open new tab with image
  window.open(`http://${state.value.ip}:${state.value.port}/api/v1/images/i/${image}/full`)
}
init()
</script>

<template>
  <div class="w-vhv">
    <HeaderView />
    <div class="bg-gray-300" v-if="boards.listBoardImages && !loading">
      <div class="flex flex-col">
        <div class="rounded-lg border border-gray-400 shadow-lg">
          <a @click="showImageFull(aktuellebild)">
            <img
              :src="`http://${state.ip}:${state.port}/api/v1/images/i/${aktuellebild}/full`"
              class="object-contain w-full"
							style="max-height: 80vh;"
              title="Swipe Photo"
              alt="Swipe Photo"
            />
          </a>
        </div>

        <div class="">
          <div class="bg-red-300 float-left" @click="say_no(aktuellebild)">
            <ArrowLeftStartOnRectangleIcon class="h-12 w-12 inline" title="Swipe" />
          </div>
          <select v-model="swipeboards.no" class="bg-red-300">
            <option
              v-for="board in boards.listBoards"
              :key="board.board_id"
              :value="board.board_id"
            >
              {{ board.board_name }}
            </option>
          </select>
					<div class="bg-green-300 float-right" @click="say_yes(aktuellebild)">
            <ArrowRightStartOnRectangleIcon class="h-12 w-12 inline" title="Swipe" />
          </div>
					<select v-model="swipeboards.yes" class="bg-green-300 float-right">
            <option
              v-for="board in boards.listBoards"
              :key="board.board_id"
              :value="board.board_id"
            >
              {{ board.board_name }}
            </option>
          </select>
          
        </div>
      </div>
    </div>
    <div class="bg-gray-200 p-6" v-else-if="loading">
      <p>Load Images</p>
    </div>
  </div>
</template>

<style scoped></style>
