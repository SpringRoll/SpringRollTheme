/**
 * 
 */
(function()
{
    //const
    var SCROLLING = {
        ENABLED: true,
        TIME:
        {
            MIN: 300,
            MAX: 800
        }
    };

    /**
     * @constructor 
     */
    var Navigation = function() {};

    //extend
    var p = Navigation.prototype = {};

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
            _setActiveTab('#docs-', localStorage.activeDocs);
        else
            _setActiveTab('#docs-', 'index');

        //store click events visibility
        $('.docs-toggle').click(
        {
            storageVar: 'activeDocs'
        }, _onDocsToggle);

        //switch tabs on index item click
        $('.index-item').click(_onIndexItemClick);
    };

    /**
     * @method gotoLine
     */
    p.gotoLine = function()
    {
        var href = $(location).attr('href');
        if (href.indexOf('src') > -1)
        {
            var lineNumber = href.slice(href.lastIndexOf('#') + 2);
            var li = $('.file .code .linenums').children().eq(lineNumber);
            li.addClass('active');
            var scrollTop = $(li).offset().top - $('header').height();
            $('body').scrollTop(scrollTop);
        }
    };

    /**
     * @method _onIndexItemClick
     * @private 
     * @param {jQuery Event} e
     */
    var _onIndexItemClick = function(e)
    {
        //deactive the current index panel
        _setActiveTab('#docs-', 'index', false);

        hash = $(this).children('a')[0].hash;
        var underscore = hash.indexOf('_');
        var tab = hash.slice(1, underscore);

        //YuiDocs gives each list-item li id a singular id name (method, property, event)
        //when we actually need a plural to match the naming of tab panel ids (methods, properties)
        if (tab === 'property')
            tab = 'properties';
        else
            tab += 's';
        var item = hash.slice(underscore + 1);

        //set which tab
        _setActiveTab('#docs-', tab);

        //note: we don't have to manage the deep link to the item because
        //the href to an id takes care of itself, but here's a scrolling
        //version if you're feeling slick 
        var scrollTop = $(hash).offset().top - ($('header').height() + 20);
        var scrollLength = Math.abs($(window).scrollTop() - scrollTop);
        scrollLength = Math.min(Math.max(parseInt(scrollLength), SCROLLING.TIME.MIN), SCROLLING.TIME.MAX);
        if (SCROLLING.ENABLED)
        {
            e.preventDefault();
            $('html, body').delay(50).animate(
            {
                scrollTop: scrollTop
            }, scrollLength);
        }
        var highlightTop = $(hash).offset().top - ($('#classdocs').offset().top);
        _moveHighlight(highlightTop, scrollLength);
    };

    /**
     * @method _moveHighlight
     * @param {Number} top
     * @param {int} time Animation length in milliseconds
     */
    var _moveHighlight = function(top, time)
    {
        var opacity = top === 0 ? 0 : 0.25;
        time = top === 0 ? 0 : time;
        $('#docs-highlight').animate(
        {
            top: top,
            opacity: opacity
        }, time);
    };

    /**
     * Respond to tab pane nav clicks. Store the most recently 
     * clicked/viewed tab. 
     * @method toggle
     * @private
     * @param {jQuery} event
     */
    var _onDocsToggle = function(event)
    {
        _moveHighlight(0, 0);
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
     * @method _setActiveTab
     * @private
     * @param {String} view Which sidebar view to init
     */
    var _setActiveTab = function(paneId, view, activate)
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
    SpringRollTheme.Navigation = Navigation.prototype;
}());
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
/**
 * Handles collapsing and switching of panes in the sidebar
 * @module Sidebar
 */
(function()
{
    var _toggleIds = ['toggle-classes', 'toggle-modules'];

    /**
     * @constructor 
     */
    var Sidebar = function() {};

    var p = Sidebar.prototype = {};

    /**
     * @method init 
     */
    p.init = function()
    {
        if ($(window).width() > 764)
        {
            var activeSidebar = '#' + (SpringRollTheme.Storage.retrieve('activeSidebar') || _toggleIds[0]);
            var button = $(activeSidebar);
            button.addClass('active');
            var target = button.data('target');
            $(target).show().addClass('active');
        }

        //store click events visibility
        $('.sidebar-toggle').click(_onApiToggle);
    };

    /**
     * Respond to sidebar tab clicks. Store the most recently 
     * clicked/viewed tab. 
     * @method _onApiToggle
     * @private 
     * @param {jQuery} event
     */
    var _onApiToggle = function(event)
    {
        var target = $(this).data('target');
        // Visibility is handle through css, so unlike the 
        // scope-toggle, we only need to capture the event and 
        // store the data for page refresh
        localStorage.activeSidebar = this.id;

        for (var i = 0; i < _toggleIds.length; i++)
        {
            if (_toggleIds[i] == this.id)
                continue;

            // if another dropdown is already open,
            // swap them like they are tab-panes
            var otherToggle = $('#' + _toggleIds[i]);
            if (otherToggle.hasClass('active'))
            {
                //remove old actives
                otherToggle.removeClass('active');
                $(otherToggle.data('target')).hide().removeClass('active');
                //add new actives
                $(target).show().addClass('active');
                $(this).addClass('active');
                return;
            }
        }

        // if no other was active... 
        if ($(this).hasClass('active'))
        {
            // don't collapse the nav in bigger sizes
            if ($(window).width() < 764)
            {
                $(this).removeClass('active');
                $(target).slideUp().removeClass('active');
            }
        }
        else
        {
            $(target).slideDown().addClass('active');
            $(this).addClass('active');
        }
    };

    //namespace
    SpringRollTheme.Sidebar = Sidebar.prototype;
}());
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

    SpringRollTheme.StickyHeader = StickyHeader;
}());
/**
 * @module Storage
 */
(function()
{
    /**
     * @constructor 
     */
    var Storage = function() {};

    var p = Storage.prototype = {};

    /**
     * Retrieval of data from localStorage that handles from-String conversions.
     * @method retrieve 
     * @param {String} val Value to retrieve from localStorage
     */
    p.retrieve = function(val)
    {
        var stored = localStorage[val];
		console.log('retrieve', val, stored);
        if (stored)
        {
            switch (stored)
            {
                case 'true':
                case 'false':
                    return JSON.parse(stored);
                default:
                    return stored;
            }
        }
        return undefined;
    };

    //namespace
    SpringRollTheme.Storage = Storage.prototype;
}());
/**
 * The search bar/class filter in the side bar
 * @module Search
 */
(function()
{
	/**
	* @constructor 
	*/
	var SearchBar = function()
	{
		$("#api-filter").keyup(function(e)
		{
			var items = $('#sidebar .collapse.active ul').children();
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
	};

	SpringRollTheme.SearchBar = SearchBar;
}());
function SpringRollTheme()
{};

$(document).ready(function()
{
    SpringRollTheme.Navigation.init();
    SpringRollTheme.Sidebar.init();
    SpringRollTheme.ScopeToggles.init();
    SpringRollTheme.SearchBar();
    SpringRollTheme.StickyHeader();
    setTimeout(SpringRollTheme.Navigation.gotoLine, 0);
});