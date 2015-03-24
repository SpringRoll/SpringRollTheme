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
/* ---- ScopeToggle.js ------ */
var tabContent = $('#classdocs .tab-content');

function toggleScope()
{
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    var val = retrieve(localStorage['show_' + which]);
    localStorage['show_' + which] = !val;
    tabContent.toggleClass('show-' + which);
}

//toggle visibility
$('.scope-toggle').change(toggleScope);

function defaultOn()
{
    this.prop('checked', true);
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    localStorage['show_' + which] = true;
    tabContent.toggleClass('show-' + which);
}

if (retrieve('show_inherited') !== false)
    defaultOn.call($('#toggle-inherited'));
if (retrieve('show_protected'))
    defaultOn.call($('#toggle-protected'));
if (retrieve('show_private'))
    defaultOn.call($('#toggle-private'));
if (retrieve('show_deprecated'))
    defaultOn.call($('#toggle-deprecated'));
/* ----- Search.js ------- */

var searchBar = $("#api-filter").keyup(function(e)
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
var $header = $('header');

$(window).scroll(function()
{
    if ($(this).scrollTop() > 1)
    {
        // animations are handled by css
        $header.addClass("sticky");
    }
    else
    {
        $header.removeClass("sticky");
    }
});
/**
 * Retrieval of data from localStorage that handles from-String conversions.
 * @param {String} val Value to retrieve from localStorage
 */
function retrieve(val)
{
    var stored = localStorage[val];
    if (stored)
    {
        return JSON.parse(stored);
    }
    return undefined;
}
/**
 *  Respond to sidebar tab clicks. Store the most recently 
 *  clicked/viewed tab. 
 *  @param {jQuery} event
 */
function onTabToggle(event)
{
    // visibility is handle through css, so unlike the 
    // scope-toggle, we only need to capture the event and 
    // store the data for page refresh
    var id = this.id || this[0].id;
    var view = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    localStorage[event.data.storageVar] = view;
}

//store click events visibility
$('.sidebar-toggle').click(
{
    storageVar: "activeSidebar"
}, onTabToggle);
$('.docs-toggle').click(
{
    storageVar: "activeDocs"
}, onTabToggle);

/**
 *  Init tab-pane and nav-li elements on page to have a .active 
 *  based on localStorage, or to default view if localStorage is null.
 *  @param {String} view Which sidebar view to init
 */
var setActiveTab = function(paneId, view, activate)
{
    if (activate === false)
    {
        $('#tab-' + view).removeClass('active');
        $(paneId + view).removeClass('active');
    }
    else
    {
        $('#tab-' + view).addClass('active');
        $(paneId + view).addClass('active');
    }
};

setActiveTab('#api-', localStorage.activeSidebar || 'classes');
setActiveTab('#docs-', localStorage.activeDocs || 'index');