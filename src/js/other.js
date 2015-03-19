/* ----- Other.js ------- */
// $('.nav .nav-tabs').click(function() {
//     var href= href.substr(href.lastIndexOf('#'));
//     localStorage.api = href; 
// });

if (!localStorage.api) localStorage.api = '#tab-modules';
console.log($(localStorage.api));
$(localStorage.api).click();
