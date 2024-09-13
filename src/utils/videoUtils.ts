import { RefObject } from "react";
import Webcam from "react-webcam";

function showMyVideo(
  webcamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>
) {
  if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
    // Get video properties
    const myVideoWidth = webcamRef.current.video.videoWidth;
    const myVideoHeight = webcamRef.current.video.videoHeight;

    // Set video width and height
    webcamRef.current.video.width = myVideoWidth;
    webcamRef.current.video.height = myVideoHeight;

    if (canvasRef.current) {
      canvasRef.current.width = myVideoWidth;
      canvasRef.current.height = myVideoHeight;
    }
  }
}

export default showMyVideo;
