export class TextScramble2 {
	private readonly chars: string;
	private el: any;
	private out: number;
	private text: string;
	private readonly wait: (ms: number) => unknown;

	constructor(el: Element) {
		this.el = el;
		this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#________';
		this.out = 0;
		this.text = '';
		this.wait = (ms: number): unknown => new Promise((resolve) => setTimeout(resolve, ms));
	}

	async setText(text: string) {
		this.text = text;
		this.el.innerHTML = '<span id="anim"></span><span id="shuffle"></span>';
		await this.addText();
	}

	async addText() {
		const anim = document.getElementById('anim');
		const shuffle = document.getElementById('shuffle');

		if (this.out < this.text.length) {
			let delay = 30;

			if (anim) {
				if ('.,!? '.indexOf(this.text[this.out]) !== -1) delay = 50;
				anim.appendChild(document.createTextNode(this.text[this.out++]));
				if ('.!?'.indexOf(this.text[this.out - 1]) !== -1) {
					// anim.appendChild(document.createElement('br'));
					delay = 120;
				}
			}
			if (shuffle) shuffle.innerText = this.chars[Math.floor(Math.random() * this.chars.length)];

			await this.wait(delay);
			await this.addText();
		} else if (this.out >= this.text.length) {
			if (shuffle) shuffle.innerText = '';
		}
	}
}
