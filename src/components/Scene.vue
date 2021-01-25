<template>
  <canvas class="canvas" ref="canvasRef"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  Clock,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import waterVertexShader from "../shaders/water/vertex";
import waterFragmentShader from "../shaders/water/fragment";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import useGUI from "../composables/useGUI";
import useResize from "../composables/useResize";

// Scene
const scene = new Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new PlaneBufferGeometry(2, 2, 512, 512);

// Colors
const debugObject = {
  depthColor: "#186691",
  surfaceColor: "#9bd8ff",
};

// Material
const waterMaterial = new ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.3 },
    uBigWavesFrequency: { value: new Vector2(4, 2) },
    uBigWavesSpeed: { value: 0.8 },

    uSmallWavesElevation: { value: 0.2 },
    uSmallWavesFrequency: { value: 3 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallIterations: { value: 4 },

    uDepthColor: { value: new Color(debugObject.depthColor) },
    uSurfaceColor: { value: new Color(debugObject.surfaceColor) },
    uColorOffset: { value: 0.1 },
    uColorMultiplier: { value: 5 },
  },
});

// Mesh
const water = new Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Base camera
const camera = new PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 1);
scene.add(camera);

export default defineComponent({
  name: "Scene",
  setup() {
    const canvasRef = ref();

    // Mount the scene
    onMounted(() => {
      const canvas = canvasRef.value;

      // Renderer
      const renderer = new WebGLRenderer({ canvas });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      // screen resize
      useResize(sizes, camera, renderer);

      // Animation loop
      const clock = new Clock();
      (function tick() {
        const elapsedTime = clock.getElapsedTime();

        // Water
        waterMaterial.uniforms.uTime.value = elapsedTime;

        // Update controls

        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      })();

      // Debug UI
      const gui = useGUI(350);
      gui.addColor(debugObject, "depthColor").onChange(() => {
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor);
      });
      gui.addColor(debugObject, "surfaceColor").onChange(() => {
        waterMaterial.uniforms.uSurfaceColor.value.set(
          debugObject.surfaceColor
        );
      });
      gui
        .add(waterMaterial.uniforms.uBigWavesElevation, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uBigWavesElevation");
      gui
        .add(waterMaterial.uniforms.uBigWavesFrequency.value, "x")
        .min(0)
        .max(10)
        .step(0.001)
        .name("uBigWavesFrequencyX");
      gui
        .add(waterMaterial.uniforms.uBigWavesFrequency.value, "y")
        .min(0)
        .max(10)
        .step(0.001)
        .name("uBigWavesFrequencyY");
      gui
        .add(waterMaterial.uniforms.uBigWavesSpeed, "value")
        .min(0)
        .max(4)
        .step(0.001)
        .name("uBigWavesSpeed");
      gui
        .add(waterMaterial.uniforms.uSmallWavesElevation, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uSmallWavesElevation");
      gui
        .add(waterMaterial.uniforms.uSmallWavesFrequency, "value")
        .min(0)
        .max(30)
        .step(0.001)
        .name("uSmallWavesFrequency");
      gui
        .add(waterMaterial.uniforms.uSmallWavesSpeed, "value")
        .min(0)
        .max(4)
        .step(0.001)
        .name("uSmallWavesSpeed");
      gui
        .add(waterMaterial.uniforms.uSmallIterations, "value")
        .min(0)
        .max(5)
        .step(1)
        .name("uSmallIterations");
      gui
        .add(waterMaterial.uniforms.uColorOffset, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("uColorOffset");
      gui
        .add(waterMaterial.uniforms.uColorMultiplier, "value")
        .min(0)
        .max(10)
        .step(0.001)
        .name("uColorMultiplier");
    });

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
