!function(a){var b={};b.read=function(a){var b=localStorage[a];if(b)try{return JSON.parse(b)}catch(c){return null}return null},b.write=function(a,b){localStorage[a]=JSON.stringify(b)},namespace("springroll").Storage=b}(),function(){var a=include("springroll.Storage"),b={},c=$("html, body"),d=$("header .navbar"),e=($("#classdocs"),null),f=$(".docs-toggle a"),g=$(window),h=!0;b.init=function(){g.on("hashchange",i),setTimeout(i,0),f.on("show.bs.tab",function(){h&&(g.off("hashchange"),location.hash="",g.on("hashchange",i),a.write("tabView",$(this).parent().attr("id")))})};var i=function(){var b,f=location.hash;if(e&&(e.removeClass("active"),e=null),f)if(f.indexOf("_")>-1){var g=f.substr(1).split("_"),i={method:"#tab-methods a",property:"#tab-properties a",event:"#tab-events a",attr:"#tab-attributes a"};h=!1,$(i[g[0]]).tab("show"),h=!0;var j=$(f.replace(/\./g,"\\."));if(j.length>0){e=j,e.addClass("active");var k=e.offset().top;b=k-d.height(),c.scrollTop(b)}}else{var l=parseInt(f.substr(2)),m=$(".file .code .linenums").children().eq(l);m.addClass("active"),b=$(m).offset().top-d.height(),c.scrollTop(b)}else{var n=a.read("tabView")||"tab-index",o=$("#"+n+" a");h=!1,o.length||(o=$("#tab-index a")),o.tab("show"),h=!0}};namespace("springroll").Navigation=b}(),function(){var a=include("springroll.Storage"),b=null,c={};c.init=function(){b=$("#classdocs .tab-content"),null===a.read("show_inherited")&&a.write("show_inherited",!0),a.read("show_inherited")&&e.call($("#toggle-inherited")),a.read("show_protected")&&e.call($("#toggle-protected")),a.read("show_private")&&e.call($("#toggle-private")),a.read("show_deprecated")&&e.call($("#toggle-deprecated")),$(".scope-toggle").change(d)};var d=function(){var c=this.id||this[0].id,d=c.slice(c.lastIndexOf("-")+1),e=a.read("show_"+d);a.write("show_"+d,!e),b.toggleClass("show-"+d)},e=function(){this.prop("checked",!0);var c=this.id||this[0].id,d=c.slice(c.lastIndexOf("-")+1);this.bootstrapToggle("on"),a.write("show_"+d,!0),b.addClass("show-"+d)};namespace("springroll").ScopeToggles=c}(),function(){var a=null,b=null,c=null,d=function(){b=$("#api-filter"),c=$("#sidebar .btn-close"),c.addClass("hidden"),b.keyup(function(b){a=this.value,d.apply(a)}),c.click(function(c){b[0].value=a=null,d.apply()})};d.apply=function(){var b=$("#sidebar .collapse.active ul").children();if(a){c.removeClass("hidden");var d=new RegExp(a,"i");b.each(function(){var a=$(this);a.removeClass("hidden");var b=a.text().replace(/ /g,"");d.test(b)||a.addClass("hidden")})}else b.removeClass("hidden"),c.addClass("hidden")},namespace("springroll").SearchBar=d}(),function(){var a=include("springroll.Storage"),b=["toggle-classes","toggle-modules"],c={};c.init=function(){if($(window).width()>764){var c="#"+(a.read("activeSidebar")||b[0]),e=$(c);e.addClass("active");var f=e.data("target");$(f).show().addClass("active")}$(".sidebar-toggle").click(d)};var d=function(c){var d=$(this).data("target");a.write("activeSidebar",this.id);for(var e=0;e<b.length;e++)if(b[e]!=this.id){var f=$("#"+b[e]);if(f.hasClass("active"))return f.removeClass("active"),$(f.data("target")).hide().removeClass("active"),$(d).show().addClass("active"),$(this).addClass("active"),void springroll.SearchBar.apply()}$(this).hasClass("active")?$(window).width()<764&&($(this).removeClass("active"),$(d).slideUp().removeClass("active")):($(d).slideDown().addClass("active"),$(this).addClass("active"))};namespace("springroll").Sidebar=c}(),$(function(){include("springroll.Navigation").init(),include("springroll.Sidebar").init(),include("springroll.ScopeToggles").init(),include("springroll.SearchBar")()});