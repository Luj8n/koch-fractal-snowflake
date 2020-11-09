let segments = [];
let horizontalMargin = 100;
let topMargin = 250;

function setup() {
  L.setCanvasSize(900, 900);
  L.centerCanvas();
  L.frameRate(1000);

  let a = L.createVector2D(horizontalMargin, topMargin);
  let b = L.createVector2D(L.width - horizontalMargin, topMargin);
  let l = L.dist(a.x, a.y, b.x, b.y);
  let c = L.createVector2D((a.x + b.x) / 2, (Math.sqrt(3) * l) / 2 + topMargin);
  segments.push(new Segment(a, b));
  segments.push(new Segment(b, c));
  segments.push(new Segment(c, a));
}

function divide() {
  let newSegments = [];
  segments.forEach((segment) => {
    let children = segment.generate();
    newSegments = [...newSegments, ...children];
  });
  segments = newSegments;
}

addEventListener("keydown", (e) => {
  if (e.key == " " && !e.repeat) {
    divide();
  }
});

addEventListener("mousedown", startDrag);
addEventListener("mouseup", endDrag);
addEventListener("wheel", zoom);

let draging = false;
let offsetX = 0;
let offsetY = 0;
let prevX = 0;
let prevY = 0;

function startDrag(e) {
  L.mouseX = e.clientX;
  L.mouseY = e.clientY;
  draging = true;
}

function endDrag(e) {
  draging = false;
}

function zoom(e) {
  scale -= e.deltaY * 0.001 * scale;
}

let scale = 1;

function draw() {
  L.background("black");

  L.scale(scale);
  if (draging) {
    offsetX += (L.mouseX - prevX) / scale;
    offsetY += (L.mouseY - prevY) / scale;
  }
  prevX = L.mouseX;
  prevY = L.mouseY;

  L.translate(offsetX, offsetY);
  
  segments.forEach((segment) => {
    segment.show();
  });
}
