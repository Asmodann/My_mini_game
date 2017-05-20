function Brick_(canvas) {
    this.ctx = canvas.getContext("2d");
    this.bricks = [];
    this.b_width = 100;
    this.b_height = 20;
    this.brick_row_count = 4;
    this.brick_column_count = 5;
    this.brick_padding = 10;
    this.brick_offset_top = 30;
    this.brick_offset_left = 30;
    this.b_color = "rgb(150,150,150)";
    this.numbers = 0;

    for (var c = 0; c < this.brick_column_count; c++) {
        this.bricks[c] = [];
        for (var r = 0; r < this.brick_row_count; r++) {
            this.bricks[c][r] = { x: 0, y: 0 };
        }
    }
}

Brick_.prototype.draw = function() {
    this.numbers = 0;
    for (var c = 0; c < this.brick_column_count; c++) {
        for (var r = 0; r < this.brick_row_count; r++) {
            var brickX = 85 + (c * (this.b_width + this.brick_padding)) + this.brick_offset_left;
            var brickY = (r * (this.b_height + this.brick_padding)) + this.brick_offset_top;
            this.bricks[c][r].pos_x = brickX;
            this.bricks[c][r].pos_y = brickY;
            this.numbers += 1;
            if (this.bricks[c][r].status === undefined) {
                this.bricks[c][r].status = true;
            }
            if (this.bricks[c][r].status === true) {
                this.ctx.beginPath();
                this.ctx.rect(brickX, brickY, this.b_width, this.b_height);
                this.ctx.fillStyle = this.b_color;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}

Brick_.prototype.getNumber = function() { return this.numbers; }