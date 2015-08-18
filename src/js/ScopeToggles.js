/**
 * Handles the visibility of scope items in the docs. Such as
 * 'private', 'inherited', etc.
 * @module ScopeToggle
 */
(function()
{
	//imports
	var Storage = include('springroll.Storage');

	//local static
	var _tabContent = null;

	/**
	 * @class ScopeToggles
	 * @constructor 
	 */
	var ScopeToggles = {};

	/**
	 * @method init
	 */
	ScopeToggles.init = function()
	{
		_tabContent = $('#classdocs .tab-content');

		// set the default
		if (Storage.read('show_inherited') === null)
			Storage.write('show_inherited', true);

		if (Storage.read('show_inherited'))
			_defaultOn.call($('#toggle-inherited'));

		if (Storage.read('show_protected'))
			_defaultOn.call($('#toggle-protected'));

		if (Storage.read('show_private'))
			_defaultOn.call($('#toggle-private'));
		
		if (Storage.read('show_deprecated'))
			_defaultOn.call($('#toggle-deprecated'));

		//toggle visibility
		$('.scope-toggle').change(_onScopeToggle);
	};

	/**
	 * @method _onScopeToggle
	 * @private
	 */
	var _onScopeToggle = function()
	{
		var id = this.id || this[0].id;

		//remove 'toggle-'
		var which = id.slice(id.lastIndexOf('-') + 1);
		var value = Storage.read('show_' + which);

		//store a boolean in localStorage
		Storage.write('show_' + which, !value);

		//toggle show-[scope] on the content tab-pane,
		//css will handle the actual visibilty from there.
		_tabContent.toggleClass('show-' + which);
	};

	/**
	 * Set the checkbox to 'on' and visibilty of tab-pane
	 * @method _defaultOn
	 * @private 
	 */
	var _defaultOn = function()
	{
		this.prop('checked', true);
		var id = this.id || this[0].id;
		var which = id.slice(id.lastIndexOf('-') + 1); //remove 'toggle-'
		this.bootstrapToggle('on');
		Storage.write('show_' + which, true);
		_tabContent.addClass('show-' + which);
	};

	//namespace
	namespace('springroll').ScopeToggles = ScopeToggles;

}());