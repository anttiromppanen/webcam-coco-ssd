import {
  load as cocoSSDLoad,
  type ObjectDetection,
} from "@tensorflow-models/coco-ssd";
import { Dispatch, RefObject, SetStateAction } from "react";
import Webcam from "react-webcam";
import drawRect from "./drawRect";

export async function runObjectDetection(
  net: ObjectDetection,
  webCamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>
) {
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

export async function loadModel(
  setIsModelLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsModelLoading(true);
  const model = await cocoSSDLoad();
  setIsModelLoading(false);
  return model;
}
