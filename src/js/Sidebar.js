/**
 * Handles collapsing and switching of panes in the sidebar
 * @module Sidebar
 */
(function()
{
	var Storage = include('springroll.Storage');
	var _toggleIds = ['toggle-classes', 'toggle-modules'];

	/**
	 * @constructor 
	 */
	var Sidebar = {};

	/**
	 * @method init 
	 */
	Sidebar.init = function()
	{
		if ($(window).width() > 764)
		{
			var activeSidebar = '#' + (Storage.read('activeSidebar') || _toggleIds[0]);
			var button = $(activeSidebar);
			button.addClass('active');
			var target = button.data('target');
			$(target).show().addClass('active');
		}

		//store click events visibility
		$('.sidebar-toggle').click(_onApiToggle);
	};

	/**
	 * Respond to sidebar tab clicks. Store the most recently 
	 * clicked/viewed tab. 
	 * @method _onApiToggle
	 * @private 
	 * @param {jQuery} event
	 */
	var _onApiToggle = function(event)
	{
		var target = $(this).data('target');
		// Visibility is handle through css, so unlike the 
		// scope-toggle, we only need to capture the event and 
		// store the data for page refresh
		Storage.write('activeSidebar', this.id);

		for (var i = 0; i < _toggleIds.length; i++)
		{
			if (_toggleIds[i] == this.id)
				continue;

			// if another dropdown is already open,
			// swap them like they are tab-panes
			var otherToggle = $('#' + _toggleIds[i]);
			if (otherToggle.hasClass('active'))
			{
				//remove old actives
				otherToggle.removeClass('active');
				$(otherToggle.data('target')).hide().removeClass('active');
				//add new actives
				$(target).show().addClass('active');
				$(this).addClass('active');
				return;
			}
		}

		// if no other was active... 
		if ($(this).hasClass('active'))
		{
			// don't collapse the nav in bigger sizes
			if ($(window).width() < 764)
			{
				$(this).removeClass('active');
				$(target).slideUp().removeClass('active');
			}
		}
		else
		{
			$(target).slideDown().addClass('active');
			$(this).addClass('active');
		}
	};

	//namespace
	namespace('springroll').Sidebar = Sidebar;

}());