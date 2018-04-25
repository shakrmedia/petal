/* petal-functions.js for Petal */
;(function (window) {
	"use strict";

	// helper for querying elements array with css selector
	function query(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	}

	// clear dropdown states
	function clearMenus(self) {
		query('[data-dropdown-state="open"]').filter(function(el) {
			return !el.contains(self) || self.getAttribute('data-toggle') === 'dropdown';
		}).map(function(el) {
			var dropdown_el = el.querySelector('button.dropdown')
			dropdown_el.parentNode.classList.remove('active');
			dropdown_el.parentNode.removeAttribute('data-dropdown-state');
		});
	}

	// close dropdown when user clicks outside of dropdown
	document.addEventListener('click', function(event) {
		var target = event.target;

		// prevent closing dropdown when user clicks elements inside dropdown
		if(target.parentNode.classList.contains('submenu') || target.getAttribute('data-toggle') === 'dropdown') return;

		clearMenus(target);
	});

	// toggle button
	function toggle(el) {
		el.setAttribute('data-toggle', 'toggle');
		el.addEventListener('click', function() {
			if(el.classList.contains('disabled')) { return; }

			if(el.getAttribute('data-toggle-state') === 'active') {
				el.classList.remove('active');
				el.removeAttribute('data-toggle-state');
			} else {
				el.classList.add('active');
				el.setAttribute('data-toggle-state', 'active');
			}
		});
	}

	// dropdown toggle
	function dropdown(el) {
		el.setAttribute('data-toggle', 'dropdown');
		el.addEventListener('click', function() {
			if(el.classList.contains('disabled')) { return; }

			var dropdown_state = el.parentNode.getAttribute('data-dropdown-state');

			clearMenus(el);

			if(!dropdown_state) {
				el.parentNode.classList.add('active');
				el.parentNode.setAttribute('data-dropdown-state', 'open');
			}
		});
	}

	// apply toggle functionality to all elements whose data-toggle attribute is toggle
	query('[data-toggle="toggle"]').forEach(function(el) {
		toggle(el);
	});
	// apply dropdown functionality to all elements whose data-toggle attribute is dropdown
	query('[data-toggle="dropdown"]').forEach(function(el) {
		dropdown(el);
	});
})(window);
