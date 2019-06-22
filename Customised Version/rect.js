// Rect Class
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

    set(x, y) {
        this._update(x, y);
    }
};