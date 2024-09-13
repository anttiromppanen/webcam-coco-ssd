import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useRef } from "react";
import Webcam from "react-webcam";
import useObjectDetection from "./hooks/useObjectDetection";

function App() {
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { isModelLoading } = useObjectDetection(webCamRef, canvasRef);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <Webcam
              ref={webCamRef}
              width="1024"
              height="768"
              style={{
                borderRadius: 10,
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                width: 1024,
                height: 768,
                left: "50%",
                transform: "translateX(-50%)",
                bottom: 0,
                zIndex: 99999,
              }}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
