module.exports = function Computer(view) {
    var input = [];
    var currentNum = '';
    var currentOper = '';
    this.view = view;
    var computer = this;

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
            computer.view.render(currentNum);
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
        this.view.render(currentNum);
    };


    this.decimal = function() {
        if(currentNum.indexOf('.') === -1) {
            currentNum += '.';
            this.view.render(currentNum);
        }
    };

    this.operator = function(val) {
        if(timeForOperator()) {
            currentOper = val;
            if(firstEntry() || secondEntry()) {
                pushCurrentNum();
                this.view.render(currentOper);
                calculate(input);
                pushCurrentOper();     
            } else if(hasResult()) {
                pushCurrentOper();
                this.view.render(currentOper);
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
        this.view.render(0);
    };

    this.clearAll = function() {
        currentNum = '';
        currentOper = '';
        input = [];
        this.view.render(0);
    };  
}







