class Segment {
  constructor(a, b) {
    this.a = a.clone();
    this.b = b.clone();
  }

  generate() {
    let children = [];
    let v = L.Vector2D.sub(this.b, this.a).div(3);

    // Segment 0
    let b1 = L.Vector2D.add(this.a, v);
    children[0] = new Segment(this.a, b1);

    // Segment 3
    let a1 = L.Vector2D.sub(this.b, v);
    children[3] = new Segment(a1, this.b);

    v.rotate(-Math.PI / 3);
    let c = L.Vector2D.add(b1, v);

    // Segment 1
    children[1] = new Segment(b1, c);

    // Segment 2
    children[2] = new Segment(c, a1);

    return children;
  }

  show() {
    L.stroke("white");
    L.strokeWeight(1 / scale);
    L.noFill();

    L.Line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
