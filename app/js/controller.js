

export default class Controller {

	constructor(Calculator) {
		this.cacheDom();
		this.bind();
		this.render(0);
		this.calculator = new Calculator();
	}

	cacheDom() {
		this.$main = $(".main");
		this.$int = this.$main.find(".int");
		this.$decimal = this.$main.find("#decimal");
		this.$oper = this.$main.find(".oper");
		this.$clearAll = this.$main.find(".clearall");
		this.$clear = this.$main.find(".clear");
		this.$equal = this.$main.find(".equal");
		this.$screen = this.$main.find(".screen");
	}

	bind() {
		this.$int.click((e) => {
			const number = this.calculator.enterNumber(e.target.innerText); 
			number && this.render(number);
		});
		this.$decimal.click(() => {
			const number = this.calculator.addDecimal();
			number && this.render(number);
		});
		this.$oper.click((e) => {
			const operator = this.calculator.enterOperator(e.target.innerText);
			operator && this.render(operator);
		});
		this.$equal.click(() => {
			const result = this.calculator.calculate();
			result && this.render(result);
		});
		this.$clear.click(() => {
			const clear = this.calculator.clear();
			this.render(clear);
		});
		this.$clearAll.click(() => {
			const clear = this.calculator.clearAll();
			this.render(clear);
		});
	}

	render(value) {
		this.$screen.html(value);
	}
}


