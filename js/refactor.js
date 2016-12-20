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
		controller.currentNum += number;
	},
	pushCurrentNum: function() {
		model.input.push(this.currentNum);
		this.currentNum = '';
	},
	decimal: function() {
		if(controller.currentNum.indexOf('.') === -1) {
			controller.currentNum += '.';
		}
	},
	clear: function() {
		this.currentNum = '';
	},
	operator: function() {
	    if(controller.timeForOperator()) {
	    	if()
	    }
	},
    timeForOperator: function() {
	    if(this.currentOper || (!this.currentNum && !model.input.length) || this.currentNum === '.') {
	    	return false;
	    } 
	    return true;
	},
	firstEntry: function() {
		if(model.input.length === 0 && controller.currentNum) {
			return true;
		}
		return false;
	},
	secondEntry: function() {
		if(model.input.length === 2 && controller.currentNum) {
			return true;
		}
		return false;
	},
	hasResult: function() {
		if(model.input.length === 1 && !controller.currentOper) {
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
    	})
    	this.$oper.click(function() {
    		controller.operator.call(this);
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
