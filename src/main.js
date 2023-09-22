(function (window, document) {
	let _formOverlay;

	function id(name) { return document.getElementById(name); }
	function cl(txt){console.log('%c '+txt,'background: rgba(51, 255, 0, 0.3); color: white; display: block;'); }
	function hide(element){element.style.visibility = 'hidden'; }
	function show(element){element.style.visibility = 'visible'; }	



	function init(params) {
		cl('init');
		_formOverlay = id('email-form');
		initFormBtns();
	}
	
	function initFormBtns(){
		cl('initFormBtns ');
		// document.getElementById('contact-btn').addEventListener('click', onContactClick, false);
		id('contact-btn').addEventListener('click', onContactClick, false);
		id('close-btn').addEventListener('click', onCloseContactClick, false);
	}
	function onContactClick(e) {
		cl('onContactClick');
		show(_formOverlay);
		_formOverlay.style.opacity = 1;
	}	
	function onCloseContactClick(e) {
		_formOverlay.style.opacity = 0;
		setTimeout(hideForm, 400);
	}
	function hideForm(e) {
		hide(_formOverlay);
	}

	/* Handlebars loading  */
	let _request =   new XMLHttpRequest();
	_request.open('GET', 'data.json');
	
	_request.onload = function () {
		if(_request.status >= 200 && _request.status < 400){
			let _data = JSON.parse(_request.responseText);
			buildHTML(_data);
			console.log('onload success');
			init();
		}else{
			console.log("Connected, but with error");
		}
	}
	_request.onerror = function () {
		console.log("WHAT'S UP WITH THE ERROR?");
	}

	_request.send();
	console.log("GO!");

	// Handlebars.registerPartial('main', 'partials/main.hbs');

	function buildHTML(myData) {
		console.log('buildHTML');
		const compiledTemplate = Handlebars.compile(id('hbs-template').innerHTML);
		id('site-container').innerHTML = compiledTemplate(myData);
		// document.body.innerHTML = compiledTemplate(myData);
	}
})(window, document);
