export class Figures {
	constructor(context) {
		this.context = context;
		this.offsetX = 5;
		this.offsetY = 0;
		this.currentName = 'T';

		this.T = [
					[0, 0, 0],
					[1, 1, 1],
					[0, 1, 0]
		];

		this.Z = [
					[2, 2, 0],
					[0, 2, 2],
					[0, 0, 0]
		];

		this.S = [
					[0, 3, 3],
					[3, 3, 0],
					[0, 0, 0]
		];

		this.I = [
					[0, 4, 0, 0],
					[0, 4, 0, 0],
					[0, 4, 0, 0],
					[0, 4, 0, 0]
		];

		this.J = [
					[0, 5, 0],
					[0, 5, 0],
					[5, 5, 0]
		];

		this.O = [
					[6, 6],
					[6, 6]
		];

		this.L = [
					[0, 7, 0],
					[0, 7, 0],
					[0, 7, 7]
		];


		this.figureList = 'TZSIJOL';
		this.colors = ['black', '#de0000', '#de7c0b', '#06bb06', '#cd1ecd', 'yellow', '#ec5ea2', 'cyan'];
		this.randomFigure();
	}

	randomFigure() {
		this.currentName = this.figureList[Math.ceil(Math.random() * this.figureList.length) - 1];
		this.currentFigure = this[this.currentName].slice();
	}

	resetCoordinates() {
		this.offsetX = 5;
		this.offsetY = 0;
	}

	collideField(y, x, element) {
		if (element !== 0 &&
			y + this.offsetY === this.context.field.length - 1)
			return true;
	}

	collideFigure(y, x, element) {
		if (element !== 0 &&
			this.context.field[y + this.offsetY + 1][x + this.offsetX] !== 0)
			return true;
	}

	paintFigure() {
		this.currentFigure.forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0)
				{
					this.context.element.fillStyle = this.colors[this.figureList.indexOf(this.currentName) + 1];
					this.context.element.fillRect(	x + this.offsetX, 
													y + this.offsetY, 
													1, 1);
				}

				if (this.offsetY === 0 && this.collideFigure(y, x, element))
					this.context.replay();
			});
		});
	}

	collideChecker() {
		this.currentFigure.forEach((row, y) => {
			row.forEach((element, x) => {
				if (this.collideField(y, x, element) || this.collideFigure(y, x, element))
				{
					this.context.fillField();
					this.randomFigure();
					this.resetCoordinates();
				}
			});
		});
	}
}