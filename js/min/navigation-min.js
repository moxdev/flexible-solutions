jQuery(window).load(function(e){var u=0,r=jQuery("<div>",{id:"mobile-menu"});jQuery(r).css("visibility","hidden"),jQuery(r).css("display","none"),jQuery("body").append(r);var i=jQuery("<ul>",{id:"mobile-main-nav"});jQuery(r).append(i);var s=jQuery("#primary-menu").html();jQuery(i).append(s);var n=jQuery("<ul>",{id:"mobile-aux-nav"});jQuery(r).append(n);var y=jQuery("#aux-menu").html();jQuery(n).append(y);var a=jQuery("<ul>",{id:"mobile-footer-nav"});jQuery(r).append(a);var l=jQuery("#footer-menu").html();jQuery(a).append(l),jQuery(".menu-toggle").attr("aria-controls","mobile-menu"),jQuery(".menu-toggle").on("click",function(){jQuery(this).hasClass("open")?(jQuery(this).toggleClass("open"),jQuery("#page").toggleClass("open"),jQuery(r).toggleClass("open"),setTimeout(function(){jQuery(r).css("visibility","hidden"),jQuery(r).css("display","none"),jQuery(r).css("z-index","-1")},500)):(jQuery(this).toggleClass("open"),jQuery("#page").toggleClass("open"),jQuery(r).toggleClass("open"),jQuery(r).css("visibility","visible"),jQuery(r).css("display","block"),jQuery(r).css("z-index","1"))})});
//# sourceMappingURL=./navigation-min.js.map