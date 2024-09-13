import { forwardRef, RefObject } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

const cameraModeSelector = {
  user: "user",
  environment: { exact: "environment" },
};

const Camera = forwardRef(
  ({ cameraFacingMode }: { cameraFacingMode: "user" | "environment" }, ref) => {
    return (
      <Webcam
        ref={ref as RefObject<Webcam>}
        videoConstraints={{ facingMode: cameraModeSelector[cameraFacingMode] }}
        className={styles.camera_sm}
      />
    );
  }
);

export default Camera;
