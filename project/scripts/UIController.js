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
			this.rotateFigure(0)
	}

	rotateRight(e) {
		if (e.keyCode === 69)
			this.rotateFigure(1)
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
}