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