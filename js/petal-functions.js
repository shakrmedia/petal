/* petal-functions.js for Petal */
;(function ($, window) {
	"use strict";
	
	function clearMenus(self) {
		self.parent().removeClass('active').removeAttr('data-dropdown-state');
	}

	$(document).on('click', function(event) {
		var target = $(event.target);

		if(target.parent().hasClass('submenu') || target.attr('data-toggle') === 'dropdown') return;

		clearMenus(target);

	});
	
	// toggle button
	$.fn.toggle = function() {
		$(this)
			.prop('data-toggle','toggle')
			.click(function() {
				var self = $(this);
		
				if (self.is('.disabled')) return;
		
				if (self.attr('data-toggle-state') === 'active') {
					self.removeClass('active').removeAttr('data-toggle-state');
				} else {
					self.addClass('active').attr('data-toggle-state', 'active');
				}
		
			});
	}
	
	// dropdown toggle
	$.fn.dropdown = function() {
		$(this)
			.prop('data-toggle','dropdown')
			.click(function() {
				var self = $(this);
		
				if (self.is('.disabled')) return;
		
				var dropdown_state = self.parent().attr('data-dropdown-state');
				
				clearMenus(self);
				
				if (!dropdown_state) {
					self.parent().addClass('active').attr('data-dropdown-state','open');
				}		
			});
	};
	
	$('[data-toggle="toggle"]').toggle();
	$('[data-toggle="dropdown"]').dropdown();
})(jQuery, window);