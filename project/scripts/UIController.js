export class UIController {
	constructor (context) {
		this.context = context;
		document.addEventListener('keydown', e => {
			this.arrowControll(e);
		});
	}

	arrowControll(e) {
		this.leftArrow(e);
		this.rightArrow(e);
	}

	leftArrow(e) {
		if (e.keyCode === 37)
			this.context.figures.offsetX--;
	}

	rightArrow(e) {
		if (e.keyCode === 39)
			this.context.figures.offsetX++;
	}
}