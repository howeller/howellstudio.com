(function (window, document) {
	let _request =   new XMLHttpRequest();
	_request.open('GET', 'data.json');
	
	_request.onload = function () {
		if(_request.status >= 200 && _request.status < 400){
			let  data = JSON.parse(_request.responseText);
			buildHTML(data);
			// console.log(data);
		}else{
			console.log("Connected, but with error");
		}
	}

	_request.onerror = function () {
		console.log("WHAT'S UP WITH THE ERROR?");
	}

	_request.send();
	console.log("GO!");

	function id(name) {
		return document.getElementById(name);
	}
	// Handlebars.registerPartial('main', 'main.hbs');

	function buildHTML(myData) {
		// console.log(document.body);
		const compiledTemplate = Handlebars.compile(id('hbs-template').innerHTML);
		document.body.innerHTML = compiledTemplate(myData);
	}
})(window, document);
