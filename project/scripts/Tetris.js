import '../../css/main.css';

class Tetris {
	constructor(parent) {
		this.wrap = document.querySelector(`.tetris${parent}`);
		this.wrap.width = 200;
		this.wrap.height = 400;
		this.element = this.wrap.getContext('2d');
		this.element.fillColor = '#000';
		this.element.fillRect(0, 0, this.wrap.width, this.wrap.height);
	}
}

let tetris = new Tetris('.first');