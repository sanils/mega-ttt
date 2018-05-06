class Game {
	constructor() {
		this.board_ = new MegaBoard();
		this.players_ = ['x', 'o'];
		this.currentPlayer_ = 0;
	}

	reset_() {
		this.board_.reset();
		this.currentPlayer_ = 0;
		this.updateStatus_();
	}

	initClickHandlers() {
		const reset = document.getElementById('restart');
		const status = document.getElementById('status');
		if (reset == null || status == null) {
			throw new Error('Incorrect DOM setup');
		}
		reset.onclick = () => this.reset_();
		for (let i = 0; i < 9; i++) {
			const table = document.getElementById('lgame' + i);
			if (!table) {
				throw new Error('Incorrect DOM setup');
			}
			const cells = table.getElementsByTagName('td');
			if (cells.length != 9) {
				throw new Error('Incorrect DOM setup');	
			}
			for (let j = 0; j < 9; j++) {
				const cell = cells[j];
				cell.onclick = () => this.handleClick_(i, j);
			}
		}
		this.reset_();
	}

	handleClick_(i, j) {
		this.attemptMove_(Math.floor(i/3), i%3, Math.floor(j/3), j%3);
		this.updateStatus_();
	}

	attemptMove_(x1, y1, x2, y2) {
		const player = this.players_[this.currentPlayer_]; 
		if (this.board_.isGameOver()) {
			return;
		}
		if (this.board_.move(x1, y1, x2, y2, player)) {
			this.currentPlayer_ = 1 - this.currentPlayer_;
		}
	}

	updateStatus_() {
		const status = document.getElementById('status');
		if (this.board_.hasWon('x')) {
			status.innerHTML = 'Player 1 wins!';
		} else if (this.board_.hasWon('o')) {
			status.innerHTML = 'Player 2 wins!';
		} else if (this.board_.isGameOver()) {
			status.innerHTML = 'Game ended in a tie!';
		} else {
			status.innerHTML = 'Player ' + (this.currentPlayer_ + 1) + ' turn!';
		}
	}
}
