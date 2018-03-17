export class UIController {
	constructor (context) {
		this.context = context;
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
			if (this.context.figures.offsetX !== 0)
				this.context.figures.offsetX--;
		}
	}

	rightArrow(e) {
		if (e.keyCode === 39)
		{
			if (this.context.figures[this.context.figures.currentName][0].length + this.context.figures.offsetX < this.context.field[0].length)
				this.context.figures.offsetX++;
		}
	}

	downArrow(e) {
		if (e.keyCode === 40)
			this.context.figures.offsetY++;	
	}
}