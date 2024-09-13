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

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
        {!isModelLoading && (
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
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "100%",
                border: "none",
                cursor: "pointer",
              }}
            >
              <CameraIcon
                style={{
                  width: "40px",
                  height: "40px",
                  color: "black",
                  margin: "5px",
                }}
              />
            </button>
            <Camera ref={webcamRef} cameraFacingMode={cameraFacingMode} />
            <ObjectDetectionCanvas ref={canvasRef} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
