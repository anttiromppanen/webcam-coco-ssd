import { forwardRef, RefObject } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

const facingModeSelector = {
  user: "user",
  environment: { exact: "environment" },
};

const Camera = forwardRef(
  ({ facingMode }: { facingMode: "user" | "environment" }, ref) => {
    return (
      <Webcam
        ref={ref as RefObject<Webcam>}
        videoConstraints={{ facingMode: facingModeSelector[facingMode] }}
        className={styles.camera_sm}
      />
    );
  }
);

export default Camera;
