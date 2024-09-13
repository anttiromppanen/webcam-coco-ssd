import {
  load as cocoSSDLoad,
  type ObjectDetection,
} from "@tensorflow-models/coco-ssd";
import { Dispatch, RefObject, SetStateAction } from "react";
import Webcam from "react-webcam";
import drawRect from "./drawRect";

export async function runObjectDetection(
  net: ObjectDetection,
  webcamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>
) {
  if (
    canvasRef.current &&
    webcamRef.current !== null &&
    webcamRef.current.video?.readyState === 4
  ) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Make detections
    const detectedObjects = await net.detect(
      webcamRef.current.video,
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
