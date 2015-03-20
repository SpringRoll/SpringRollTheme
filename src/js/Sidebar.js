/* ----------------------- 
        Sidebar.js       
------------------------ */
var defaultSidebar = 'classes';
var defaultDoc = 'index';

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
    localStorage.activeSidebar = view;
}

//store click events visibility
$('.sidebar-toggle').click(onSidebarToggle);

/**
 * Init tab-pane and nav-li elements on page to have a .active 
 * based on localStorage, or to default view if localStorage is null.
 * @param {String} view Which sidebar view to init
 */
var setActiveSidebar = function(view)
{
    $('#tab-' + view).addClass('active');
    $('#api-' + view).addClass('active');
}(localStorage.activeSidebar || defaultSidebar);

var setActiveDocs = function(view)
{
    console.log('setActiveDocs', view);
    $('#tab-' + view).addClass('active');
    $('#docs-' + view).addClass('active');
}(localStorage.activeDocs || defaultDoc);