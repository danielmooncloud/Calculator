
$(document).ready(function() {


function Computer() {
    var input = [];
    var currentNum = '';
    var currentOper = '';

    var operations = {
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
    };

    var pushCurrentNum = function() {
        input.push(currentNum * 10000);
        currentNum = '';
    };

    var pushCurrentOper = function() {
        input.push(currentOper);
    };

    var timeForOperator = function() {
        if((!currentNum && !input.length) || currentNum === '.') {
            return false;
        } 
        return true;
    };

    var firstEntry = function() {
        if(input.length === 0 && isValidNumber(currentNum)) {
            return true;
        }
        return false;
    };

    var secondEntry = function() {
        if(input.length === 2 && isValidNumber(currentNum)) {
            return true;
        }
        return false;
    };

    var hasResult = function() {
        if(input.length === 1 && typeof input[0] === 'number') {
            return true;
        }
        return false;
    };

    var calculate = function(arr) {
        if(arr.length === 3) {
            currentNum = operations[arr[1]](arr[0], arr[2]);
            input = [];
            view.render(currentNum);
            pushCurrentNum();
        }
    };

    var isValidNumber = function(num) {
        if(num !== '' && num !== '.') {
            return true;
        }
        return false;
    };
    
    this.number = function(val) {
        var number = val;
        if(hasResult()) {
            input = [];
        }
        currentNum += number;
        view.render(currentNum);
    };


    this.decimal = function() {
        if(input.indexOf('.') === -1) {
            currentNum += '.';
            view.render(currentNum);
        }
    };

    this.operator = function(val) {
        if(timeForOperator()) {
            currentOper = val;
            if(firstEntry() || secondEntry()) {
                pushCurrentNum();
                view.render(currentOper);
                calculate(input);
                pushCurrentOper();     
            } else if(hasResult()) {
                pushCurrentOper();
                view.render(currentOper);
            }
        }
    };

    this.equals = function() {
        if(secondEntry()) {
            pushCurrentNum();
            calculate(input);
        }
    };

    this.clear = function() {
        currentNum = '';
        view.render(0);
    };

    this.clearAll = function() {
        currentNum = '';
        currentOper = '';
        input = [];
        view.render(0);
    };  
}



const view = {
    init: function() {
        this.cacheDom();
        this.bind();
        this.render(0);
    },
  
    cacheDom: function() {
        this.$main = $(".main");
        this.$int = this.$main.find('.int');
        this.$decimal = this.$main.find('#decimal');
        this.$oper = this.$main.find('.oper');
        this.$clearAll = this.$main.find('.clearall');
        this.$clear = this.$main.find('.clear');
        this.$equal = this.$main.find('.equal');
        this.$screen = this.$main.find('.screen');
    },
 
    bind: function() {
        this.$int.click(function() {
            var val = $(this).val();
            computer.number(val);
        }); 
      
        this.$decimal.click(function() {
            computer.decimal();
        });
      
        this.$oper.click(function() {
            var val = $(this).val();
            computer.operator(val);
        });
      
        this.$equal.click(function() {
            computer.equals();
        });
      
        this.$clear.click(function() {
            computer.clear();
        });
      
        this.$clearAll.click(function() {
            computer.clearAll();
        })
    },
  
    render: function(value) {
        this.$screen.html(value);
    }
}


var computer = new Computer();

view.init();

})






