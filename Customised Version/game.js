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

// Keys Pressed
var leftPressed = false;
var rightPressed = false;

// Score
var score = 0;

// Lives
var lives = 3;


// Listen for keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

// Draw score
function draw_score() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Draw lives
function draw_lives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Collision Detection
function collision() {
    if (ball.rect.left < 0 || ball.rect.right > canvas.width) {
        // Ball & Left+Right walls
        ball.xVel *= -1
    } else if (ball.rect.top < 0) {
        // Ball & Top wall
        ball.yVel *= -1
    } else if (ball.rect.bottom > canvas.height) {
        // Ball & Bottom Wall
        ball.yVel *= -1
        lives--
        reset_ball()
    }

    // Paddle & Walls
    if (rightPressed && paddle.rect.x < canvas.width - paddle.rect.w) {
        paddle.xVel = 7;
    }
    else if (leftPressed && paddle.rect.x > 0) {
        paddle.xVel = -7;
    }
    else {
        paddle.xVel = 0;
    }

    // Ball & Paddle
    if (rect_collision(ball, paddle)) {
        if (ball.rect.centerY < paddle.rect.top || ball.rect.centerY > paddle.rect.bottom) {
            // Top & Bottom sides
            ball.yVel *= -1;
        }
        if (ball.rect.centerX < paddle.rect.left || ball.rect.centerX > paddle.rect.right) {
            // Left & Right sides
            ball.xVel *= -1;
        }
    }

    // Ball and Bricks
    for (var i = 0; i < bricks.length; i++) {
        if (bricks[i].exist) {
            if (rect_collision(ball, bricks[i])) {
                if (ball.rect.centerY < bricks[i].rect.top || ball.rect.centerY > bricks[i].rect.bottom) {
                    // Top & Bottom sides
                    ball.yVel *= -1;
                }
                if (ball.rect.centerX < bricks[i].rect.left || ball.rect.centerX > bricks[i].rect.right) {
                    // Left & Right sides
                    ball.xVel *= -1;
                }
                bricks[i].exist = false;
                return;
            }
        }
    }
}

function reset_ball() {
    ball.rect.set(240, 240);
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

var ball = new Ball(240, 240, 10, -1, -1);
var bricks = get_brick_grid(20, 20, 5, 10, 75, 20, 10, 10);
var paddle = new Paddle((canvas.width - 30) / 2, 360, 75, 10);

// Draw Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw_score();
    draw_lives();

    collision();

    // Move Paddle
    /* Cheat Code
    if (paddleX + (paddleWidth / 2) < x) {
        paddleXVel = 7;
    }
    else if (paddleX + (paddleWidth / 2) > x) {
        paddleXVel = -7;
    }
    */

    paddle.display(ctx);
    paddle.move();

    ball.display(ctx)
    ball.move()

    for (var i = 0; i < bricks.length; i++) {
        if (bricks[i].exist) {
            bricks[i].display(ctx);
        }
    }

    requestAnimationFrame(draw);
}

draw();