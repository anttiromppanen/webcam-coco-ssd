import { type DetectedObject } from "@tensorflow-models/coco-ssd";

function getColor(score: number) {
  if (score >= 0.7) {
    return "springgreen";
  } else if (score >= 0.5) {
    return "yellow";
  } else {
    return "orange";
  }
}

function drawRect(
  detections: DetectedObject[],
  context: CanvasRenderingContext2D
) {
  detections.forEach((predication) => {
    const [x, y, width, height] = predication.bbox;

    const boxColor = getColor(predication.score);

    const score = (predication.score * 100).toFixed(2) + "%";
    const label = predication.class.toUpperCase() + " - " + score;

    // padding settings
    const paddingX = 10; // Horizontal padding for the label background
    const paddingY = 5; // Vertical padding for the label background

    // draw bounding box
    context.font = "16px Arial";
    context.strokeStyle = boxColor;
    context.lineWidth = 3;
    context.strokeRect(x, y, width, height);

    // draw label bg
    context.fillStyle = boxColor;
    const textW = context.measureText(label).width;
    context.fillRect(x, y, textW, -16);
    context.fillRect(x, y - 16 - paddingY, textW + paddingX * 2, 16 + paddingY);

    // text on top
    context.fillStyle = "black";
    context.fillText(label, x + paddingX, y - paddingY);
  });
}

export default drawRect;
