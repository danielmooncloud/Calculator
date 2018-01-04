import "../scss/application.scss";
import Calculator from "./calculator";
import Controller from "./controller";


$(document).ready(function() {
	new Controller(Calculator);
});