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

		// If another dropdown is already open,
		// swap them like they are tab-panes
		for (var i = 0; i < _toggleIds.length; i++)
		{
			if (_toggleIds[i] == this.id)
				continue;
		
			var otherToggle = $('#' + _toggleIds[i]);
			if (otherToggle.hasClass('active'))
			{
				// Remove old actives
				otherToggle.removeClass('active');
				$(otherToggle.data('target')).hide().removeClass('active');
				// Add new actives
				$(target).show().addClass('active');
				$(this).addClass('active');
				
				// Tell the search bar the sidebar list has changed and filter
				// incase the search field stil has contents
				springroll.SearchBar.apply(); 
				return;
			}
		}

		// If no other was active... 
		if ($(this).hasClass('active'))
		{
			// Don't collapse the nav in bigger sizes
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

	namespace('springroll').Sidebar = Sidebar;
	
}());