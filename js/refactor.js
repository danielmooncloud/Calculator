(function() {
'use strict';

const model = {
	init: function() {
		this.input = [];
		this.result = 0
	},
	input: [],
	result: 0
}


var controller = {
	init: function() {
		model.init();
		view.init(); 
		view.render(0);
	},
	currentNum: '',
	currentOper: '',
	operations:  {
	    '+': function(a, b) {
	      return (a + b)/10000; 
	    },
	    '-': function(a, b) {
	      return (a - b)/10000; 
	    }, 
	    '*': function(a,b) {
	      return (a * b)/(Math.pow(10,8));
	    },
	    '/': function(a,b) {
	      return (a / b);
	    }
  	},
	number: function() {
		var number = $(this).val();
		if(controller.hasResult()) {
			model.input = [];
		}
		controller.currentNum += number;
		view.render(controller.currentNum);
	},
	pushCurrentNum: function() {
		model.input.push(this.currentNum * 10000);
		this.currentNum = '';
	},
	pushCurrentOper: function() {
		model.input.push(this.currentOper);
	},
	decimal: function() {
		if(controller.currentNum.indexOf('.') === -1) {
			controller.currentNum += '.';
			view.render(controller.currentNum);
		}
	},
	clear: function() {
		this.currentNum = '';
	},
	operator: function() {
	    if(controller.timeForOperator()) {
	    	controller.currentOper = $(this).val();
	    	
	    	if(controller.firstEntry() || controller.secondEntry()) {
	    		controller.pushCurrentNum();
	    		view.render(controller.currentOper);
	    		controller.calculate(model.input);
	    		controller.pushCurrentOper();    	
	    	} else if(controller.hasResult()) {
	    		controller.pushCurrentOper();
	    		view.render(controller.currentOper);
	    	}
	    }
	},
    timeForOperator: function() {
	    if((!this.currentNum && !model.input.length) || this.currentNum === '.') {
	    	return false;
	    } 
	    return true;
	},
	firstEntry: function() {
		if(model.input.length === 0 && this.isValidNumber(this.currentNum)) {
			return true;
		}
		return false;
	},
	secondEntry: function() {
		if(model.input.length === 2 && this.isValidNumber(this.currentNum)) {
			return true;
		}
		return false;
	},
	hasResult: function() {
		if(model.input.length === 1 && typeof model.input[0] === 'number') {
			return true;
		}
		return false;
	},
	equals: function() {
		if(controller.secondEntry()) {
			controller.pushCurrentNum();
			controller.calculate(model.input);
		}
	},
	calculate: function(arr) {
		if(arr.length === 3) {
			//console.log(arr);
			this.currentNum = this.operations[arr[1]](arr[0], arr[2]);
			model.input = [];
			view.render(this.currentNum);
			this.pushCurrentNum();
			//console.log(model.input);
		}
	},
	isValidNumber: function(num) {
		if(num !== '' && num !== '.') {
			return true;
		}
		return false;
	}  
}


const view = {
	init: function() {
		this.cacheDom();
		this.bind();
	},
	cacheDom: function() {
	    this.$int = $('.int');
	    this.$decimal = $('#decimal');
	    this.$oper = $('.oper');
	    this.$clearAll = $('.clearall');
	    this.$clear = $('.clear');
	    this.$equal = $('.equal');
	    this.$screen = $('.screen');
  	},
  	bind: function() {
	    this.$int.click(function() {
	    	controller.number.call(this);
    	}); 
    	this.$decimal.click(function() {
    		controller.decimal.call(this);
    	});
    	this.$oper.click(function() {
    		controller.operator.call(this);
    	});
    	this.$equal.click(function() {
    		controller.equals();
    	})
  	},
  	render: function(value) {
  		this.$screen.html(value);
  	}
}





$(document).ready(function() {
	controller.init();
});

}())

