import '../../css/main.css';
import {Figures} from './Figures.js';
import {UIController} from './UIController.js';

class Tetris {
	constructor(parent) {
		this.context = this;
		this.wrapName = `.tetris_wrap${parent}`;
		this.wrap = document.querySelector(`${this.wrapName} .tetris`);
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

		this.deltaTime = 0;
		this.lastTime = 0;
		this.dropCounter = 0;
		this.dropTime = 1200;

		this.getHighScore();
		this.score = 0;
		this.scoreWrap = document.querySelector(`${this.wrapName} .tetris_score`);
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
		this.scoreWrap.innerHTML = `High score: ${this.highScore > this.score ? this.highScore : this.score}<br/>Your score: ${this.score}`;
	}

	getHighScore() {
		if (localStorage.getItem('highscore'))
			this.highScore = JSON.parse(localStorage.getItem('highscore'));

		else
			this.highScore = 0;
	}

	setHighScore() {
		localStorage.setItem('highscore', JSON.stringify(this.highScore));
	}

	increaseScore() {
		this.score += 10;

		if (this.score > this.highScore)
		{
			this.highScore = this.score;
			this.setHighScore();
		}
	}

	resetScore() {
		this.score = 0;
		this.showScore();
	}

	replay() {
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

		this.resetScore();
		this.figures.resetCoordinates();
		this.figures.randomFigure();
		this.drawFigure();
	}
}

let tetris = new Tetris('.first');