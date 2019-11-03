<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import PullToRefresh from "pulltorefreshjs";
export default {
  name: "App",
  mounted() {
    const ptr = PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        window.location.reload();
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  width: 100%;
  color: #2c3e50;
  /* background: rgb(205, 27, 27); */
}
.ptr--ptr {
  box-shadow: none !important;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>
