var tabContent = $('.tab-content');

//default
tabContent.toggleClass('show-inherited');
$('#api-show-inherited').addClass('active');

//toggle visibility
$('#api-show-inherited, #api-show-protected, #api-show-private, #api-show-deprecated')
    .click(function()
    {
        var which = this.id.slice('api-show-'.length);
        tabContent.toggleClass('show-'+which);
    });