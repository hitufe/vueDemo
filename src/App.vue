<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />

      <div w="full" py="4">
<!--        <Logos my="4" />-->
        <router-view acd="欢迎光临"/>
<!--        <HelloWorld acd="Hello Vue 3 + Element Plus + Vite" />-->
      </div>
    </div>
  </el-config-provider>

</template>
<script>
export default{
  name:'App',
  components:{
  }
}
</script>
<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
