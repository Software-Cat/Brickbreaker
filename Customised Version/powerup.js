powerTypes = [
    "bigPaddle",
    "lazer",
    "bigBall",
    "multiBall"
]

// PowerUp Class
class PowerUp {
    constructor(x, y, r, type, xVel, yVel, rgba = [20, 145, 245, 100]) {
        this.rect = new Rect(x, y, 2 * r, 2 * r);
        this.radius = r;
        this.type = type;
        this.xVel = xVel;
        this.yVel = yVel;
        this.rgba = rgba;
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