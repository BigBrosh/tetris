export class UIController {
	constructor (context) {
		this.context = context;
		this.figures = this.context.figures;

		document.addEventListener('keydown', e => {
			this.arrowControl(e);
		});
	}

	arrowControl(e) {
		this.leftArrow(e);
		this.rightArrow(e);
		this.downArrow(e);
	}

	leftArrow(e) {
		if (e.keyCode === 37)
		{
			if (this.figures.offsetX !== 0 &&
				this.leftSideChecker())
				this.figures.offsetX--;
		}
	}

	rightArrow(e) {
		if (e.keyCode === 39)
		{
			if (this.rightSideChecker())
				this.figures.offsetX++;
		}
	}

	leftSideChecker() {
		for (let row = 0; row < this.figures[this.figures.currentName].length; row++) {
			if (this.figures[this.figures.currentName][row][0] !== 0 &&
				this.context.field[row + this.figures.offsetY][this.figures.offsetX - 1] !== 0)
				return false;
		}
		return true;
	}

	rightSideChecker() {
		let checker = true;

		this.figures.currentFigure.forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0 && this.context.field[y + this.figures.offsetY][x + this.figures.offsetX + 1] !== 0 ||
					element !== 0 && this.context.field[y + this.figures.offsetY][x + this.figures.offsetX + 1] === undefined)
				{
					checker = false;
					return checker;
				}
			});
		});

		return checker;
	}

	downArrow(e) {
		if (e.keyCode === 40)
			this.figures.offsetY++;	
	}
}