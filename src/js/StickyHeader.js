/**
 * @module StickyHeader
 */
(function()
{
	/**
	 * @constructor 
	 */
	var StickyHeader = function()
	{
		var header = $('header');
		
		$(window).scroll(function()
		{
			if ($(this).scrollTop() > 1)
			{
				// animations are handled by css
				header.addClass("sticky");
			}
			else
			{
				header.removeClass("sticky");
			}
		});
	};

	namespace('springroll').StickyHeader = StickyHeader;

}());