export class Figures {
	constructor(context) {
		this.context = context;

		this.T = [
					[0, 0, 0],
					[1, 1, 1],
					[0, 1, 0]];
	}

	paintFigure(name) {
		this[name].forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0)
				{
					this.context.element.fillStyle = 'red';
					this.context.element.fillRect(x, y, 1, 1);
				}
			});
		});
	}
}