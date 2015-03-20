/* ---- ScopeToggle.js ------ */
var tabContent = $('#classdocs .tab-content');

function toggleScope()
{
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    var val = retrieve(localStorage['show_' + which]);
    localStorage['show_' + which] = !val;
    //console.log('localStorage.show_' + which + ' set to: ' + localStorage['show_' + which]);
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
/* ----------------------- 
        Sidebar.js       
------------------------ */
var tabContent = $('#sidebar .tab-content');
var defaultView = 'classes';

/**
 * Respond to sidebar tab clicks.
 */
function onSidebarToggle()
{
    // visibility is handle through css, so unlike the 
    // scope-toggle, we only need to capture the event and 
    // store the data for page refresh
    var id = this.id || this[0].id;
    var view = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    localStorage.sidebar = view;
}

//store click events visibility
$('.sidebar-toggle').click(onSidebarToggle);

/**
 * Init tab-pane and nav-li elements on page to have a .active 
 * based on localStorage, or to default view if localStorage is null.
 * @param {String} view Which sidebar view to init
 */
var setActiveView = function(view)
{
    $('#tab-' + view + ', ' + '#api-' + view).addClass('active');
}(retrieve('sidebar') || defaultView);
/**
 * Retrieval of data from localStorage that handles from-String conversions.
 * @param {String} val Value to retrieve from localStorage
 */
function retrieve(val)
{
    //console.log('checkStorage', val);
    var stored = localStorage[val];
    //console.log('stored', stored);
    if (stored)
        return JSON.parse(stored);
    else
        return undefined;
}

/**
 * Retrieval of data from localStorage that handles to-String conversions.
 * @param {String} val Value to store in localStorage
 */
function store(val)
{
    //
}