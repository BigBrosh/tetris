export class UIController {
	constructor (context) {
		this.context = context;
		this.figures = this.context.figures;
		
		this.menu = document.querySelector(`${this.context.wrapName} .menu_inner`);
		this.menuButton = document.querySelector(`${this.context.wrapName} .menu_button`);
		this.replayButton = document.querySelector(`${this.context.wrapName} .replay`);
		this.resetScoreButton = document.querySelector(`${this.context.wrapName} .reset_score`);

		this.menuButton.addEventListener('click', () => {
			this.menuButtonEvent();
		})

		this.replayButton.addEventListener('click', () => {
			this.context.replay();
			this.menuButton.click();
		})

		this.resetScoreButton.addEventListener('click', () => {
			this.context.resetHighScore();
			this.menuButton.click();
		})

		document.addEventListener('keydown', e => {
			this.arrowControl(e);
		});
	}

	arrowControl(e) {
		this.leftArrow(e);
		this.rightArrow(e);
		this.downArrow(e);
		this.rotateLeft(e);
		this.rotateRight(e);
	}

	leftArrow(e) {
		if (e.keyCode === 37 && this.sideChecker(-1))
			this.figures.offsetX--;
	}

	rightArrow(e) {
		if (e.keyCode === 39 && this.sideChecker(1))
			this.figures.offsetX++;
	}

	downArrow(e) {
		if (e.keyCode === 40)
			this.figures.offsetY++;	
	}

	rotateLeft(e) {
		if (e.keyCode === 81)
		{
			this.rotateFigure(0);
			this.rotateChecker();
		}
	}

	rotateRight(e) {
		if (e.keyCode === 69)
		{
			this.rotateFigure(1);
			this.rotateChecker();
		}
	}

	sideChecker(side) {
		let checker = true;

		this.figures.currentFigure.forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0 && this.context.field[y + this.figures.offsetY][x + this.figures.offsetX + side] !== 0 ||
					element !== 0 && this.context.field[y + this.figures.offsetY][x + this.figures.offsetX + side] === undefined)
				{
					checker = false;
					return checker;
				}
			});
		});

		return checker;
	}

	rotateFigure(direction) {
		let figure = this.figures.currentFigure;

		for (let y = 0; y < figure.length; ++y) {
			for (let x = 0; x < y; ++x) {
				[
					figure[y][x],
					figure[x][y]
				] = [
					figure[x][y],
					figure[y][x]
				]
			}
		}

		if (direction === 1)
		{
			figure.forEach((row) => {
				row.reverse();
			})
		}

		else if (direction === 0)
		{
			figure.reverse();
		}
	}

	rotateChecker() {	
		if(!this.sideChecker(-1))
			this.figures.offsetX++;

		else if(!this.sideChecker(1))
			this.figures.offsetX--;
	}

	menuButtonEvent() {
		this.menu.classList.toggle('active');

		if (this.menu.classList.contains('active'))
			this.context.drawingChecker = false;
		else if (!this.menu.classList.contains('active'))
		{
			this.context.drawingChecker = true;
			this.context.drawFigure();
		}
	}
}