import '../../css/main.css';
import {Figures} from './Figures.js';

class Tetris {
	constructor(parent) {
		this.wrap = document.querySelector(`.tetris${parent}`);
		this.wrap.width = 200;
		this.wrap.height = 400;
		this.element = this.wrap.getContext('2d');
		this.element.scale(20, 20);
		this.element.fillStyle = '#000';
		this.element.fillRect(0, 0, this.wrap.width, this.wrap.height);
		this.context = this;

		this.figures = new Figures(this.context);
		this.figures.paintFigure('T');
	}
}

let tetris = new Tetris('.first');