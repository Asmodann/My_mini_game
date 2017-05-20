function Ball_(canvas) {
	this.b_radius = 10;
	this.movespeed = 5;
	this.dir_x = 1; // < 0 == UP | > 0 == DOWN
	this.dir_y = -1; // < 0 == UP | > 0 == DOWN
	this.b_color = "rgb(230,120,50)";

	this.ctx = canvas.getContext("2d");
	this.pos_x = ((canvas.clientWidth + 100) / 2);
	this.pos_y = canvas.clientHeight - (100 + this.b_radius);
}

Ball_.prototype.move = function(canvas, Player) {
	if (this.pos_y <= this.b_radius) {
		this.pos_y = this.b_radius;
		this.dir_y = 1;
	} else if (this.pos_y >= (canvas.clientHeight - this.b_radius)) {
		this.pos_y = canvas.clientHeight - this.b_radius;
		this.dir_y = -1;
		Player.lives -= 1;
	}

	if (this.pos_x <= (100 + this.b_radius)) {
		this.pos_x = 100 + this.b_radius;
		this.dir_x = 1;
	} else if (this.pos_x >= (canvas.clientWidth - this.b_radius)) {
		this.pos_x = canvas.clientWidth - this.b_radius;
		this.dir_x = -1;
	}

	if ( (this.pos_y === (Player.pos_y - this.b_radius)) && (this.pos_x >= Player.pos_x && this.pos_x <= Player.pos_x + Player.p_width) ) {
		this.pos_y = Player.pos_y - Player.p_height;
		this.dir_y = -1;
	}

	this.pos_y += (this.movespeed * this.dir_y);
	this.pos_x += (this.movespeed * this.dir_x);
}

Ball_.prototype.draw = function(canvas) {
	this.ctx.beginPath();
	this.ctx.moveTo(this.pos_x, this.pos_y);
	this.ctx.arc(this.pos_x, this.pos_y, this.b_radius, 0, Math.PI * 2);
	this.ctx.fillStyle = this.b_color;
	this.ctx.fill();
	this.ctx.closePath();
}

Ball_.prototype.collisionDetection = function(Brick, Player) {
	for (var c = 0; c < Brick.brick_column_count; c++) {
		for (var r = 0; r < Brick.brick_row_count; r++) {
			var b = Brick.bricks[c][r];
			if (b.status === true) {
				if (this.pos_x >= b.pos_x && this.pos_x <= (b.pos_x + Brick.b_width) && this.pos_y >= b.pos_y && this.pos_y <= (b.pos_y + Brick.b_height)) {
					this.dir_y = 1;
					this.pos_y += this.b_radius;
					Player.score += 1;
					Brick.bricks[c][r].status = false;
				}
			}
		}
	}
}

function checkPosition(Player) {
	if (this.pos_y >= (Player.pos_y - this.b_radius)) {
		if (this.pos_x >= Player.pos_x && this.pos_x <= Player.pos_x + Player.p_width) {
			return true;
		}
	}
}

