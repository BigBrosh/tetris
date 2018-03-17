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

	drawField() {
		this.field.forEach((row, y) => {
			row.forEach((element, x) => {
				if (element != 0)
				{
					this.element.fillStyle = 'red';
					this.element.fillRect(x, y, 1, 1);
				}

				else
				{
					this.element.fillStyle = 'black';
					this.element.fillRect(x, y, 1, 1);
				}
			})
		})
	}

	fillField(name) {
		this.figures[name].forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0)
				{
					this.field[y + this.figures.offsetY][x + this.figures.offsetX] = element;
				}
			});
		});
	}

	drawFigure(time = 0) {	
		this.drawField();
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