/* ---- Button.js ------ */
var tabContent = $('.tab-content');

function onToggleScope()
{
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-')+1); // remove 'toggle-'
    var val = checkStorage(localStorage['show_' + which]);
    localStorage['show_' + which] = !val;
    //console.log('localStorage.show_' + which + ' set to: ' + localStorage['show_' + which]);
    tabContent.toggleClass('show-' + which);
}


//toggle visibility
$('.scope-toggle').change(onToggleScope);

function defaultOn()
{
    this.prop('checked', true);
    var id = this.id || this[0].id;
    var which = id.slice(id.lastIndexOf('-')+1); // remove 'toggle-'
    localStorage['show_' + which] = true;
    tabContent.toggleClass('show-' + which);
}

function checkStorage(val)
{
    //console.log('checkStorage', val);
    var stored = localStorage[val];
    //console.log('stored', stored);
    if (stored) return JSON.parse(stored);
    else return undefined;
}
if (checkStorage('show_inherited') !== false)
    defaultOn.call($('#toggle-inherited'));
if (checkStorage('show_protected'))
    defaultOn.call($('#toggle-protected'));
if (checkStorage('show_private'))
    defaultOn.call($('#toggle-private'));
if (checkStorage('show_deprecated'))
    defaultOn.call($('#toggle-deprecated'));