import "../scss/application.scss";
import Computer from "./computer";


$(document).ready(function() {

	const view = {

		init() {
			this.cacheDom();
			this.bind();
			this.render(0);
		},

		cacheDom() {
			this.$main = $(".main");
			this.$int = this.$main.find(".int");
			this.$decimal = this.$main.find("#decimal");
			this.$oper = this.$main.find(".oper");
			this.$clearAll = this.$main.find(".clearall");
			this.$clear = this.$main.find(".clear");
			this.$equal = this.$main.find(".equal");
			this.$screen = this.$main.find(".screen");
		},

		bind() {
			this.$int.click((e) => {
				const val = e.target.innerText;
				computer.number(val);
			}); 

			this.$decimal.click(() => {
				computer.decimal();
			});

			this.$oper.click((e) => {
				const val = e.target.innerText;
				computer.operator(val);
			});

			this.$equal.click(() => {
				computer.equals();
			});

			this.$clear.click(() => {
				computer.clear();
			});

			this.$clearAll.click(() => {
				computer.clearAll();
			});
		},

		render(value) {
			this.$screen.html(value);
		}
	};

	var computer = new Computer();
	computer.init(view);

});