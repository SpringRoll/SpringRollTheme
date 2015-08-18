/**
 *
 * @module Navigation
 */
(function()
{
	// Include classes
	var Storage = include('springroll.Storage');

	/**
	 * @class  Navigation
	 * @constructor 
	 */
	var Navigation = {};

	/**
	 * The jquery body object for scrolling
	 * @property {jQuery} $body
	 */
	var $body = $('html, body');

	/**
	 * The jquery header object for scrolling
	 * @property {jQuery} $header
	 */
	var $header = $('header .navbar');

	/**
	 * The jquery classdocs object for position scrolling
	 * @property {jQuery} $classdocs
	 */
	var $classdocs = $('#classdocs');

	/**
	 * The jquery active document element
	 * @property {jQuery} $activeItem
	 */
	var $activeItem = null;

	/**
	 * The jquery active document element
	 * @property {jQuery} $docTabs
	 */
	var $docTabs = $(".docs-toggle a");

	/**
	 * The jquery window element
	 * @property {jQuery} $window
	 */
	var $window = $(window);

	/**
	 * If the tabs are enabled to change URL
	 * @property {Boolean} rememberChoice
	 */
	var rememberChoice = true;

	/**
	 * Initialize the navigation
	 * @method init 
	 * @static
	 */
	Navigation.init = function()
	{
		$window.on('hashchange', onHashChanged);
		setTimeout(onHashChanged, 0);

		// Listen for tab changes
		$docTabs.on('show.bs.tab', function()
		{
			if (rememberChoice)
			{
				$window.off('hashchange');
				location.hash = "";
				$window.on('hashchange', onHashChanged);
				Storage.write('tabView', $(this).parent().attr('id'));
			}
		});
	};

	/**
	 * Function handler when the hash changes
	 * @method onHashChanged
	 * @private
	 */
	var onHashChanged = function()
	{
		var hash = location.hash;
		var scrollTop;

		// Clear any active item
		if ($activeItem)
		{
			$activeItem.removeClass('active');
			$activeItem = null;
		}

		if (!hash)
		{
			var tabView = Storage.read('tabView') || 'tab-index';
			var activeTab = $("#" + tabView + " a");

			// No need to re-remember the tab
			rememberChoice = false;
			if (!activeTab.length)
				activeTab = $('#tab-index a');
			activeTab.tab('show');
			rememberChoice = true;
		}
		else if (hash.indexOf("_") > -1)
		{
			var hashParts = hash.substr(1).split("_");

			// Goto the correct views
			var views = {
				"method": "#tab-methods a",
				"property": "#tab-properties a",
				"event": "#tab-events a",
				"attr": "#tab-attributes a"
			};

			// Disable the tab view remembering
			rememberChoice = false;
			$(views[hashParts[0]]).tab('show');
			rememberChoice = true;

			// Escape special characters
			var activeItem = $(hash.replace(/\./g, '\\.'));

			console.log(activeItem);
			if (activeItem.length > 0)
			{
				$activeItem = activeItem;
				$activeItem.addClass('active');
				var hashTop = $activeItem.offset().top;
				scrollTop = hashTop - $header.height();
				$body.scrollTop(scrollTop);
			}
		}
		else
		{
			var lineNumber = parseInt(hash.substr(2));
			var li = $('.file .code .linenums').children().eq(lineNumber);
			li.addClass('active');
			scrollTop = $(li).offset().top - $header.height();
			$body.scrollTop(scrollTop);
		}
	};

	// Namespace
	namespace('springroll').Navigation = Navigation;

}());