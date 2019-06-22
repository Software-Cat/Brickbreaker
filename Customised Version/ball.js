// Ball Class
class Ball {
    constructor(x, y, r, xVel, yVel, rgba=[25, 165, 255, 100]) {
        this.radius = r;
        this.xVel = xVel;
        this.yVel = yVel;
        this.rect = new Rect(x, y, 2 * r, 2 * r);
        this.rgba = rgba
    }

    display(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.arc(this.rect.centerX, this.rect.centerY, this.radius, 0, Math.PI * 2);
        canvasCtx.fillStyle = `rgba(${this.rgba[0]}, ${this.rgba[1]}, ${this.rgba[2]}, ${this.rgba[3]})`;
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    move() {
        this.rect.move(this.xVel, this.yVel);
    }
}