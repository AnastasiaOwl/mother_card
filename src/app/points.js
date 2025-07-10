import fs from "fs";
import opentype from "opentype.js";
import { svgPathProperties } from "svg-path-properties";

const FONT_PATH = '../app/fonts/Adine_Kirnberg_Regular.ttf';
const TEXT = 'Мамочка, дякую що ти є!';
const FONT_SIZE = 150;
const WIDTH = 1200;
const HEIGHT = 1200; 
const DOT_COUNT = 1000;

opentype.load(FONT_PATH, (err, font) => {
  if (err) throw err;

  const textPath = font.getPath(TEXT, 0, FONT_SIZE, FONT_SIZE);
  const bounds = textPath.getBoundingBox();

  const offsetX = WIDTH / 2 - (bounds.x1 + bounds.x2) / 2;

  const offsetY = (HEIGHT / 2 - (bounds.y1 + bounds.y2) / 2) - 330;

  const centeredPath = font.getPath(
    TEXT,
    offsetX - bounds.x1,
    offsetY - bounds.y1,
    FONT_SIZE
  );

  const svgPathData = centeredPath.toPathData(2);

  const properties = new svgPathProperties(svgPathData);
  const totalLength = properties.getTotalLength();

  const points = [];
  for (let i = 0; i < DOT_COUNT; i++) {
    const { x, y } = properties.getPointAtLength((totalLength * i) / DOT_COUNT);
    points.push({ x, y });
  }

  fs.writeFileSync('./particle-points.json', JSON.stringify(points, null, 2));
  console.log('✅ particle-points.json saved with', points.length, 'points!');
});
