<template>
  <div id="app">
    <div id="menu-bar">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
      <el-menu-item index="0" @click="navigateTo('/')">LOGO</el-menu-item>
      <el-menu-item v-for="item in menuList" :key="item.id" :index="item.id" @click="navigateTo(item.path)">{{ item.name }}</el-menu-item>
    </el-menu>

    <div id="user-avatar">
      <el-avatar size="default"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
  </div>
  <router-view />
  </div>
  <div id="subapp-viewport"></div>
</template>

<script>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    setup() {
      const menuList = [
        {
          'id': '1',
          'path': '/vue3',
          'name': 'Vue 3'
        },
        {
          'id': '2',
          'path': '/another-vue3',
          'name': 'Another Vue 3'
        },
      ]
      let menuIndexMap = new Map()
      menuList.forEach(m => {
        menuIndexMap.set(m.path.endsWith("/") ? m.path.substring(0, m.path.length - 1) : m.path, m.id)
      })
      const activeIndex = ref('2')
      const handleSelect = (key, keyPath) => {
        console.log(key, keyPath)
      }

      const route = useRoute()
      const router = useRouter()

      watch(route,(val)=>{
        let key = val.path.endsWith("/") ? val.path.substring(0, val.path.length - 1) : val.path
        activeIndex.value = menuIndexMap.get(key)
      }, {deep: true})

      const navigateTo = (path) => {
        router.push(path)
      }
      return { menuList, activeIndex, navigateTo, handleSelect }
    }
  }
</script>

<style lang="less">
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #menu-bar {
    width: 100%;
    display: flex;
    height: 60px;
    margin: 0;
    padding: 0;
  }

  #menu-bar > .el-menu {
    flex-grow: 1;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  .flex-grow {
    flex-grow: 1;
  }

  #user-avatar {
    padding: 9px;
    background-color: #545c64;
    border-bottom: 1px solid #dcdfe6;
  }
</style>
