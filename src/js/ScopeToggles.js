/* ---- ScopeToggle.js ------ */
var tabContent = $('#classdocs .tab-content');

function toggleScope()
{
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-') + 1); // remove 'toggle-'
    var val = retrieve(localStorage['show_' + which]);
    localStorage['show_' + which] = !val;
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