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
		this.figures.paintFigure();

		this.deltaTime = 0;
		this.lastTime = 0;
		this.dropCounter = 0;
		this.dropTime = 1200;

		this.score = 0;
		this.scoreWrap = document.querySelector(`.tetris${parent}_score`);
		this.showScore();
		this.drawFigure();
	}

	drawField() {
		this.field.forEach((row, y) => {
			row.forEach((element, x) => {
					this.element.fillStyle = this.figures.colors[element];
					this.element.fillRect(x, y, 1, 1);
			})
		})
	}

	fillField() {
		this.figures.currentFigure.forEach((row, y) => {
			row.forEach((element, x) => {
				if (element !== 0)
				{
					this.field[y + this.figures.offsetY][x + this.figures.offsetX] = element;
				}
			});
		});
	}

	lineChecker() {
		this.field.forEach((row, y) => {
			if (row.indexOf(0) === -1)
			{
				this.field.splice(y, 1);
				this.field.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
				this.increaseScore();
			}				
		});
	}

	drawFigure(time = 0) {
		this.lineChecker();
		this.drawField();
		this.figures.paintFigure(this.figures.currentFigure);
		this.showScore();

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

	showScore() {
		this.scoreWrap.innerHTML = `Your score: ${this.score}`;
	}

	increaseScore() {
		this.score += 10;
	}

	resetScore() {
		this.score = 0;
	}
}

let tetris = new Tetris('.first');