import { expect, assert } from "chai";
import sinon from "sinon";

import Calculator from "../app/js/calculator.js";



describe("CALCULATOR METHODS", function() {
	
	describe("enterNumber", function() {
		const calculator = new Calculator();

		beforeEach(function() {
			calculator.firstNum = "";
			calculator.operator = "";
			calculator.secondNum = "";
		})

		it("should return a string", function() {
			const result1 = calculator.enterNumber(2);
			expect(result1).to.be.a("string")
			
			const result2 = calculator.enterNumber(3);
			expect(result1).to.be.a("string")
			
			calculator.enterOperator("+");
			const result3 = calculator.enterNumber(4);
			expect(result3).to.be.a("string");
			
			calculator.addDecimal();
			const result4 = calculator.enterNumber(7);
			expect(result4).to.be.a("string");
		})

		it("should append val to calculator.firstNum string if no operator is set", function() {
			const firstNum = calculator.firstNum;
			const secondNum = calculator.secondNum;
			calculator.enterNumber(5);
			expect(calculator.firstNum).to.equal(firstNum + "5");
			expect(calculator.secondNum).to.equal(secondNum);
		});

		it("should append val to calculator.secondNum if an operator is set", function() {
			calculator.operator = "+";
			const firstNum = calculator.firstNum;
			const secondNum = calculator.secondNum;
			calculator.enterNumber(4);
			expect(calculator.firstNum).to.equal(firstNum);
			expect(calculator.secondNum).to.equal(secondNum + "4");
		})

		it("should return calculator.firstNum if operator is not defined", function() {
			expect(calculator.addDecimal()).to.equal(calculator.firstNum);
		})

		it("should return calculator.secondNum if operator is defined", function() {
			calculator.operator = "+";
			expect(calculator.addDecimal()).to.equal(calculator.secondNum);
		})
		
	})

	describe("addDecimal", function() {
		const calculator = new Calculator();

		beforeEach(function() {
			calculator.firstNum = "";
			calculator.secondNum = "";
			calculator.operator = "";
		})

		it("should only allow a number to have one decimal", function() {
			calculator.firstNum = "1";
			const num1 = calculator.addDecimal();
			const num2 = calculator.addDecimal();
			expect(num1).to.equal(num2);
		})

		it("should only allow a number to have one decimal", function() {
			calculator.secondNum = "1";
			calculator.operator = "+";
			const num1 = calculator.addDecimal();
			const num2 = calculator.addDecimal();
			expect(num1).to.equal(num2);
		})

		it("should apply the decimal to calculator.firstNum if there is no operator defined and the first number does not already have a decimal", function() {
			calculator.firstNum = "1234";
			const num1 = calculator.firstNum;
			const num2 = calculator.secondNum;
			calculator.addDecimal();
			expect(calculator.firstNum).to.equal(num1 + ".");
			expect(calculator.secondNum).to.equal(num2);
		})

		it("should apply the decimal to calculator.secondNum if an operator is defined", function() {
			calculator.firstNum = "123";
			calculator.operator = "+";
			const num1 = calculator.firstNum;
			const num2 = calculator.secondNum;
			calculator.addDecimal();
			expect(calculator.firstNum).to.equal(num1);
			expect(calculator.secondNum).to.equal(num2 + ".");
		})
	})

	describe("enterOperator", function() {
		const calculator = new Calculator();

		beforeEach(function() {
			calculator.firstNum = "";
			calculator.secondNum = "";
			calculator.operator = "";
		})

		it("will not be defined if calculator.firstNum does not have a valid value", function() {
			const oper = calculator.enterOperator();
			expect(oper).to.be.null;
			expect(calculator.operator).to.equal("");
		})

		it("cannot change its value until after a second num is defined and valid", function() {
			calculator.firstNum = "123";
			calculator.enterOperator("*");
			const oper1 = calculator.operator;
			calculator.enterOperator("/");
			const oper2 = calculator.operator;
			calculator.secondNum = ".1";
			calculator.enterOperator("/")
			const oper3 = calculator.operator;

			expect(oper1).to.equal(oper2);
			expect(oper1).to.not.equal(oper3);
		})

		it("test should inspect method's use of calculator.calculate", function() {
			sinon.spy(calculator, "calculate");
			calculator.firstNum = "2";
			calculator.operator = "+";
			calculator.secondNum = "3";
			calculator.enterOperator("*");

			assert(calculator.calculate.calledOnce);
		})


	})

	describe("calculate", function() {
		const calculator = new Calculator();

		afterEach(function() {
			calculator.firstNum = "";
			calculator.secondNum = "";
			calculator.operator = "";
		})

		it("returns null if firstNum, secondNum, and operator are not each defined and valid", function() {
			calculator.firstNum = "123";
			calculator.operator = "+";
			const result = calculator.calculate();
			
			expect(result).to.be.null;
		})

		it("returns null if firstNum, secondNum, and operator are not each defined and valid", function() {
			calculator.firstNum = "";
			calculator.operator = "+";
			calculator.secondNum = "456";
			const result = calculator.calculate();
			
			expect(result).to.be.null;
		})

		it("returns null if firstNum, secondNum, and operator are not each defined and valid", function() {
			calculator.firstNum = ".";
			calculator.operator = "+";
			calculator.secondNum = "456";
			const result = calculator.calculate();
			
			expect(result).to.be.null;
		})

		it("returns null if firstNum, secondNum, and operator are not each defined and valid", function() {
			calculator.firstNum = ".123";
			calculator.operator = "+";
			calculator.secondNum = ".";
			const result = calculator.calculate();
			
			expect(result).to.be.null;
		})

		it("returns null if firstNum, secondNum, and operator are not each defined and valid", function() {
			calculator.firstNum = ".123";
			calculator.operator = "";
			calculator.secondNum = ".";
			const result = calculator.calculate();
			
			expect(result).to.be.null;
		})

		it("sets the firstNum equal to the result if calcuation is successful and clears the other values", function() {
			calculator.firstNum = "8976";
			calculator.operator = "*";
			calculator.secondNum = "12.1";
			const result = calculator.calculate();

			expect(calculator.firstNum).to.equal(result);
			expect(calculator.operator).to.equal("");
			expect(calculator.secondNum).to.equal("");
		})


	})


	describe("clear", function() {
		const calculator = new Calculator();

		beforeEach(function() {
			calculator.firstNum = "";
			calculator.secondNum = "";
			calculator.operator = "";
		})

		it("clears the secondValue if it is not already clear", function() {
			calculator.secondNum = ".";
			calculator.clear();

			expect(calculator.secondNum).to.equal("");
		})

		it("clears the operator if it is not already clear", function() {
			calculator.operator = "+";
			calculator.clear();

			expect(calculator.operator).to.equal("");
		})

		it("clears the firstNum if it is not already clear", function() {
			calculator.firstNum = ".123";
			calculator.clear();

			expect(calculator.firstNum).to.equal("");
		})

	})

	describe("clearAll", function() {
		const calculator = new Calculator();

		beforeEach(function() {
			calculator.firstNum = ".12341";
			calculator.secondNum = "+";
			calculator.operator = "876";
		})

		it("clears all the values", function() {
			calculator.clearAll();
			expect(calculator.firstNum).to.equal("");
			expect(calculator.operator).to.equal("");
			expect(calculator.secondNum).to.equal("");
		})
	})

})











