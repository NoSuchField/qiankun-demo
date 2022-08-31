<template>
  <div id="app">
    <div id="nav">
      <router-link to="/another-vue3">Another Vue 3</router-link> |
      <router-link to="/vue3">Vue 3</router-link>
    </div>

    Base
    <router-view>

      
    </router-view>

    
  </div>

  <div id="subapp-viewport"></div>
</template>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
