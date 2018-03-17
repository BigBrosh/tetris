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
			this.context.figures.offsetX--;
	}

	rightArrow(e) {
		if (e.keyCode === 39)
			this.context.figures.offsetX++;
	}

	downArrow(e) {
		if (e.keyCode === 40)
			this.context.figures.offsetY++;	
	}
}