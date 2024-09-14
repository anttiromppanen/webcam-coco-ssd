import { Dispatch, forwardRef, RefObject, SetStateAction } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

interface CameraProps {
  cameraFacingMode: "user" | "environment";
  setIsUserMediaError: Dispatch<SetStateAction<boolean>>;
}

const cameraModeSelector = {
  user: "user",
  environment: { exact: "environment" },
};

const Camera = forwardRef(
  ({ cameraFacingMode, setIsUserMediaError }: CameraProps, ref) => {
    return (
      <Webcam
        ref={ref as RefObject<Webcam>}
        videoConstraints={{ facingMode: cameraModeSelector[cameraFacingMode] }}
        onUserMediaError={(error) => setIsUserMediaError(true)}
        className={styles.camera_sm}
      />
    );
  }
);

export default Camera;
