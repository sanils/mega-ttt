class MegaBoard {
	constructor() {
		this.board_ = [
			[new Board('lgame0'), new Board('lgame1'), new Board('lgame2')], 
			[new Board('lgame3'), new Board('lgame4'), new Board('lgame5')], 
			[new Board('lgame6'), new Board('lgame7'), new Board('lgame8')]
		];
		this.lastX_ = -1;
		this.lastY_ = -1;
	}

	reset() {
		for (let r = 0; r < this.board_.length; r++) {
			for (let c = 0; c < this.board_[r].length; c++) {
				this.board_[r][c].reset();
				this.board_[r][c].setActive(true);
			}
		}
		this.lastX_ = -1;
		this.lastY_ = -1;
	}

	move(x1, y1, x2, y2, player) {
		if (this.lastX_ != -1 && this.lastY_ != -1) {
			if (x1 != this.lastX_ || y1 != this.lastY_) {
				return false;
			}
		}
		if (this.board_[x1][y1].move(x2, y2, player)) {
			if (!this.board_[x2][y2].isGameOver()) {
				this.lastX_ = x2;
				this.lastY_ = y2;
			} else {
				this.lastX_ = -1;
				this.lastY_ = -1;
			}
			this.updateActive_();
			return true;
		}
		return false;
	}

	isGameOver() {
		if (this.hasWon('x') || this.hasWon('o')) {
			return true;
		}
		for (let r = 0; r < this.board_.length; r++) {
			for (let c = 0; c < this.board_[r].length; c++) {
				if(!this.board_[r][c].isGameOver()) {
					return false;
				}
			}
		}
		return true;
	}

	updateActive_() {
		for (let r = 0; r < this.board_.length; r++) {
			for (let c = 0; c < this.board_[r].length; c++) {
				const gameOver = this.board_[r][c].isGameOver();
				this.board_[r][c].setActive(!gameOver);
			}
		}
		if (this.lastX_ == -1 && this.lastY_ == -1) {
			return;
		}
		for (let r = 0; r < this.board_.length; r++) {
			for (let c = 0; c < this.board_[r].length; c++) {
				if (r != this.lastX_ || c != this.lastY_) {
					this.board_[r][c].setActive(false);
				}
			}
		}
	}

	hasWon(p) {
		const winningPositions = [ 
			[[0, 0], [0, 1], [0, 2]],
			[[1, 0], [1, 1], [1, 2]],
			[[2, 0], [2, 1], [2, 2]],
			[[0, 0], [1, 0], [2, 0]],
			[[0, 1], [1, 1], [2, 1]],
			[[0, 2], [1, 2], [2, 2]],
			[[0, 0], [1, 1], [2, 2]],
			[[0, 2], [1, 1], [2, 0]]
		];
		return winningPositions.some((winningPosition) => {
			return winningPosition.every((pos) => {
				return this.board_[pos[0]][pos[1]].hasWon(p);
			});
		});
	}
}
