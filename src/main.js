(function (window, document) {
	gsap.registerPlugin(ScrollTrigger);
	let _form = {};

	// const _resetScroll = debounce(initScrollPinning);

	/* Utils */
	function id(name) { return document.getElementById(name); }
	function cl(txt){console.log('%c '+txt,'background: rgba(51, 255, 0, 0.3); color: white; display: block;'); }
	function makeHidden(element){element.style.visibility = 'hidden';}
	function makeVisible(element){element.style.visibility = 'visible';}
	/* function hide(element){
		element.style.opacity = 0;
		setTimeout(makeHidden, 400); // NEED to add element as parameter
	} */

	function init(e) {
		cl('init');
		_form.overlay = id('email-overlay');
		_form.response = id('form-response');
		// initScrollPinning();
		initScrollAni();
		initFormBtns();

		// window.addEventListener('resize', _resetScroll, true);
	}

	function debounce(func, delay = 250) {
		console.log('deboucne')
    let timerId;
    return (...args) => {
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
    };
	}

	function onResize(params) {
		cl('onResize');
		;
	}

	function getHeaderHeight(e) {
		// let _height = gsap.getProperty('header', 'height');
		let _height = document.querySelector('header').offsetHeight;
		cl(`getHeaderHeight : ${_height}`);
		return _height;
	}
	/* Scroll Ani */

	function initScrollAni(e) {
		cl('initScrollAni');

		let _sections = gsap.utils.toArray('.work-container');
		// console.log(_sections);

		_sections.forEach((_section, i) => {

			let isImgRight = _section.classList.contains("img-right");
			// console.log(isImgRight);
			gsap.set([_section.querySelector('.work-img-wrapper'), _section.querySelector('.work-txt-wrapper')], {css:{transformPerspective:400, transformStyle:"preserve-3d", backfaceVisibility:"hidden"}});
	
			gsap.from([_section.querySelector('.work-img-wrapper'), _section.querySelector('.work-txt-wrapper')], {
				autoAlpha:0,
				// x: isImgRight ? '+=100%' :'-=100%',
				// skewY:0.5,
				// skewX:0.5,
				rotationY: isImgRight ? 90 : -90,
				// rotationY: -180, 
				// rotationZ: 90, 
				duration: 2,
				stagger: .5, 
				transFormOrigin:'center center center',
				scrollTrigger:{
					trigger: _section.querySelector('.work-img-wrapper'),
					toggleActions:'restart pause resume reset',
					start: 'top bottom', // element, viewport
					end: `top top`,
					// end: `() => += ${(getHeaderHeight()-1)}`,
					scrub: true,
					invalidateOnRefresh: true,
					markers:true
				}
			});
		});
	}
	/* function initScrollPinning(e) {
		cl('initScrollPinning');
		let _panels = gsap.utils.toArray(".hero, h2.title, .work-container");
		// we'll create a ScrollTrigger for each panel just to track when each panel's top hits the top of the viewport (we only need this for snapping)

		let tops = _panels.map(panel => ScrollTrigger.create({
			trigger: panel, 
			start: `top ${getHeaderHeight()-1}`,
			invalidateOnRefresh: true
		}));

		_panels.forEach((panel, i) => {
			ScrollTrigger.create({
				trigger: panel,
				start: () => panel.offsetHeight < window.innerHeight ? `top ${getHeaderHeight()-1}` : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
				// end: () => panel.offsetHeight+_headerHeight,
				pin: true, 
				pinSpacing: false,
				invalidateOnRefresh: true,
				// markers:true
			});
		});

		ScrollTrigger.create({
			markers:true,
			invalidateOnRefresh: true,
			snap: {
				snapTo: (progress, self) => {
					let panelStarts = tops.map(st => st.start), // an Array of all the starting scroll positions. We do this on each scroll to make sure it's totally responsive. Starting positions may change when the user resizes the viewport
							snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
					return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); // snapping requires a progress value, so convert the scroll position into a normalized progress value between 0 and 1
				},
				duration: 0.5
			}
		});
	}
	 */
	/* Contact Form */
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
