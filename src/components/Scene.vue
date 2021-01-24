<template>
  <canvas class="canvas" ref="canvasRef"></canvas>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import renderWaterScene from "../renderWaterScene";

export default defineComponent({
  name: "Scene",
  setup() {
    const canvasRef = ref();

    renderWaterScene(canvasRef);

    return {
      canvasRef,
    };
  },
});
</script>

<style scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
