/* petal-functions.js for Petal */
$(document).ready(function() {


	// toggle button
	$('[data-toggle="toggle"]').click(function() {
		var self = $(this);

		if (self.is('.disabled')) {
			return;
		}

		if (self.attr('data-toggle-state') === 'active') {
			self.removeClass('active').removeAttr('data-toggle-state');
			return;
		}
		else {
			self.addClass('active').attr('data-toggle-state', 'active');
			return;	
		}

	});


	// dropdown toggle
	function clearMenus() {
		$('[data-toggle="dropdown"]').parent().removeClass('active').removeAttr('data-dropdown-state');
	}

	$('[data-toggle="dropdown"]').click(function() {
		var self = $(this);

		if (self.is('.disabled')) {
			return;
		}

		if (self.parent().attr('data-dropdown-state') === 'open') {
			clearMenus();
		}

		else {
			clearMenus();
			self.parent().addClass('active').attr('data-dropdown-state','open');
		}		
	});

	$(document).on('click', function(event) {
		var target = $(event.target);

		if(target.parent().hasClass('submenu')) { return; }
		if(target.attr('data-toggle') === 'dropdown') { return; }

		clearMenus();

	});

});


