var USE_SCROLL = true;
$('.index-item').click(function(e)
{
	console.log("click");
	//deactive the current index panel
	setActiveTab('#docs-', 'index', false);
	hash = $(this).children('a')[0].hash;
	var underscore = hash.indexOf('_');
	var tab = hash.slice(1, underscore);

	// YuiDocs gives each list-item li id a singular id name (method, property, event)
	// when we actually need a plural to match the naming of tab panel ids (methods, properties)
	if (tab === 'property') tab = 'properties';
	else tab += 's';
	var item = hash.slice(underscore + 1);

	// set which tab
	setActiveTab('#docs-', tab);

	// note: we don't have to manage the deep link to the item because
	// the href to an id takes care of itself, but here's a scrolling
    // version if you're feeling slick 
	if (USE_SCROLL)
	{
		e.preventDefault();
		var scrollTop = $(hash).offset().top - $('header').height();
		var scrollLength = Math.abs($(window).scrollTop() - scrollTop);
		scrollLength = Math.min(Math.max(parseInt(scrollLength), 300), 1000);
		console.log(scrollLength);
		$("html, body").delay(50).animate(
		{
			scrollTop: scrollTop
		}, scrollLength);
	}
});