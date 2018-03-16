export class UIController {
	constructor (context) {
		this.context = context;
		document.addEventListener('keydown', e => {
			this.leftArrow(e);
		});
	}

	leftArrow(e) {
		if (e.keyCode === 37)
		{
			this.context.figures.offsetX--;
			console.log(this.context.figures.offsetX);
		}
	}
}