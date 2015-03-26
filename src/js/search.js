/**
 *
 */
(function()
{
	var SearchBar = function()
	{
		$("#api-filter").keyup(function(e)
		{
			var items = $('.tab-pane.active.list-group').children();
			var search = this.value;
			if (!search)
			{
				items.removeClass('hidden');
			}
			else
			{
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
		});
	};

	SpringRollTheme.SearchBar = SearchBar;
}());