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
        var highlightTop = $(hash).offset().top - ($('#classdocs').offset().top) - 10;
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