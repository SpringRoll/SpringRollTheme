var index = $('#index');
var methods = $('#methods');
var properties = $('#properties');
var attributes = $('#attributes');
var events = $('#events');

var switchGroup = $(".switch-group");
switchGroup.click(function()
{
    switchGroup.each(function() {
        $(this).removeClass('active');
    });
    $(this).addClass('active');
    

    var classes = this.className.split(/\s+/);
    for (var i = 0, len = classes.length; i < len; i++)
    {
        var c = classes[i];
        var switchTo = "switchTo__";
        if (c.indexOf(switchTo) > -1)
        {
            switchClassDocTabs($('#' + c.substr(switchTo.length)));
            return;
        }
    }
});

function switchClassDocTabs(switchTo)
{
    index.hide();
    methods.hide();
    properties.hide();
    attributes.hide();
    events.hide();

    switchTo.show();
}