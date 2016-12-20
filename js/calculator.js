(function() {

var model = {
  input: [],
  currentNum: '',
  currentOper: '',
  result: ''  
}

var controller = {
  init: function() {
    view.init();
    this.decimal = false;
  },
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
    if(controller.decimal && $(this).val() === '.') {
      return false;
    }
    if(typeof model.input[model.input.length - 1] === 'number') {
     model.input = [];
    }
    model.currentNum += number;
    model.currentOper = '';
    view.renderCurrentNum();
  },
  operator: function() {
    if(this.timeForOperator()) {
      var operation = $(this).val();
      model.currentOper = operation;
      view.renderOperator();
      
      if(this.timeToPush()) {
        this.pushCurrentNum();
      } else if(this.timeToCalculate()) {
        this.pushCurrentNum();
        this.equals();
      }
      
      model.input.push(operation); 
      model.currentNum = ''; 
      controller.decimal = false;
    }  
  },
  getCurrentNum: function() {
    return model.currentNum;
  },
  pushCurrentNum: function() {
    model.input.push(parseInt(this.getCurrentNum() * 10000));
  },
  getCurrentOper: function() {
    return model.currentOper;
  },
  getInput: function() {
    return model.input;
  },
  decimalCheck: function() {
    this.decimal = true;
  },
  equals: function() {
      
    if(model.currentNum === '' || model.currentNum === '.' || model.input.length !== 2) {
      model.currentNum = '';
      return false;
    } 
      model.input.push(parseInt(model.currentNum*10000));
      model.result = this.calculate(model.input);
      model.input = [];
      model.input.push(model.result * 10000);
      model.currentNum = '';
      this.decimal = false;
      view.renderResult();
  },
  getResult: function() {
    return model.result;
  },
  calculate: function(arr) {
    return this.operations[arr[1]](arr[0], arr[2]);
  },
  clearAll: function() {
    model.currentNum = '';
    model.input = [];
    model.currentOper = '';
    this.decimal = false;
    view.renderClear();    
  },
  clear: function() {
    model.currentNum = '';
    model.input.pop();
    this.decimal = false;
    view.renderClear();
  },
  timeForOperator: function() {
    if(model.currentOper || (!this.getCurrentNum() && !model.input.length) || this.getCurrentNum() === '.') {
      return false;
    } 
    return true;
  },
  timeToPush: function() {
    if(model.input.length === 0 && this.getCurrentNum()) {
      return true;
    }
    return false;
  },
  timeToCalculate: function() {
    if(model.input.length === 2 && this.getCurrentNum()) {
      return true;
    }
    return false;
  },
}

var view = {
  init: function() {
    this.cacheDom();
    this.bind();
    this.renderCurrentNum();
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
  renderCurrentNum: function() {
    var currentNum = controller.getCurrentNum();
    this.$screen.html(currentNum);
  },
  renderOperator: function() {
    var operator = controller.getCurrentOper();
    this.$screen.html(operator);
  },
  renderResult: function() {    
    var result = controller.getResult();
    this.$screen.html(result);  
  },
  renderClear: function() {
    this.$screen.html(0);
  },
  bind: function() {
    this.$int.click(function() {
      controller.number.call(this);
    }); 
    this.$oper.click(function() {
      controller.operator.call(this);
    });
    this.$decimal.click(function() {
      controller.decimalCheck();
    });
    this.$equal.click(function() {
      controller.equals();
    });
    this.$clearAll.click(function() {
      controller.clearAll();
    });
    this.$clear.click(function() {
      controller.clear();
    })
  }
}

$(document).ready(function() {
controller.init();
});

})();