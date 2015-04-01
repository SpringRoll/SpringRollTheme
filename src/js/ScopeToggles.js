/**
 * Handles the visibility of scope items in the docs. Such as
 * 'private', 'inherited', etc.
 * @module ScopeToggle
 */
(function()
{
    //imports
    var Storage = null;

    //local static
    var _tabContent = null;

    /**
     * @class ScopeToggles
     * @constructor 
     */
    var ScopeToggles = function() {};

    var p = ScopeToggles.prototype = {};

    /**
     * @method init
     */
    p.init = function()
    {
        Storage = SpringRollTheme.Storage;
        _tabContent = $('#classdocs .tab-content');

        //toggle visibility
        $('.scope-toggle').change(_onScopeToggle);

        if (Storage.retrieve('show_inherited') !== false)
            _defaultOn.call($('#toggle-inherited'));
        if (Storage.retrieve('show_protected'))
            _defaultOn.call($('#toggle-protected'));
        if (Storage.retrieve('show_private'))
            _defaultOn.call($('#toggle-private'));
        if (Storage.retrieve('show_deprecated'))
            _defaultOn.call($('#toggle-deprecated'));
    };

    /**
     * @method _onScopeToggle
     * @private
     */
    var _onScopeToggle = function()
    {
        var id = this.id || this[0].id;
        //remove 'toggle-'
        var which = id.slice(id.lastIndexOf('-') + 1);
        var val = Storage.retrieve('show_' + which);
        //store a boolean in localStorage
        localStorage['show_' + which] = !val;
        //toggle show-[scope] on the content tab-pane,
        //css will handle the actual visibilty from there.
        _tabContent.toggleClass('show-' + which);
    };

    /**
     * Set the checkbox to 'on' and visibilty of tab-pane
     * @method _defaultOn
     * @private 
     */
    var _defaultOn = function()
    {
        this.prop('checked', true);
        var id = this.id || this[0].id;
        var which = id.slice(id.lastIndexOf('-') + 1); //remove 'toggle-'
        localStorage['show_' + which] = true;
        _tabContent.toggleClass('show-' + which);
    };

    //namespace
    SpringRollTheme.ScopeToggles = ScopeToggles.prototype;
}());