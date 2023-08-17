<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

defineProps<{ acd: string }>();
const input = ref();

// 发送请求，请求体是从input取的
function test() {
  axios.get("http://localhost:8080/home/zx", {
    params: {name: input.value}
  }).then(res => {
    /*    const data = JSON.stringify(res.data);
        const jsonData = JSON.parse(data)*/
    ElMessage.info(res.data.newName)
    console.log(res.data.newName)
  })
}
function done(){
  ElMessage.success("完成")
}

</script>

<template>
  <h1 color="$ep-color-primary">{{ acd }}</h1>

  <p>
    See
    <a href="https://zx0550.top" target="_blank">我的博客</a> for more
    information.
  </p>
  <p>
    <el-input class="m-2" v-model="input" style="width: 200px" placeholder="请输入姓名" clearable />
  </p>
  <el-button type="info" @click="test">请求</el-button>
  <el-button type="success" @click="done">完成</el-button>
</template>

<style>
.ep-button {
  margin: 4px;
}

.ep-button + .ep-button {
  margin-left: 0;
  margin: 4px;
}
</style>
