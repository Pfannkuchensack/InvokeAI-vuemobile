<script setup lang="ts">
import { ref } from 'vue'
import HeaderView from '../components/HeaderView.vue'
const gitHash = import.meta.env.VITE_GIT_COMMIT_HASH
import json from '../datasources/tokens_positive_git.json'
let randomprompt = ref('')
let max_tokens = ref(5)
let prompt_file = ref(5)
const make_random_prompt = () => {
  // get 5 random entry out of json
  let random_prompt = ''
  for (let i = 0; i < max_tokens.value; i++) {
    let random_number = Math.floor(Math.random() * json.token.length)
    random_prompt += json.token[random_number] + ', '
  }
  randomprompt.value = random_prompt
}
const make_prompt_file = () => {
  const element = document.createElement('a')
  // make prompt file
  let prompt = ''
  let random_prompt = ''
  for (let i = 0; i < prompt_file.value; i++) {
    random_prompt = ''
    for (let i = 0; i < max_tokens.value; i++) {
      let random_number = Math.floor(Math.random() * json.token.length)
      random_prompt += json.token[random_number] + ', '
    }
    prompt += random_prompt + '\n'
  }
  const file = new Blob([prompt], { type: 'text/plain;charset=utf-8' })
  element.href = URL.createObjectURL(file)
  element.download = 'prompt.txt'
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}
</script>

<template>
  <div>
    <HeaderView />
    <div class="bg-gray-200 p-6">
      <!-- suche X random tokens aus json raus und zeigen sie an -->
      <h1 class="text-center text-2xl text-gray-700">Random Prompt</h1>
      <div class="text-center text-gray-600">
        <textarea
          class="border-2 border-gray-300 p-2 rounded-lg w-full"
          rows="5"
          v-model="randomprompt"
        ></textarea>
      </div>
      <div class="text-center text-gray-600">
        <p>Words/Values</p>
        <input type="number" v-model="max_tokens" min="1" max="10" value="5" />
        <p>Prompt in File</p>
        <input type="number" v-model="prompt_file" min="1" max="10" value="5" />
      </div>
      <div class="text-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left"
          @click="make_random_prompt()"
        >
          Generate
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
          @click="make_prompt_file()"
        >
          Generate File for Download
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
