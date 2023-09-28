(function (window, document) {
	let _form = {};

	function id(name) { return document.getElementById(name); }
	function cl(txt){console.log('%c '+txt,'background: rgba(51, 255, 0, 0.3); color: white; display: block;'); }
	function makeHidden(element){element.style.visibility = 'hidden';}
	function makeVisible(element){element.style.visibility = 'visible';}
	/* function hide(element){
		element.style.opacity = 0;
		setTimeout(makeHidden, 400); // NEED to add element as parameter
	} */



	function init(params) {
		cl('init');
		_form.overlay = id('email-overlay');
		_form.response = id('form-response');
		initFormBtns();
	}
	
	function initFormBtns(){
		cl('initFormBtns ');
		// document.getElementById('contact-btn').addEventListener('click', onContactClick, false);
		id('contact-btn').addEventListener('click', onContactClick, false);
		id('close-btn').addEventListener('click', onCloseContactClick, false);
		id("contact-form").addEventListener("submit", onSubmitClick, false);
	}

	function onSubmitClick(event) {
		cl('* Submit Click >>');
		event.preventDefault(); // Prevent the default form submission behavior
		const formData = new FormData(this);
		console.table(formData);

		// Send the form data to the PHP script using AJAX
		fetch("contactAction.php", { method: "POST", body: formData, })
		.then(response => response.text())
		.then(data => {
			console.table(data);
			// console.log(`What type is response data? ${typeof(data)}`);
			// let _message = typeof(data) == 'string' : JSON.parse(data).message : data.message;
			// Display the response from the PHP script
			_form.response.innerHTML = JSON.parse(data).message;
			makeVisible(_form.response);
			_form.response.style.opacity = 1;
		})
		.catch(error => {
			console.error("Error: ", error);
			_form.response.innerHTML = toString(error);
			_form.response.style.backgroundColor = 'red';
		});
		// id("form-container").style.display = "none";
			// makeVisible(_form.response);
			// _form.response.style.opacity = 1;
	}
	function onContactClick(e) {
		cl('on Open ContactClick');
		makeVisible(_form.overlay);
		_form.overlay.style.opacity = 1;
	}	
	function onCloseContactClick(e) {
		_form.overlay.style.opacity = 0;
		setTimeout(hideForm, 400);
	}
	function hideForm(e) {
		makeHidden(_form.overlay);
		makeHidden(_form.response);
		clearForm(e);
	}
	function clearForm(e) {
		cl('	clearForm');
		_form.response.innerHTML = "";

		const inputElements = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
		// Loop through the input elements and set their values to an empty string
		inputElements.forEach(function (input) {
			const defaultValue = input.getAttribute('placeholder');
			
			if (defaultValue !== null) {
					// Reset the input's value to the default value
					input.value = '';
					// input.value = 'defaultValue';
			}
		});
	}	

	/* Handlebars loading */

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
		document.querySelector('.site-container').innerHTML = compiledTemplate(myData);
		// document.body.innerHTML = compiledTemplate(myData);
	}
})(window, document);
