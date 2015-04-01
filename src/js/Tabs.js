/**
 * @module Tabs
 */
(function()
{
    /**
     * @constructor
     */
    var Tabs = {};

    var p = Tabs.prototype = {};

    /**
     * @method init
     */
    p.init = function()
    {
        //Some pages may not have all the tabs. e.g. many pages don't have a 
        //'properties' tab, but if the local storage was on properteies, the page 
        //will try to set that non-existant tab-pane to active, 
        //so instead go to the index...
        if ($(localStorage.activeDocs).length !== 0)
            this.setActiveTab('#docs-', localStorage.activeDocs);
        else
            this.setActiveTab('#docs-', 'index');

        //store click events visibility
        $('.docs-toggle').click(
        {
            storageVar: 'activeDocs'
        }, this.toggle);
    };

    /**
     * Respond to sidebar tab clicks. Store the most recently 
     * clicked/viewed tab. 
     * @method toggle
     * @param {jQuery} event
     */
    p.toggle = function(event)
    {
        //Visibility is handle through css, so unlike the 
        //scope-toggle, we only need to capture the event and 
        //store the data for page refresh
        var id = this.id || this[0].id;
        //remove 'toggle-'
        var view = id.slice(id.lastIndexOf('-') + 1);
        localStorage[event.data.storageVar] = view;
    };

    /**
     * Init tab-pane and nav-li elements on page to have a .active 
     * based on localStorage, or to default view if localStorage is null.
     * @method setActiveTab
     * @param {String} view Which sidebar view to init
     */
    p.setActiveTab = function(paneId, view, activate)
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

    //namespace
    SpringRollTheme.Tabs = Tabs.prototype;
}());