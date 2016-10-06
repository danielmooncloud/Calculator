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
    var operation = $(this).val();
    if(model.currentOper !== '' || (model.currentNum === '' && model.input.length === 0) || model.currentNum === '.') {
    return false;
    }
    model.currentOper = (operation);
    view.renderOperator();
    if(model.input.length === 0 || model.input.length === 2) {
    model.input.push(parseInt(model.currentNum * 10000));
    }
    if(model.input.length === 3) {
    model.result = controller.calculate(model.input);
    model.input = [];
    model.input.push(model.result * 10000);
    view.renderResult();
    }
    model.input.push(operation); 
    model.currentNum = ''; 
    controller.decimal = false;
  },
  getCurrentNum: function() {
    return model.currentNum;
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
  }
}

var view = {
  init: function() {
    this.cacheDom();
    this.renderCurrentNum();
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
  renderCurrentNum: function() {
    var currentNum = controller.getCurrentNum();
    console.log(currentNum);
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