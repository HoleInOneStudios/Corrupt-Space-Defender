class canvas {
  constructor(id, width = 640, height = 360, background_color = "#ffffff") {
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
}

export { canvas };
