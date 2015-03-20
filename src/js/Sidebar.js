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
    $('#tab-' + view).addClass('active');
    $('#api-' + view).addClass('active');
}(localStorage.sidebar || defaultView);