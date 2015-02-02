/* petal-functions.js for Petal */
$(document).ready(function() {


	// dropdown toggle
	function clearMenus() {
		$('.btn-group.active').removeClass('active').removeAttr('data-dropdown');
	}

	$('[data-toggle="dropdown"]').click(function() {
		var self = $(this);

		if (self.is('.disabled')) {
			return;
		}

		if (self.parent().attr('data-dropdown') === 'open')	{
			clearMenus();
		}

		else {
			clearMenus();
			self.parent().addClass('active').attr('data-dropdown','open');
		}		
	});

	$(document).on('click', function(event) {
		var target = $(event.target);

		if(target.parent().hasClass('submenu')) { return; }
		if(target.data("toggle") === "dropdown") { return; }

		clearMenus();

	});

});


