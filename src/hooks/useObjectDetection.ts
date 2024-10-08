import { ObjectDetection } from "@tensorflow-models/coco-ssd";
import { RefObject, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { loadModel, runObjectDetection } from "../utils/cocoSSDUtils";
import showMyVideo from "../utils/videoUtils";

let detectInterval: NodeJS.Timeout;

function useObjectDetection(
  webcamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>
) {
  const [isModelLoading, setIsModelLoading] = useState(false);

  const objectDetectionLoop = useCallback(
    (net: ObjectDetection) => {
      detectInterval = setInterval(() => {
        runObjectDetection(net, webcamRef, canvasRef);
      }, 10);
    },
    [canvasRef, webcamRef]
  );

  useEffect(() => {
    // async await store result of loadModel into variable
    const runModel = async () => {
      showMyVideo(webcamRef, canvasRef);
      // const model = await loadModel(setIsModelLoading);
      const model = await loadModel(setIsModelLoading);
      objectDetectionLoop(model);
    };

    runModel();
    return () => clearInterval(detectInterval);
  }, [objectDetectionLoop, canvasRef, webcamRef]);

  return { isModelLoading };
}

export default useObjectDetection;
