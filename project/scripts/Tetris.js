import '../../css/main.css';
import {Figures} from './Figures.js';
import {UIController} from './UIController.js';

class Tetris {
	constructor(parent) {
		this.context = this;
		this.wrap = document.querySelector(`.tetris${parent}`);
		this.wrap.width = 240;
		this.wrap.height = 400;
		this.element = this.wrap.getContext('2d');
		this.element.scale(20, 20);
		this.element.fillStyle = '#000';
		this.element.fillRect(0, 0, this.wrap.width, this.wrap.height);

		this.field = [
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

		this.figures = new Figures(this.context);
		this.UIController = new UIController(this.context);
		this.figures.paintFigure('T');

		this.deltaTime = 0;
		this.lastTime = 0;
		this.dropCounter = 0;
		this.dropTime = 1200;
		this.drawFigure();
	}

	drawFigure(time = 0) {	
		this.element.fillStyle = '#000';
		this.element.fillRect(0, 0, this.wrap.width, this.wrap.height);		
		this.figures.paintFigure('T');

		this.deltaTime = time - this.lastTime;
		this.dropCounter += this.deltaTime;
		this.lastTime = time;

		if (this.dropCounter > this.dropTime)
		{
			this.dropCounter = 0;
			this.figures.offsetY++;			
		}

		requestAnimationFrame(this.drawFigure.bind(this));
	}
}

let tetris = new Tetris('.first');