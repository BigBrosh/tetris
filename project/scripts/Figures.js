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

		this.figureList = 'TZ';
		this.colors = ['black', 'red', 'orange'];
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

				if (y + this.offsetY + 1 === this.context.field.length || this.context.field[y + this.offsetY + 1][x + this.offsetX] !== 0 && element !== 0)
				{
					this.context.fillField();
					this.randomFigure();
					this.resetCoordinates();
				}
			});
		});
	}
}