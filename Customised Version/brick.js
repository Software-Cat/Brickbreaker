// Brick Class
class Brick {
    constructor(x, y, w, h, rgba = [25, 155, 255, 100], exist = true) {
        this.rect = new Rect(x, y, w, h);
        this.rgba = rgba;
        this.exist = exist;
    }

    display(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        canvasCtx.fillStyle = `rgba(${this.rgba[0]}, ${this.rgba[1]}, ${this.rgba[2]}, ${this.rgba[3]})`;
        canvasCtx.fill();
        canvasCtx.closePath();
    }
}

function get_brick_grid(x, y, rows, columns, brickW, brickH, xPadding, yPadding) {
    bricks = []
    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            var currentX = x + row * brickW + row * xPadding;
            var currentY = y + column * brickH + column * yPadding;
            bricks.push(new Brick(currentX, currentY, brickW, brickH))
        }
    }
    return bricks
}