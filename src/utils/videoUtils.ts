import { RefObject } from "react";
import Webcam from "react-webcam";

function showMyVideo(
  webCamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>
) {
  if (webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
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

export default showMyVideo;
