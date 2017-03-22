export default class Computer {
	constructor(view) {
		this.view = view;
		this.input = [];
		this.currentNum = "";
		this.currentOper = "";
		this.operations = {

			"+": (a, b) => {
				return (a + b)/10000; 
			},

			"-": (a, b) => {
				return (a - b)/10000; 
			}, 

			"*": (a,b) => {
				return (a * b)/(Math.pow(10,8));
			},

			"/": (a,b) => {
				return (a / b);
			}
		};
	}

	pushCurrentNum() {
		this.input.push(this.currentNum * 10000);
		this.currentNum = "";
	}

	pushCurrentOper() {
		this.input.push(this.currentOper);
	}

	timeForOperator() {
		if((!this.currentNum && !this.input.length) || this.currentNum === ".") {
			return false;
		} 
		return true;
	}

	firstEntry() {
		if(this.input.length === 0 && this.isValidNumber(this.currentNum)) {
			return true;
		}
		return false;
	}

	secondEntry() {
		if(this.input.length === 2 && this.isValidNumber(this.currentNum)) {
			return true;
		}
		return false;
	}

	hasResult() {
		if(this.input.length === 1 && typeof this.input[0] === "number") {
			return true;
		}
		return false;
	}

	calculate(arr) {
		if(arr.length === 3) {
			this.currentNum = this.operations[arr[1]](arr[0], arr[2]);
			this.input = [];
			this.view.render(this.currentNum);
			this.pushCurrentNum();
		}
	}

	isValidNumber(num) {
		if(num !== "" && num !== ".") {
			return true;
		}
		return false;
	}

	number(val) {
		var number = val;
		if(this.hasResult()) {
			this.input = [];
		}
		this.currentNum += number;
		this.view.render(this.currentNum);
	}


	decimal() {
		if(this.currentNum.indexOf(".") === -1) {
			this.currentNum += ".";
			this.view.render(this.currentNum);
		}
	}

	operator(val) {
		if(this.timeForOperator()) {
			this.currentOper = val;
			if(this.firstEntry() || this.secondEntry()) {
				this.pushCurrentNum();
				this.view.render(this.currentOper);
				this.calculate(this.input);
				this.pushCurrentOper();     
			} else if(this.hasResult()) {
				this.pushCurrentOper();
				this.view.render(this.currentOper);
			}
		}
	}

	equals() {
		if(this.secondEntry()) {
			this.pushCurrentNum();
			this.calculate(this.input);
		}
	}

	clear() {
		this.currentNum = "";
		this.view.render(0);
	}

	clearAll() {
		this.currentNum = "";
		this.currentOper = "";
		this.input = [];
		this.view.render(0);
	}  
}







