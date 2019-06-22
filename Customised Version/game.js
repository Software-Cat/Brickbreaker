// Rect constructor
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;

        this.top = y;
        this.left = x;
        this.bottom = y + h;
        this.right = x + w;

        this.topLeft = [this.left, this.top];
        this.bottomLeft = [this.left, this.bottom];
        this.topRight = [this.right, this.top];
        this.bottomRight = [this.right, this.bottom];

        this.centerX = x + w / 2;
        this.centerY = y + h / 2;
        this.center = [this.centerX, this.centerY];

        this.midTop = [this.centerX, this.top];
        this.midLeft = [this.left, this.centerY];
        this.midBottom = [this.centerX, this.bottom];
        this.midRight = [this.right, this.centerY];
    };

    _update(x = this.x, y = this.y, w = this.w, h = this.h) {
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;

        this.top = y;
        this.left = x;
        this.bottom = y + h;
        this.right = x + w;

        this.topLeft = [this.left, this.top];
        this.bottomLeft = [this.left, this.bottom];
        this.topRight = [this.right, this.top];
        this.bottomRight = [this.right, this.bottom];

        this.centerX = x + w / 2;
        this.centerY = y + h / 2;
        this.center = [this.centerX, this.centerY];

        this.midTop = [this.centerX, this.top];
        this.midLeft = [this.left, this.centerY];
        this.midBottom = [this.centerX, this.bottom];
        this.midRight = [this.right, this.centerY];
    };

    move(x, y) {
        let newX = this.x + x;
        let newY = this.y + y;
        this._update(newX, newY);
    };
};

// Ball Constructor
class Ball {
    constructor(x, y, r, xVel, yVel) {
        this.radius = r;
        this.xVel = xVel;
        this.yVel = yVel;
        this.rect = new Rect(x, y, 2 * r, 2 * r);
    }

    display(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.arc(this.rect.centerX, this.rect.centerY, this.radius, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#0095DD";
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    animate() {
        this.rect.move(this.xVel, this.yVel);
    }
}

class Brick {
    constructor(x, y, w, h) {
        this.rect = new Rect(x, y, w, h)
    }

    display(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        canvasCtx.fillStyle = "#0095DD";
        canvasCtx.fill();
        canvasCtx.closePath();
    }
}
// Collision
function rect_collision(obj1, obj2) {
    /*
    Return a bool of whether obj1 intersects with obj2. 
    Intersection is determined by comparing the obj.rect attribute of each object.

    The collided argument is a callback function used to calculate if two objects are colliding. 
    it should take two objects as values, and return a bool value indicating if they are colliding. 
    If collided is not passed, all objects must have a "rect" attribute, 
    which is a rectangle of the object's area used to calculate collision.
    */


    let rectObj1 = obj1.rect;
    let rectObj2 = obj2.rect;

    if (rectObj1.left < rectObj2.right &&
        rectObj1.right > rectObj2.left &&
        rectObj1.top < rectObj2.bottom &&
        rectObj1.bottom > rectObj2.top) {
        // collision detected!
        return true;
    } else {
        // no collision
        return false;
    };


}

// Get Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// Ball Appearance
var ballRadius = 10;

// Ball Pos
var x = canvas.width / 2;
var y = canvas.height - 30;

// Ball Vel
var dx = 2;
var dy = -2;

// Paddle Appearance
var paddleHeight = 10;
var paddleWidth = 75;

// Paddle Pos
var paddleX = (canvas.width - paddleWidth) / 2;

// Paddle Vel
var paddleXVel = 0;

// Keys Pressed
var leftPressed = false;
var rightPressed = false;

// Bricks' Attributes
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Bricks Grid
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Score
var score = 0;

// Lives
var lives = 3;


// Listen for keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// Key down
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }

}
// Key up
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
// Mouse move
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}



// Draw ball
function draw_ball() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw paddle
function draw_paddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw bricks
function draw_bricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draw score
function draw_score() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Draw score
function draw_lives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Collision Detection
function collision() {
    // Ball x walls
    if (x + dy > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Ball top wall
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    // Ball bottom Wall
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                lose();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Paddle walls
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleXVel = 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleXVel = -7;
    }
    else {
        paddleXVel = 0;
    }

    // Ball and Bricks
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        win();
                    }
                }
            }
        }
    }
}

// Game Over
// Losing
function lose() {
    alert("YOU LOSE");
    document.location.reload();
}
// Winning
function win() {
    alert("YOU WIN, CONGRATULATIONS!");
    document.location.reload();
}

var myBall = new Ball(240, 240, 10, 1, 1);
var myBrick = new Brick(240, 240, 10, 10);

// Draw Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw_ball();
    draw_paddle();
    draw_bricks();
    draw_score();
    draw_lives();

    collision();

    // Move ball
    x += dx;
    y += dy;
    // Move Paddle
    /* Cheat Code
    if (paddleX + (paddleWidth / 2) < x) {
        paddleXVel = 7;
    }
    else if (paddleX + (paddleWidth / 2) > x) {
        paddleXVel = -7;
    }
    */
    paddleX += paddleXVel;

    myBall.display(ctx)
    myBall.animate()

    myBrick.display(ctx)
    if (rect_collision(myBall, myBrick)) {
        myBall.xVel *= -1;
        myBall.yVel *= -1;
    }

    requestAnimationFrame(draw);
}

draw();