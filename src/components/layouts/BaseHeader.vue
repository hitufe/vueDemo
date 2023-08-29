<script lang="ts" setup>
import {toggleDark} from "~/composables";
import {useRouter} from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const router = useRouter();
const PathUrl = (param) => {
  router.push({
    path: '/' + param,
    // query: {msg: 'dssd'}
  })

}
const toast = () => {
  ElMessage.info("我弹出来了")
};


const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
import { ref } from 'vue'
const input = ref('')
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" @click="PathUrl('')">Home</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1" @click="open">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
        <el-input v-model="input" placeholder="Please input" />
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4" @click="toast">Orders</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny"/>
      </button>
    </el-menu-item>
    <el-menu-item index="5" @click="PathUrl('articles')">Articles</el-menu-item>
    <el-menu-item index="6" @click="PathUrl('hi')">test</el-menu-item>
  </el-menu>
</template>
