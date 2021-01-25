import { onBeforeUnmount } from "vue";
import * as dat from "dat.gui";

export default function useGUI(width: number) {
  const gui = new dat.GUI({ width });

  onBeforeUnmount(() => {
    gui.destroy();
  });

  return gui;
}
