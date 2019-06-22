// Paddle Class
class Paddle {
    constructor(x, y, w, h, rgba = [25, 155, 255, 100]) {
        this.rect = new Rect(x, y, w, h);
        this.rgba = rgba;
        this.xVel = 0;
    }

    display(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        canvasCtx.fillStyle = `rgba(${this.rgba[0]}, ${this.rgba[1]}, ${this.rgba[2]}, ${this.rgba[3]})`;
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    move() {
        this.rect.move(this.xVel, 0)
    }
}