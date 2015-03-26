/**
 *
 */
(function()
{
	var _toggleIds = ['toggle-classes', 'toggle-modules'];

	var Sidebar = {};

	var p = Sidebar.prototype = {};

	p.init = function()
	{
		if ($(window).width() > 764)
		{
			var activeSidebar = '#' + (SpringRollTheme.Storage.retrieve('activeSidebar') || _toggleIds[0]);
		    var button = $(activeSidebar);
			button.addClass('active');
            var target= button.data('target');
            $(target).show();
		}

		//store click events visibility
		$('.sidebar-toggle').click(this.toggle);
	};

	/**
	 *  Respond to sidebar tab clicks. Store the most recently 
	 *  clicked/viewed tab. 
	 *  @param {jQuery} event
	 */
	p.toggle = function(event)
	{
		var target = $(this).data('target');
		// Visibility is handle through css, so unlike the 
		// scope-toggle, we only need to capture the event and 
		// store the data for page refresh
		localStorage.activeSidebar = this.id;
		// Swap like tab-panes at larger sizes 
		if ($(window).width() > 764)
		{
			$('#sidebar .collapse').hide().removeClass('active');
			$(target).show().addClass('active');
		}
		else
		{
			for (var i = 0; i < _toggleIds.length; i++)
			{
				if (_toggleIds[i] == this.id)
					continue;

				var other = $('#' + _toggleIds[i]);
				if (other.hasClass('active'))
				{
					$(other.data('target')).hide();
					other.removeClass('active');
					$(target).show(); //.addClass('active');
					$(this).addClass('active');
					return;
				}
			}

			if ($(this).hasClass('active'))
			{
				$(this).removeClass('active');
				$(target).slideUp(); //.removeClass('active');
			}
			else
			{
				$(target).slideDown(); //.addClass('active');
				$(this).addClass('active');
			}
		}
	};

	SpringRollTheme.Sidebar = Sidebar.prototype;
}());