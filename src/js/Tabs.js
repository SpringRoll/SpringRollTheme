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