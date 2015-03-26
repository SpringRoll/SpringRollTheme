/**
 * 
 */
(function()
{
    var USE_SCROLL = true;

    var Navigation = {};
    
    var p = Navigation.prototype = {};

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

    $('.index-item').click(function(e)
    {
        //deactive the current index panel
        setActiveTab('#docs-', 'index', false);
        hash = $(this).children('a')[0].hash;
        var underscore = hash.indexOf('_');
        var tab = hash.slice(1, underscore);

        // YuiDocs gives each list-item li id a singular id name (method, property, event)
        // when we actually need a plural to match the naming of tab panel ids (methods, properties)
        if (tab === 'property')
            tab = 'properties';
        else
            tab += 's';
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
            $("html, body").delay(50).animate(
            {
                scrollTop: scrollTop
            }, scrollLength);
        }
    });

    SpringRollTheme.Navigation = Navigation.prototype;
}());
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
/**
 *
 */
(function()
{
    var _toggleIds = ['toggle-classes', 'toggle-modules'];

    var Sidebar = {};

    var p = Sidebar.prototype = {};

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
        $('.sidebar-toggle').click(this.toggle);
    };

    /**
     *  Respond to sidebar tab clicks. Store the most recently 
     *  clicked/viewed tab. 
     *  @param {jQuery} event
     */
    p.toggle = function(event)
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

    SpringRollTheme.Sidebar = Sidebar.prototype;
}());
/**
 *
 */
(function()
{
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
 *
 */
(function()
{
    var Storage = {};

    var p = Storage.prototype = {};

    /**
     * Retrieval of data from localStorage that handles from-String conversions.
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

    SpringRollTheme.Storage = Storage.prototype;
}());
/**
 *
 */
(function()
{
    var Tabs = {};

    var p = Tabs.prototype = {};

    p.init = function()
    {
        // Some pages may not have all the tabs. e.g. many pages don't have a 
        // 'properties' tab, but if the local storage was on properteies, the page 
        // will try to set that non-existant tab-pane to active, 
        // so instead go to the index...
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
     *  Respond to sidebar tab clicks. Store the most recently 
     *  clicked/viewed tab. 
     *  @param {jQuery} event
     */
    p.toggle = function(event)
    {
        // Visibility is handle through css, so unlike the 
        // scope-toggle, we only need to capture the event and 
        // store the data for page refresh
        var id = this.id || this[0].id;
        var view = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
        localStorage[event.data.storageVar] = view;
    };

    /**
     *  Init tab-pane and nav-li elements on page to have a .active 
     *  based on localStorage, or to default view if localStorage is null.
     *  @param {String} view Which sidebar view to init
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

    SpringRollTheme.Tabs = Tabs.prototype;
}());
/**
 *
 */
(function()
{
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
    SpringRollTheme.Sidebar.init();
    SpringRollTheme.Tabs.init();
    SpringRollTheme.ScopeToggles.init();
    SpringRollTheme.SearchBar();
    SpringRollTheme.StickyHeader();
    setTimeout(SpringRollTheme.Navigation.gotoLine, 0);
});