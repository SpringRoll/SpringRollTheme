/**
 * The search bar/class filter in the side bar
 * @module Search
 */
(function()
{
	var _currSearch = null;
	var _searchbar = null;
	var _clearButton = null;

	/**
	 * @constructor 
	 */
	var SearchBar = function()
	{
		_searchbar = $("#api-filter");
		_clearButton = $('#sidebar .btn-close');
		_clearButton.addClass('hidden');
		_searchbar.keyup(function(e)
		{
			_currSearch = this.value;
			SearchBar.apply(_currSearch);
		});
		_clearButton.click(function(e)
		{
			console.log('_clearButton click');
			_searchbar[0].value = _currSearch = null;
			SearchBar.apply();
		});
	};

	SearchBar.apply = function()
	{
		var items = $('#sidebar .collapse.active ul').children();
		if (!_currSearch)
		{
			items.removeClass('hidden');
			_clearButton.addClass('hidden');
		}
		else
		{
			_clearButton.removeClass('hidden');
			var regex = new RegExp(_currSearch, 'i');
			items.each(function()
			{
				var item = $(this);
				item.removeClass('hidden');
				var label = item.text().replace(/ /g, "");
				if (!regex.test(label))
				{
					item.addClass('hidden');
				}
			});
		}
	};

	namespace('springroll').SearchBar = SearchBar;

}());