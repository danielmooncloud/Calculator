require("../scss/application.scss");
var Computer = require("./computer");


$(document).ready(function() {

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

    var computer = new Computer(view);
    view.init();

})