import { forwardRef, RefObject } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

const Camera = forwardRef((_props, ref) => {
  return (
    <Webcam
      ref={ref as RefObject<Webcam>}
      videoConstraints={{ facingMode: "user" }}
      className={styles.camera_sm}
    />
  );
});

export default Camera;
