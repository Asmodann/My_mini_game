function Player_(name, canvas) {
	this.p_width = 100;
	this.p_height = 15;
	this.direction = {"LEFT": 37, "RIGHT": 39};
	this.movespeed = 25.0;
	this.p_color = "rgb(50,240,75)";
	this.lives = 3;
	this.is_alive = true;
	this.won = false;
	this.score = 0;

	this.name = name;
	this.ctx = canvas.getContext("2d");
	this.pos_x = ((canvas.clientWidth + 100) / 2) - (this.p_width / 2);
	this.pos_y = canvas.clientHeight - 50;
}

Player_.prototype.move_keyboard = function(key, canvas) {
	switch (key) {
		case this.direction.LEFT:
			this.pos_x -= this.movespeed;
			if (this.pos_x <= this.p_width) {
				this.pos_x = this.p_width;
			}
			break;
		case this.direction.RIGHT:
			this.pos_x += this.movespeed;
			if (this.pos_x >= canvas.clientWidth - this.p_width) {
				this.pos_x = canvas.clientWidth - this.p_width;
			}
			break;
	}
}

Player_.prototype.draw = function(canvas) {
	this.ctx.beginPath();
	this.ctx.fillStyle = this.p_color;
	this.ctx.fillRect(this.pos_x, this.pos_y, this.p_width, this.p_height);
	this.ctx.closePath();
}

Player_.prototype.gui = function(canvas, Brick) {
	this.ctx.fillStyle = "rgb(0,0,0)";
	this.ctx.fillRect(0, 0, 100, canvas.clientHeight);
	this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "rgb(120,190,145)";
    this.ctx.fillText("Lives: " + this.lives, 8, 20);
    this.ctx.fillText("Score: " + this.score, 8, 40);
    this.ctx.fillStyle = "rgb(75,150,168)";
    this.ctx.fillText("Use arrows", 8, canvas.clientHeight - 20);
    if (!this.lives) {
    	this.ctx.fillStyle = "rgb(255,0,0)";
    	this.ctx.fillText("YOU LOST!!!", canvas.clientWidth / 2, canvas.clientHeight / 2);
    	this.is_alive = false;
    }
    if (Brick.getNumber() === this.score && this.score > 0) {
    	this.ctx.fillStyle = "rgb(0,255,0)";
    	this.ctx.fillText("YOU WON!!!", canvas.clientWidth / 2, canvas.clientHeight / 2);
    	this.won = true;
    }
}

Player_.prototype.getIs_alive = function() { return this.is_alive; }
Player_.prototype.getWon = function() { return this.won; }