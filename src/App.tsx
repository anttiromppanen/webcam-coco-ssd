import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import useObjectDetection from "./hooks/useObjectDetection";
import ObjectDetectionCanvas from "./components/ObjectDetectionCanvas";
import Camera from "./components/Camera";

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
      {isModelLoading && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "white" }}>Loading machine learning model...</h1>
        </div>
      )}
      {!isModelLoading && (
        <main
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
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              zIndex: 99999,
              backgroundColor: "white",
            }}
            onClick={() =>
              setCameraFacingMode((state) =>
                state === "user" ? "environment" : "user"
              )
            }
          >
            Switch Camera
          </button>
          <Camera ref={webcamRef} facingMode={cameraFacingMode} />
          <ObjectDetectionCanvas ref={canvasRef} />
        </main>
      )}
    </div>
  );
}

export default App;
