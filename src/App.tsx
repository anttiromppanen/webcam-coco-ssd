import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Webcam from "react-webcam";
import Camera from "./components/Camera";
import ObjectDetectionCanvas from "./components/ObjectDetectionCanvas";
import useObjectDetection from "./hooks/useObjectDetection";
import LoadingScreen from "./components/LoadingScreen";
import { CameraIcon } from "@heroicons/react/16/solid";
import UserMediaError from "./components/UserMediaError";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isUserMediaError, setIsUserMediaError] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<
    "user" | "environment"
  >("user");

  const { isModelLoading } = useObjectDetection(webcamRef, canvasRef);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <AnimatePresence mode="sync">
        {isModelLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
        {!isModelLoading && isUserMediaError && <UserMediaError />}
        {!isModelLoading && !isUserMediaError && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <button
              type="button"
              aria-label="Switch camera"
              onClick={() =>
                setCameraFacingMode((state) =>
                  state === "user" ? "environment" : "user"
                )
              }
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                zIndex: 99999,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "100%",
                border: "none",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CameraIcon
                style={{
                  width: "40px",
                  height: "40px",
                  color: "black",
                  opacity: 0.8,
                }}
              />
            </button>
            <Camera
              ref={webcamRef}
              cameraFacingMode={cameraFacingMode}
              setIsUserMediaError={setIsUserMediaError}
            />
            <ObjectDetectionCanvas ref={canvasRef} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
