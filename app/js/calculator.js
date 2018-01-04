
export default class Calculator {
	constructor() {
		this.firstNum = "";
		this.secondNum = "";
		this.operator = "";
		this.operations = {
			"+": (a, b) => ((a * 10000) + (b * 10000))/10000,
			"-": (a, b) => ((a * 10000) - (b * 10000))/10000,
			"*": (a,b) => ((a * 10000) * (b * 10000))/(Math.pow(10,8)),
			"/": (a,b) => (a / b)
		};
	}

	enterNumber(val) {
		if(this.operator) {
			this.secondNum += val;
			return this.secondNum;
		} else {
			this.firstNum += val;
			return this.firstNum;
		}
	}


	addDecimal() {
		if(this.operator && this.secondNum.indexOf(".") === -1) {
			this.secondNum += ".";
			return this.secondNum;
		} else if(!this.operator && this.firstNum.indexOf(".") === -1) {
			this.firstNum += ".";
			return this.firstNum;
		} else {
			return null;
		}
	}

	enterOperator(val) {
		//Return early if we don't have a valid first value
		if(this.firstNum === "" || this.firstNum === ".") return null;
		if(!this.secondNum && !this.operator) {
			this.operator = val;
			return this.operator;
		} else if(this.secondNum !== "" && this.secondNum !== ".") {
			const result = this.calculate();
			this.operator = val;
			return result;
		}
		return null;
	}


	calculate() {
		if(this.firstNum && this.firstNum !== "." && this.secondNum && this.secondNum !== "." && this.operator) {
			this.firstNum = this.operations[this.operator](this.firstNum, this.secondNum).toString();
			this.operator = "";
			this.secondNum = "";
			return this.firstNum;
		}
		return null;
	}


	clear() {
		if(this.secondNum) {
			this.secondNum = "";
		} else if(this.operator) {
			this.operator = "";
		} else {
			this.firstNum = "";
		}
		return 0;

	}

	clearAll() {
		this.firstNum = "";
		this.secondNum = "";
		this.operator = "";
		return 0;
	}  
}







