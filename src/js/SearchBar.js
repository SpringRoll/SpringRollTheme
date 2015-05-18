/**
 * The search bar/class filter in the side bar
 * @module Search
 */
(function()
{
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
			var search = this.value;
			SearchBar.apply(search);
		});
		_clearButton.click(function(e)
		{
			console.log('_clearButton click'); 
			SearchBar.clear();
		});
	};

	SearchBar.apply = function(search)
	{
		var items = $('#sidebar .collapse.active ul').children();
		if (!search)
		{
			items.removeClass('hidden');
			_clearButton.addClass('hidden');
		}
		else
		{
			_clearButton.removeClass('hidden');
			var regex = new RegExp(search, 'i');
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
		//TODO 
		/* 
		on tab change, keep search results present and affecting the list
		*/
	};

	SearchBar.clear = function()
	{
		_searchbar[0].value = '';
		SearchBar.apply();
	};
	namespace('springroll').SearchBar = SearchBar;

}());