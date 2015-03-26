/**
 *
 */
(function()
{
    var Storage = null;
    var _tabContent = $('#classdocs .tab-content');

    var ScopeToggles = {};
    
    var p = ScopeToggles.prototype = {};

    p.init = function()
    {
        Storage = SpringRollTheme.Storage;
        //toggle visibility
        $('.scope-toggle').change(this.toggle);

        if (Storage.retrieve('show_inherited') !== false)
            this.defaultOn.call($('#toggle-inherited'));
        if (Storage.retrieve('show_protected'))
            this.defaultOn.call($('#toggle-protected'));
        if (Storage.retrieve('show_private'))
            this.defaultOn.call($('#toggle-private'));
        if (Storage.retrieve('show_deprecated'))
            this.defaultOn.call($('#toggle-deprecated'));
    };

    p.toggle = function()
    {
        var id = this.id || this[0].id;
        var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
        var val = Storage.retrieve('show_' + which);
        localStorage['show_' + which] = !val;
        _tabContent.toggleClass('show-' + which);
    };

    p.defaultOn = function()
    {
        this.prop('checked', true);
        var id = this.id || this[0].id;
        var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
        localStorage['show_' + which] = true;
        _tabContent.toggleClass('show-' + which);
    };

    SpringRollTheme.ScopeToggles = ScopeToggles.prototype;
}());