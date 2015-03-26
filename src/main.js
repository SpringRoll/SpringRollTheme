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