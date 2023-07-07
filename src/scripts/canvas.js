class canvas {
  constructor(id, background_color = "#000000", width = 640, height = 360) {
    /** @type {HTMLCanvasElement} */
    this.canvas = document.getElementById(id);
    /** @type {CanvasRenderingContext2D} */
    this.context = this.canvas.getContext("2d");

    this.width = width;
    this.height = height;
    this.background_color = background_color;
  }
  resetContext() {
    this.context.strokeStyle = "#000000";
    this.context.fillStyle = "#ffffff";
    this.context.lineWidth = 1;
  }
  resize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  background() {
    this.context.fillStyle = this.background_color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  mousePosition(event) {
    let rect = this.canvas.getBoundingClientRect();
    let pos = { x: event.clientX, y: event.clientY };

    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  curosrPosition(cursor) {
    let rect = this.canvas.getBoundingClientRect();
    let pos = { x: cursor.x, y: cursor.y };

    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }

  async drawGrid(size = 32) {
    for (let i = 0; i < this.canvas.width; i += size) {
      this.context.beginPath();
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.canvas.height);
      this.context.stroke();
    }

    for (let i = 0; i < this.canvas.height; i += size) {
      this.context.beginPath();
      this.context.moveTo(0, i);
      this.context.lineTo(this.canvas.width, i);
      this.context.stroke();
    }
  }
}

export { canvas };
