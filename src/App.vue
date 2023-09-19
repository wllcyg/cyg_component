<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <el-button>按钮1</el-button>
  </div>
</template>
<script setup lang="ts">
const test = ref<string>('test')
console.log(test.value);

</script>