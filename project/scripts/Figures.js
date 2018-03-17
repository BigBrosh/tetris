export class Figures {
	constructor(context) {
		this.context = context;
		this.offsetX = 5;
		this.offsetY = 0;

		this.T = [
					[0, 0, 0],
					[1, 1, 1],
					[0, 1, 0]
		];
	}

	resetCoordinates() {
		this.offsetX = 5;
		this.offsetY = 0;
	}

	paintFigure(name) {
		this[name].forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0)
				{
					this.context.element.fillStyle = 'red';
					this.context.element.fillRect(	x + this.offsetX, 
													y + this.offsetY, 
													1, 1);
				}

				if (y + this.offsetY + 1 === this.context.field.length || this.context.field[y + this.offsetY + 1][x + this.offsetX] !== 0 && element !== 0)
				{
					this.context.fillField(name);
					this.resetCoordinates();
				}
			});
		});
	}
}