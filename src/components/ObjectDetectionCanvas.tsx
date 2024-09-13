import { forwardRef, RefObject } from "react";
import styles from "./ObjectDetectionCanvas.module.css";

const ObjectDetectionCanvas = forwardRef((_props, ref) => {
  return (
    <canvas
      ref={ref as RefObject<HTMLCanvasElement>}
      className={styles.canvas_lg}
    />
  );
});

export default ObjectDetectionCanvas;
