import Webcam from "react-webcam";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import {
  load as cocoSSDLoad,
  type ObjectDetection,
} from "@tensorflow-models/coco-ssd";
import { useCallback, useEffect, useRef, useState } from "react";
import drawRect from "./utils/drawRect";

let detectInterval: NodeJS.Timeout;

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function showMyVideo() {
    if (
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      // Get video properties
      const myVideoWidth = webCamRef.current.video.videoWidth;
      const myVideoHeight = webCamRef.current.video.videoHeight;

      // Set video width and height
      webCamRef.current.video.width = myVideoWidth;
      webCamRef.current.video.height = myVideoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = myVideoWidth;
        canvasRef.current.height = myVideoHeight;
      }
    }
  }

  async function runObjectDetection(net: ObjectDetection) {
    if (
      canvasRef.current &&
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      const videoWidth = webCamRef.current.video.videoWidth;
      const videoHeight = webCamRef.current.video.videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const detectedObjects = await net.detect(
        webCamRef.current.video,
        undefined,
        0.4
      );

      // console.log("Detect data: ", detectedObjects);

      // Draw mesh
      const context = canvasRef.current.getContext("2d");

      if (context) {
        // Update drawing utility
        context.clearRect(0, 0, videoWidth, videoHeight);
        drawRect(detectedObjects, context);
      }
    }
  }

  async function loadModel() {
    setIsModelLoading(true);
    const model = await cocoSSDLoad();
    setIsModelLoading(false);
    return model;
  }

  const objectDetectionLoop = useCallback((net: ObjectDetection) => {
    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  }, []);

  useEffect(() => {
    // async await store result of loadModel into variable
    const runModel = async () => {
      showMyVideo();
      const model = await loadModel();
      objectDetectionLoop(model);
    };

    runModel();
    return () => clearInterval(detectInterval);
  }, [objectDetectionLoop]);

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
