<template>
  <Scene />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene from "./components/Scene.vue";

export default defineComponent({
  name: "App",
  components: {
    Scene,
  },
});
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
}
</style>
