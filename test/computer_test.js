import { expect } from "chai";
import Computer from "../app/js/computer.js";



describe("COMPUTER METHODS", () => {
	describe("pushCurrentNum", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should push the currentNum * 100000 to the input array and it should reset the currentNum", () => {
			
			computer.currentNum = "123";
			computer.pushCurrentNum();
			expect(computer.input).to.deep.equal([1230000]);
			expect(computer.currentNum).to.equal("");
		})
	})

	describe("pushCurrentOper", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should push the current operator to the input array", () => {
			
			computer.currentOper = "+";
			computer.pushCurrentOper();
			expect(computer.input).to.deep.equal(["+"]);
		})
	})

	describe("timeForOperator", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should return false if the currentNum is a decimal", () => {
			
			computer.currentNum = ".";
			expect(computer.timeForOperator()).to.be.false;
		})

		it("should return false if the currentNum is empty", () => {
			
			computer.currentNum = "";
			expect(computer.timeForOperator()).to.be.false;
		})

		it("should return true if the currentNum is not an empty string or a decimal", () => {
			
			computer.currentNum = "1";
			computer.input = [];
			expect(computer.timeForOperator()).to.be.true;
		})
	})

	describe("firstEntry", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should return true if there currently is no entry in the input array and the currentNum is valid", () => {
			
			computer.input = [];
			computer.currentNum = "123";
			expect(computer.firstEntry()).to.be.true;
		})

		it("should return false if the the input array is not empty, or if the currentNum is invalid", () => {
			
			computer.input = [1];
			computer.curretNum = "123";
			expect(computer.firstEntry()).to.be.false;
			
			computer.input = [];
			computer.curretNum = "";
			expect(computer.firstEntry()).to.be.false;
			
			computer.input = [];
			computer.curretNum = ".";
			expect(computer.firstEntry()).to.be.false;
		})
	})

	describe("secondEntry", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})
		
		it("should return true if there is only one numerical value in the input array and the current number is vaild", () => {
			
			computer.input = ["123", "+"];
			computer.currentNum = "123";
			expect(computer.secondEntry()).to.be.true;
		})

		it("should return false if the current input array is empty or if the current number is invalid", () => {
			computer.input = [];
			computer.currentNum = "123";
			expect(computer.secondEntry()).to.be.false;
			
			computer.input = ["123", "+"];
			computer.currentNum = "";
			expect(computer.secondEntry()).to.be.false;
			
			computer.input = ["123"];
			computer.currentNum = "123";
			expect(computer.secondEntry()).to.be.false;
		})

	})

	describe("hasResult", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})
		
		it("should return true if the only entry in the input array is the result of a previous calculation", () => {
			computer.input = [1];
			expect(computer.hasResult()).to.be.true;
		})

		it("should return false if the input array has no entries", () => {
			computer.input = [];
			expect(computer.hasResult()).to.be.false;
		})

		it("should return false if the input array has more than one entry", () => {
			computer.input = [1, 2];
			expect(computer.hasResult()).to.be.false;
		})

		it("should return false if the only entry in the input array is not a number", () => {
			computer.input = ["1"];
			expect(computer.hasResult()).to.be.false;
		})

		it("should return false if the only entry in the input array is not a number", () => {
			computer.input = [null];
			expect(computer.hasResult()).to.be.false;
		})
	})

	describe("calculate", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should calculate a result using the entries of the an array and push it into the input array", () => {
			computer.calculate([1, "+", 3]);
			expect(computer.currentNum).to.equal("");
			expect(computer.input).to.deep.equal([4]);
		})

		it("should have no effect if there aren't exactly three entries in the input array", () => {
			computer.input = [1, "+"]
			computer.calculate(computer.input);
			expect(computer.input).to.deep.equal([1, "+"])
		})
	})

	describe("isValidNumber", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should return false if the number is invalid", () => {
			expect(computer.isValidNumber("")).to.be.false;
			expect(computer.isValidNumber(".")).to.be.false;
		})

		it("should return true if the number is valid", () => {
			expect(computer.isValidNumber("5")).to.be.true;
			expect(computer.isValidNumber(5)).to.be.true;
		})
	})


	describe("number", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should add the string value of the most recent number clicked to the string of the current number", () => {
			computer.currentNum = "123";
			computer.number("4");
			expect(computer.currentNum).to.equal("1234");
		})

		it("should not add the numerical value of the most recent number click to the numerical value of the current number", () => {
			computer.currentNum = "123";
			computer.number("4");
			expect(computer.currentNum).to.not.equal("127");
		})

		it("reset the input if the input currently contains a result", () => {
			computer.input = [1];
			computer.number("1");
			expect(computer.input).to.deep.equal([]);
		})

		it("should not reset the input array if it already has a number and an operator", () => {
			computer.input = [1, "+"];
			computer.number("1");
			expect(computer.input).to.deep.equal([1, "+"]);
		})
	})

	describe("decimal", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should add a decimal to the currentNum if the currentNum doesn't currently contain a decimal", () => {
			computer.currentNum = "123";
			computer.decimal();
			expect(computer.currentNum).to.equal("123.")
		})

		it("should not add a decimal to the currentNum if the currentNum already contains a decimal", () => {
			computer.currentNum = "123.";
			computer.decimal();
			expect(computer.currentNum).to.equal("123.")
		})
	})

	describe("operator", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should set the current operate to the value specified if it makes sense", () => {
			computer.currentNum = "123";
			computer.operator("+");
			expect(computer.currentOper).to.equal("+");
		})

		it("should not set the current operator the value specified if it doesn't make sense", () => {
			computer.currentNum = "";
			computer.operator("+");
			expect(computer.currentOper).to.equal("");
		})

		it("should update the input array to contain the currentNum and the currentOper if its empty", () => {
			computer.currentNum = "123";
			computer.operator("+");
			expect(computer.input).to.deep.equal([1230000, "+"])
		})

		it("should calculate update the input array with the result of a calculation if it makes sense", () => {
			computer.input = [1230000, "*"];
			computer.currentNum = "2";
			computer.operator("/");
			expect(computer.input).to.deep.equal([2460000, "/"]);
		})

		it("should push the current value to the input array if the input array already has a result", () => {
			computer.input = [123000];
			computer.operator("/");
			expect(computer.input).to.deep.equal([123000, "/"])
		})

		it("should do nothing if its out of sequence", () => {
			computer.input = [];
			computer.operator("/");
			expect(computer.input).to.deep.equal([]);
		})
	})

	describe("equal", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should push the currentNum to the input array and calculate a result if it makes sense", () => {
			computer.input = [1230000, "+"];
			computer.currentNum = "123";
			computer.equals();
			expect(computer.currentNum).to.equal("");
			expect(computer.input).to.deep.equal([2460000]);
		})

		it("should do nothing if there is no current operator", () => {
			computer.input = [1230000];
			computer.Oper = "";
			computer.equals();
			expect(computer.input).to.deep.equal([1230000]);
		})

		it("should do nothing if there is no current number", () => {
			computer.input = [1230000, "+"];
			computer.currentNum = "";
			computer.equals();
			expect(computer.input).to.deep.equal([1230000, "+"]);
		})

		it("should do nothing if the current number is '.'", () => {
			computer.input = [1230000, "+"];
			computer.currentNum = ".";
			computer.equals();
			expect(computer.input).to.deep.equal([1230000, "+"]);
		})
	})

	describe("clear", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})

		it("should clear the current number", () => {
			computer.currentNum = "123";
			computer.clear();
			expect(computer.currentNum).to.equal("");
		})
	})

	describe("clearAll", () => {
		let computer;
		let view = {
			init() {
				return;
			},
			render() {
				return;
			}
		}
		beforeEach(() => {
			computer = new Computer();
			computer.init(view);
		})
		
		it("should clear the current number, the current operator and the input array", () => {
			computer.currentNum = "123";
			computer.currentOper = "+";
			computer.input = [123, "+"];
			computer.clearAll();
			expect(computer.currentNum).to.equal("");
			expect(computer.currentOper).to.equal("");
			expect(computer.input).to.deep.equal([]);
		})
	})

})











