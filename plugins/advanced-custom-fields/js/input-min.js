var acf={ajaxurl:"",admin_url:"",wp_version:"",post_id:0,nonce:"",l10n:null,o:null,helpers:{get_atts:null,version_compare:null,uniqid:null,sortable:null,add_message:null,is_clone_field:null,url_to_object:null},validation:null,conditional_logic:null,media:null,fields:{date_picker:null,color_picker:null,Image:null,file:null,wysiwyg:null,gallery:null,relationship:null}};!function($){acf.helpers.isset=function(){var e=arguments,t=e.length,a=null,n;if(0===t)throw new Error("Empty isset");for(a=e[0],i=1;i<t;i++){if(e[i]===n||a[e[i]]===n)return!1;a=a[e[i]]}return!0},acf.helpers.get_atts=function(e){var t={};return $.each(e[0].attributes,function(e,i){"data-"==i.name.substr(0,5)&&(t[i.name.replace("data-","")]=i.value)}),t},acf.helpers.version_compare=function(e,t){if(typeof e+typeof t!="stringstring")return!1;for(var i=e.split("."),a=t.split("."),n=0,s=Math.max(i.length,a.length);n<s;n++){if(i[n]&&!a[n]&&parseInt(i[n])>0||parseInt(i[n])>parseInt(a[n]))return 1;if(a[n]&&!i[n]&&parseInt(a[n])>0||parseInt(i[n])<parseInt(a[n]))return-1}return 0},acf.helpers.uniqid=function(){return(new Date).getTime()},acf.helpers.url_to_object=function(e){var t={},a=e.split("&");for(i in a){var n=a[i].split("=");t[decodeURIComponent(n[0])]=decodeURIComponent(n[1])}return t},acf.helpers.sortable=function(e,t){return t.children().each(function(){$(this).width($(this).width())}),t},acf.helpers.is_clone_field=function(e){return!(!e.attr("name")||-1==e.attr("name").indexOf("[acfcloneindex]"))},acf.helpers.add_message=function(e,t){var e=$('<div class="acf-message-wrapper"><div class="message updated"><p>'+e+"</p></div></div>");t.prepend(e),setTimeout(function(){e.animate({opacity:0},250,function(){e.remove()})},1500)},$.fn.exists=function(){return $(this).length>0},acf.media={div:null,frame:null,render_timout:null,clear_frame:function(){this.frame&&(this.frame.detach(),this.frame.dispose(),this.frame=null)},type:function(){var e="thickbox";return"undefined"!=typeof wp&&(e="backbone"),e},init:function(){if("backbone"!==this.type())return!1;if(!acf.helpers.isset(wp,"media","view","AttachmentCompat","prototype"))return!1;var e=wp.media.view.AttachmentCompat.prototype;e.orig_render=e.render,e.orig_dispose=e.dispose,e.className="compat-item acf_postbox no_box",e.render=function(){var e=this;return e.ignore_render?this:(this.orig_render(),setTimeout(function(){var t=e.$el.closest(".media-modal");if(!t.hasClass("acf-media-modal")&&!t.find(".media-frame-router .acf-expand-details").exists()){var i=$(['<a href="#" class="acf-expand-details">','<span class="icon"></span>','<span class="is-closed">'+acf.l10n.core.expand_details+"</span>",'<span class="is-open">'+acf.l10n.core.collapse_details+"</span>","</a>"].join(""));i.on("click",function(e){e.preventDefault(),t.hasClass("acf-expanded")?t.removeClass("acf-expanded"):t.addClass("acf-expanded")}),t.find(".media-frame-router").append(i)}},0),clearTimeout(acf.media.render_timout),acf.media.render_timout=setTimeout(function(){$(document).trigger("acf/setup_fields",[e.$el])},50),this)},e.dispose=function(){$(document).trigger("acf/remove_fields",[this.$el]),this.orig_dispose()},e.save=function(e){var t={},i={};e&&e.preventDefault(),_.each(this.$el.serializeArray(),function(e){"[]"===e.name.slice(-2)&&(e.name=e.name.replace("[]",""),void 0===i[e.name]&&(i[e.name]=-1),i[e.name]++,e.name+="["+i[e.name]+"]"),t[e.name]=e.value}),this.ignore_render=!0,this.model.saveCompat(t)}}},acf.conditional_logic={items:[],init:function(){var e=this;$(document).on("change",".field input, .field textarea, .field select",function(){$("#acf-has-changed").exists()&&$("#acf-has-changed").val(1),e.change($(this))}),$(document).on("acf/setup_fields",function(t,i){e.refresh($(i))}),e.refresh()},change:function(e){var t=this,i=e.closest(".field"),a=i.attr("data-field_key");$.each(this.items,function(e,i){$.each(i.rules,function(e,n){n.field==a&&t.refresh_field(i)})})},refresh_field:function(e){var t=this;$(".field_key-"+e.field).each(function(){var i=!0;"any"==e.allorany&&(i=!1);var a=$(this),n=!0;$.each(e.rules,function(s,o){var l=$(".field_key-"+o.field);l.hasClass("sub_field")&&(l=a.siblings(".field_key-"+o.field),n=!1,l.exists()||(a.parents("tr").each(function(){if(l=$(this).find(".field_key-"+o.field),l.exists())return!1}),n=!0));var r=a.parent("tr").parent().parent("table").parent(".layout");r.exists()&&(n=!0,a.is("th")&&l.is("th")&&(l=a.closest(".layout").find("td.field_key-"+o.field)));var r=a.parent("tr").parent().parent("table").parent(".repeater");r.exists()&&"1"==r.attr("data-max_rows")&&(n=!0,a.is("th")&&l.is("th")&&(l=a.closest("table").find("td.field_key-"+o.field)));var c=t.calculate(o,l,a);if("all"==e.allorany){if(0==c)return i=!1,!1}else if(1==c)return i=!0,!1}),a.removeClass("acf-conditional_logic-hide acf-conditional_logic-show acf-show-blank"),i?(a.find("input, textarea, select").removeAttr("disabled"),a.addClass("acf-conditional_logic-show"),$(document).trigger("acf/conditional_logic/show",[a,e])):(a.find("input, textarea, select").attr("disabled","disabled"),a.addClass("acf-conditional_logic-hide"),n||a.addClass("acf-show-blank"),$(document).trigger("acf/conditional_logic/hide",[a,e]))})},refresh:function(e){e=e||$("body");var t=this;$.each(this.items,function(i,a){$.each(a.rules,function(i,n){e.find('.field[data-field_key="'+a.field+'"]').exists()&&t.refresh_field(a)})})},calculate:function(e,t,i){var a=!1;if(t.hasClass("field_type-true_false")||t.hasClass("field_type-checkbox")||t.hasClass("field_type-radio")){var n=t.find('input[value="'+e.value+'"]:checked').exists();"=="==e.operator?n&&(a=!0):n||(a=!0)}else{var s=t.find("input, textarea, select").last().val();$.isArray(s)||(s=[s]),"=="==e.operator?$.inArray(e.value,s)>-1&&(a=!0):$.inArray(e.value,s)<0&&(a=!0)}return a}},$(document).ready(function(){acf.conditional_logic.init(),$(".acf_postbox > .inside > .options").each(function(){$(this).closest(".acf_postbox").addClass($(this).attr("data-layout"))}),$('#metakeyselect option[value^="field_"]').remove()}),$(window).load(function(){acf.media.init(),setTimeout(function(){try{$.isNumeric(acf.o.post_id)&&(wp.media.view.settings.post.id=acf.o.post_id)}catch(e){}$(document).trigger("acf/setup_fields",[$("#poststuff")])},10)}),acf.fields.gallery={add:function(){},edit:function(){},update_count:function(){},hide_selected_items:function(){},text:{title_add:"Select Images"}}}(jQuery),function($){function e(){var e=[];$(".categorychecklist input:checked, .acf-taxonomy-field input:checked, .acf-taxonomy-field option:selected").each(function(){$(this).is(":hidden")||$(this).is(":disabled")||$(this).closest(".media-frame").exists()||$(this).closest(".acf-taxonomy-field").exists()&&"0"==$(this).closest(".acf-taxonomy-field").attr("data-load_save")||-1===e.indexOf($(this).val())&&e.push($(this).val())}),acf.screen.post_category=e,acf.screen.taxonomy=e,$(document).trigger("acf/update_field_groups")}acf.screen={action:"acf/location/match_field_groups_ajax",post_id:0,page_template:0,page_parent:0,page_type:0,post_category:0,post_format:0,taxonomy:0,lang:0,nonce:0},$(document).ready(function(){if(acf.screen.post_id=acf.o.post_id,acf.screen.nonce=acf.o.nonce,$("#icl-als-first").length>0){var e=$("#icl-als-first").children("a").attr("href"),t=new RegExp("lang=([^&#]*)"),i=t.exec(e);acf.screen.lang=i[1]}}),$(document).on("acf/update_field_groups",function(){if(!acf.screen.post_id||!$.isNumeric(acf.screen.post_id))return!1;$.ajax({url:ajaxurl,data:acf.screen,type:"post",dataType:"json",success:function(e){return!!e&&($(".acf_postbox").addClass("acf-hidden"),$(".acf_postbox-toggle").addClass("acf-hidden"),0!=e.length&&($.each(e,function(e,t){var i=$("#acf_"+t),a=$('#adv-settings .acf_postbox-toggle[for="acf_'+t+'-hide"]');i.removeClass("acf-hidden hide-if-js"),a.removeClass("acf-hidden"),a.find('input[type="checkbox"]').attr("checked","checked"),i.find(".acf-replace-with-fields").each(function(){var e=$(this);$.ajax({url:ajaxurl,data:{action:"acf/post/render_fields",acf_id:t,post_id:acf.o.post_id,nonce:acf.o.nonce},type:"post",dataType:"html",success:function(t){e.replaceWith(t),$(document).trigger("acf/setup_fields",i)}})})}),void $.ajax({url:ajaxurl,data:{action:"acf/post/get_style",acf_id:e[0],nonce:acf.o.nonce},type:"post",dataType:"html",success:function(e){$("#acf_style").html(e)}})))}})}),$(document).on("change","#page_template",function(){acf.screen.page_template=$(this).val(),$(document).trigger("acf/update_field_groups")}),$(document).on("change","#parent_id",function(){var e=$(this).val();""!=e?(acf.screen.page_type="child",acf.screen.page_parent=e):(acf.screen.page_type="parent",acf.screen.page_parent=0),$(document).trigger("acf/update_field_groups")}),$(document).on("change",'#post-formats-select input[type="radio"]',function(){var e=$(this).val();"0"==e&&(e="standard"),acf.screen.post_format=e,$(document).trigger("acf/update_field_groups")}),$(document).on("change",".categorychecklist input, .acf-taxonomy-field input, .acf-taxonomy-field select",function(){$(this).closest(".acf-taxonomy-field").exists()&&"0"==$(this).closest(".acf-taxonomy-field").attr("data-save")||$(this).closest(".media-frame").exists()||setTimeout(function(){e()},1)})}(jQuery),function($){var e=acf.fields.color_picker={$el:null,$input:null,set:function(e){return $.extend(this,e),this.$input=this.$el.find('input[type="text"]'),this},init:function(){var e=this.$input;acf.helpers.is_clone_field(e)||this.$input.wpColorPicker()}};$(document).on("acf/setup_fields",function(t,i){$(i).find(".acf-color_picker").each(function(){e.set({$el:$(this)}).init()})})}(jQuery),function($){acf.fields.date_picker={$el:null,$input:null,$hidden:null,o:{},set:function(e){return $.extend(this,e),this.$input=this.$el.find('input[type="text"]'),this.$hidden=this.$el.find('input[type="hidden"]'),this.o=acf.helpers.get_atts(this.$el),this},init:function(){if(!acf.helpers.is_clone_field(this.$hidden)){this.$input.val(this.$hidden.val());var e=$.extend({},acf.l10n.date_picker,{dateFormat:this.o.save_format,altField:this.$hidden,altFormat:this.o.save_format,changeYear:!0,yearRange:"-100:+100",changeMonth:!0,showButtonPanel:!0,firstDay:this.o.first_day});this.$input.addClass("active").datepicker(e),this.$input.datepicker("option","dateFormat",this.o.display_format),$("body > #ui-datepicker-div").length>0&&$("#ui-datepicker-div").wrap('<div class="ui-acf" />')}},blur:function(){this.$input.val()||this.$hidden.val("")}},$(document).on("acf/setup_fields",function(e,t){$(t).find(".acf-date_picker").each(function(){acf.fields.date_picker.set({$el:$(this)}).init()})}),$(document).on("blur",'.acf-date_picker input[type="text"]',function(e){acf.fields.date_picker.set({$el:$(this).parent()}).blur()})}(jQuery),function($){var e=acf.media;acf.fields.file={$el:null,$input:null,o:{},set:function(e){return $.extend(this,e),this.$input=this.$el.find('input[type="hidden"]'),this.o=acf.helpers.get_atts(this.$el),this.o.multiple=!!this.$el.closest(".repeater").exists(),this.o.query={},"uploadedTo"==this.o.library&&(this.o.query.uploadedTo=acf.o.post_id),this},init:function(){acf.helpers.is_clone_field(this.$input)},add:function(t){var i=e.div;i.find(".acf-file-icon").attr("src",t.icon),i.find(".acf-file-title").text(t.title),i.find(".acf-file-name").text(t.name).attr("href",t.url),i.find(".acf-file-size").text(t.size),i.find(".acf-file-value").val(t.id).trigger("change"),i.addClass("active"),i.closest(".field").removeClass("error")},edit:function(){var t=this.$input.val();e.div=this.$el,e.clear_frame(),e.frame=wp.media({title:acf.l10n.file.edit,multiple:!1,button:{text:acf.l10n.file.update}}),e.frame.on("open",function(){"browse"!=e.frame.content._mode&&e.frame.content.mode("browse"),e.frame.$el.closest(".media-modal").addClass("acf-media-modal acf-expanded");var i=e.frame.state().get("selection"),a=wp.media.attachment(t);$.isEmptyObject(a.changed)&&a.fetch(),i.add(a)}),e.frame.on("close",function(){e.frame.$el.closest(".media-modal").removeClass("acf-media-modal")}),acf.media.frame.open()},remove:function(){this.$el.find(".acf-file-icon").attr("src",""),this.$el.find(".acf-file-title").text(""),this.$el.find(".acf-file-name").text("").attr("href",""),this.$el.find(".acf-file-size").text(""),this.$el.find(".acf-file-value").val("").trigger("change"),this.$el.removeClass("active")},popup:function(){var t=this;return e.div=this.$el,e.clear_frame(),e.frame=wp.media({states:[new wp.media.controller.Library({library:wp.media.query(t.o.query),multiple:t.o.multiple,title:acf.l10n.file.select,priority:20,filterable:"all"})]}),acf.media.frame.on("content:activate",function(){var e=null,i=null;try{e=acf.media.frame.content.get().toolbar,i=e.get("filters")}catch(e){}if(!i)return!1;"uploadedTo"==t.o.library&&(i.$el.find('option[value="uploaded"]').remove(),i.$el.after("<span>"+acf.l10n.file.uploadedTo+"</span>"),$.each(i.filters,function(e,t){t.props.uploadedTo=acf.o.post_id}))}),acf.media.frame.on("select",function(){if(selection=e.frame.state().get("selection"),selection){var t=0;selection.each(function(i){if(++t>1){var a=e.div.closest("td"),n=a.closest(".row"),s=n.closest(".repeater"),o=a.attr("data-field_key"),l="td .acf-file-uploader:first";o&&(l='td[data-field_key="'+o+'"] .acf-file-uploader'),n.next(".row").exists()||s.find(".add-row-end").trigger("click"),e.div=n.next(".row").find(l)}var r={id:i.id,title:i.attributes.title,name:i.attributes.filename,url:i.attributes.url,icon:i.attributes.icon,size:i.attributes.filesize};acf.fields.file.add(r)})}}),acf.media.frame.open(),!1}},$(document).on("click",".acf-file-uploader .acf-button-edit",function(e){e.preventDefault(),acf.fields.file.set({$el:$(this).closest(".acf-file-uploader")}).edit()}),$(document).on("click",".acf-file-uploader .acf-button-delete",function(e){e.preventDefault(),acf.fields.file.set({$el:$(this).closest(".acf-file-uploader")}).remove()}),$(document).on("click",".acf-file-uploader .add-file",function(e){e.preventDefault(),acf.fields.file.set({$el:$(this).closest(".acf-file-uploader")}).popup()})}(jQuery),function($){acf.fields.google_map={$el:null,$input:null,o:{},ready:!1,geocoder:!1,map:!1,maps:{},set:function(e){return $.extend(this,e),this.$input=this.$el.find(".value"),this.o=acf.helpers.get_atts(this.$el),this.maps[this.o.id]&&(this.map=this.maps[this.o.id]),this},init:function(){this.geocoder||(this.geocoder=new google.maps.Geocoder),this.ready=!0,acf.helpers.is_clone_field(this.$input)||this.render()},render:function(){var e=this,t=this.$el,i={zoom:parseInt(this.o.zoom),center:new google.maps.LatLng(this.o.lat,this.o.lng),mapTypeId:google.maps.MapTypeId.ROADMAP};this.map=new google.maps.Map(this.$el.find(".canvas")[0],i);var a=new google.maps.places.Autocomplete(this.$el.find(".search")[0]);a.map=this.map,a.bindTo("bounds",this.map),this.map.marker=new google.maps.Marker({draggable:!0,raiseOnDrag:!0,map:this.map}),this.map.$el=this.$el;var n=this.$el.find(".input-lat").val(),s=this.$el.find(".input-lng").val();n&&s&&this.update(n,s).center(),google.maps.event.addListener(a,"place_changed",function(t){var i=this.map.$el,a=i.find(".search").val();i.find(".input-address").val(a),i.find(".title h4").text(a);var n=this.getPlace();if(n.geometry){var s=n.geometry.location.lat(),o=n.geometry.location.lng();e.set({$el:i}).update(s,o).center()}else e.geocoder.geocode({address:a},function(t,a){if(a!=google.maps.GeocoderStatus.OK)return void console.log("Geocoder failed due to: "+a);if(!t[0])return void console.log("No results found");n=t[0];var s=n.geometry.location.lat(),o=n.geometry.location.lng();e.set({$el:i}).update(s,o).center()})}),google.maps.event.addListener(this.map.marker,"dragend",function(){var t=this.map.$el,i=this.map.marker.getPosition(),a=i.lat(),n=i.lng();e.set({$el:t}).update(a,n).sync()}),google.maps.event.addListener(this.map,"click",function(t){var i=this.$el,a=t.latLng.lat(),n=t.latLng.lng();e.set({$el:i}).update(a,n).sync()}),this.maps[this.o.id]=this.map},update:function(e,t){var i=new google.maps.LatLng(e,t);return this.$el.find(".input-lat").val(e),this.$el.find(".input-lng").val(t).trigger("change"),this.map.marker.setPosition(i),this.map.marker.setVisible(!0),this.$el.addClass("active"),this.$el.closest(".field").removeClass("error"),this},center:function(){var e=this.map.marker.getPosition(),t=this.o.lat,i=this.o.lng;e&&(t=e.lat(),i=e.lng());var a=new google.maps.LatLng(t,i);this.map.setCenter(a)},sync:function(){var e=this.$el,t=this.map.marker.getPosition(),i=new google.maps.LatLng(t.lat(),t.lng());return this.geocoder.geocode({latLng:i},function(t,i){if(i!=google.maps.GeocoderStatus.OK)return void console.log("Geocoder failed due to: "+i);if(!t[0])return void console.log("No results found");var a=t[0];e.find(".title h4").text(a.formatted_address),e.find(".input-address").val(a.formatted_address).trigger("change")}),this},locate:function(){var e=this,t=this.$el;if(!navigator.geolocation)return alert(acf.l10n.google_map.browser_support),this;t.find(".title h4").text(acf.l10n.google_map.locating+"..."),t.addClass("active"),navigator.geolocation.getCurrentPosition(function(i){var a=i.coords.latitude,n=i.coords.longitude;e.set({$el:t}).update(a,n).sync().center()})},clear:function(){this.$el.removeClass("active"),this.$el.find(".search").val(""),this.$el.find(".input-address").val(""),this.$el.find(".input-lat").val(""),this.$el.find(".input-lng").val(""),this.map.marker.setVisible(!1)},edit:function(){this.$el.removeClass("active");var e=this.$el.find(".title h4").text();this.$el.find(".search").val(e).focus()},refresh:function(){google.maps.event.trigger(this.map,"resize"),this.center()}},$(document).on("acf/setup_fields",function(e,t){$fields=$(t).find(".acf-google-map"),$fields.exists()&&("undefined"==typeof google?$.getScript("https://www.google.com/jsapi",function(){google.load("maps","3",{other_params:"sensor=false&libraries=places",callback:function(){$fields.each(function(){acf.fields.google_map.set({$el:$(this)}).init()})}})}):google.load("maps","3",{other_params:"sensor=false&libraries=places",callback:function(){$fields.each(function(){acf.fields.google_map.set({$el:$(this)}).init()})}}))}),$(document).on("click",".acf-google-map .acf-sprite-remove",function(e){e.preventDefault(),acf.fields.google_map.set({$el:$(this).closest(".acf-google-map")}).clear(),$(this).blur()}),$(document).on("click",".acf-google-map .acf-sprite-locate",function(e){e.preventDefault(),acf.fields.google_map.set({$el:$(this).closest(".acf-google-map")}).locate(),$(this).blur()}),$(document).on("click",".acf-google-map .title h4",function(e){e.preventDefault(),acf.fields.google_map.set({$el:$(this).closest(".acf-google-map")}).edit()}),$(document).on("keydown",".acf-google-map .search",function(e){if(13==e.which)return!1}),$(document).on("blur",".acf-google-map .search",function(e){var t=$(this).closest(".acf-google-map");t.find(".input-lat").val()&&t.addClass("active")}),$(document).on("acf/fields/tab/show acf/conditional_logic/show",function(e,t){acf.fields.google_map.ready&&"google_map"==t.attr("data-field_type")&&acf.fields.google_map.set({$el:t.find(".acf-google-map")}).refresh()})}(jQuery),function($){var e=acf.media;acf.fields.image={$el:null,$input:null,o:{},set:function(e){return $.extend(this,e),this.$input=this.$el.find('input[type="hidden"]'),this.o=acf.helpers.get_atts(this.$el),this.o.multiple=!!this.$el.closest(".repeater").exists(),this.o.query={type:"image"},"uploadedTo"==this.o.library&&(this.o.query.uploadedTo=acf.o.post_id),this},init:function(){acf.helpers.is_clone_field(this.$input)},add:function(t){var i=e.div;i.find(".acf-image-image").attr("src",t.url),i.find(".acf-image-value").val(t.id).trigger("change"),i.addClass("active"),i.closest(".field").removeClass("error")},edit:function(){var t=this.$input.val();e.div=this.$el,e.clear_frame(),e.frame=wp.media({title:acf.l10n.image.edit,multiple:!1,button:{text:acf.l10n.image.update}}),e.frame.on("open",function(){"browse"!=e.frame.content._mode&&e.frame.content.mode("browse"),e.frame.$el.closest(".media-modal").addClass("acf-media-modal acf-expanded");var i=e.frame.state().get("selection"),a=wp.media.attachment(t);$.isEmptyObject(a.changed)&&a.fetch(),i.add(a)}),e.frame.on("close",function(){e.frame.$el.closest(".media-modal").removeClass("acf-media-modal")}),acf.media.frame.open()},remove:function(){this.$el.find(".acf-image-image").attr("src",""),this.$el.find(".acf-image-value").val("").trigger("change"),this.$el.removeClass("active")},popup:function(){var t=this;return e.div=this.$el,e.clear_frame(),e.frame=wp.media({states:[new wp.media.controller.Library({library:wp.media.query(t.o.query),multiple:t.o.multiple,title:acf.l10n.image.select,priority:20,filterable:"all"})]}),acf.media.frame.on("content:activate",function(){var e=null,i=null;try{e=acf.media.frame.content.get().toolbar,i=e.get("filters")}catch(e){}if(!i)return!1;$.each(i.filters,function(e,t){t.props.type="image"}),"uploadedTo"==t.o.library&&(i.$el.find('option[value="uploaded"]').remove(),i.$el.after("<span>"+acf.l10n.image.uploadedTo+"</span>"),$.each(i.filters,function(e,t){t.props.uploadedTo=acf.o.post_id})),i.$el.find("option").each(function(){var e=$(this).attr("value");"uploaded"==e&&"all"==t.o.library||-1===e.indexOf("image")&&$(this).remove()}),i.$el.val("image").trigger("change")}),acf.media.frame.on("select",function(){if(selection=e.frame.state().get("selection"),selection){var i=0;selection.each(function(a){if(++i>1){var n=e.div.closest("td"),s=n.closest(".row"),o=s.closest(".repeater"),l=n.attr("data-field_key"),r="td .acf-image-uploader:first";l&&(r='td[data-field_key="'+l+'"] .acf-image-uploader'),s.next(".row").exists()||o.find(".add-row-end").trigger("click"),e.div=s.next(".row").find(r)}var c={id:a.id,url:a.attributes.url};a.attributes.sizes&&a.attributes.sizes[t.o.preview_size]&&(c.url=a.attributes.sizes[t.o.preview_size].url),acf.fields.image.add(c)})}}),acf.media.frame.open(),!1},text:{title_add:"Select Image",title_edit:"Edit Image"}},$(document).on("click",".acf-image-uploader .acf-button-edit",function(e){e.preventDefault(),acf.fields.image.set({$el:$(this).closest(".acf-image-uploader")}).edit()}),$(document).on("click",".acf-image-uploader .acf-button-delete",function(e){e.preventDefault(),acf.fields.image.set({$el:$(this).closest(".acf-image-uploader")}).remove()}),$(document).on("click",".acf-image-uploader .add-image",function(e){e.preventDefault(),acf.fields.image.set({$el:$(this).closest(".acf-image-uploader")}).popup()})}(jQuery),function($){acf.fields.radio={$el:null,$input:null,$other:null,farbtastic:null,set:function(e){return $.extend(this,e),this.$input=this.$el.find('input[type="radio"]:checked'),this.$other=this.$el.find('input[type="text"]'),this},change:function(){"other"==this.$input.val()?(this.$other.attr("name",this.$input.attr("name")),this.$other.show()):(this.$other.attr("name",""),this.$other.hide())}},$(document).on("change",'.acf-radio-list input[type="radio"]',function(e){acf.fields.radio.set({$el:$(this).closest(".acf-radio-list")}).change()})}(jQuery),function($){acf.fields.relationship={$el:null,$input:null,$left:null,$right:null,o:{},timeout:null,set:function(e){return $.extend(this,e),this.$input=this.$el.children('input[type="hidden"]'),this.$left=this.$el.find(".relationship_left"),this.$right=this.$el.find(".relationship_right"),this.o=acf.helpers.get_atts(this.$el),this},init:function(){var e=this;if(!acf.helpers.is_clone_field(this.$input)){this.$right.find(".relationship_list").height(this.$left.height()-2),this.$right.find(".relationship_list").sortable({axis:"y",items:"> li",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,update:function(){e.$input.trigger("change")}});var t=this.$el;this.$left.find(".relationship_list").scrollTop(0).on("scroll",function(i){if(!t.hasClass("loading")&&!t.hasClass("no-results")&&$(this).scrollTop()+$(this).innerHeight()>=$(this).get(0).scrollHeight){var a=parseInt(t.attr("data-paged"));t.attr("data-paged",a+1),e.set({$el:t}).fetch()}}),this.fetch()}},fetch:function(){var e=this,t=this.$el;t.addClass("loading"),$.ajax({url:acf.o.ajaxurl,type:"post",dataType:"json",data:$.extend({action:"acf/fields/relationship/query_posts",post_id:acf.o.post_id,nonce:acf.o.nonce},this.o),success:function(i){e.set({$el:t}).render(i)}})},render:function(e){var t=this;if(this.$el.removeClass("no-results").removeClass("loading"),1==this.o.paged&&this.$el.find(".relationship_left li:not(.load-more)").remove(),!e||!e.html)return void this.$el.addClass("no-results");this.$el.find(".relationship_left .load-more").before(e.html),e.next_page_exists||this.$el.addClass("no-results"),this.$left.find("a").each(function(){var e=$(this).attr("data-post_id");t.$right.find('a[data-post_id="'+e+'"]').exists()&&$(this).parent().addClass("hide")})},add:function(e){var t=e.attr("data-post_id"),i=e.html();if(this.$right.find("a").length>=this.o.max)return alert(acf.l10n.relationship.max.replace("{max}",this.o.max)),!1;if(e.parent().hasClass("hide"))return!1;e.parent().addClass("hide");var a={post_id:e.attr("data-post_id"),title:e.html(),name:this.$input.attr("name")},n=_.template(acf.l10n.relationship.tmpl_li,a);this.$right.find(".relationship_list").append(n),this.$input.trigger("change"),this.$el.closest(".field").removeClass("error")},remove:function(e){e.parent().remove(),this.$left.find('a[data-post_id="'+e.attr("data-post_id")+'"]').parent("li").removeClass("hide"),this.$input.trigger("change")}},$(document).on("acf/setup_fields",function(e,t){$(t).find(".acf_relationship").each(function(){acf.fields.relationship.set({$el:$(this)}).init()})}),$(document).on("change",".acf_relationship .select-post_type",function(e){var t=$(this).val(),i=$(this).closest(".acf_relationship");i.attr("data-post_type",t),i.attr("data-paged",1),acf.fields.relationship.set({$el:i}).fetch()}),$(document).on("click",".acf_relationship .relationship_left .relationship_list a",function(e){e.preventDefault(),acf.fields.relationship.set({$el:$(this).closest(".acf_relationship")}).add($(this)),$(this).blur()}),$(document).on("click",".acf_relationship .relationship_right .relationship_list a",function(e){e.preventDefault(),acf.fields.relationship.set({$el:$(this).closest(".acf_relationship")}).remove($(this)),$(this).blur()}),$(document).on("keyup",".acf_relationship input.relationship_search",function(e){var t=$(this).val(),i=$(this).closest(".acf_relationship");i.attr("data-s",t),i.attr("data-paged",1),clearTimeout(acf.fields.relationship.timeout),acf.fields.relationship.timeout=setTimeout(function(){acf.fields.relationship.set({$el:i}).fetch()},500)}),$(document).on("keypress",".acf_relationship input.relationship_search",function(e){13==e.which&&e.preventDefault()})}(jQuery),function($){acf.fields.tab={add_group:function(e){var t="";t=e.is("tbody")?'<tr class="acf-tab-wrap"><td colspan="2"><ul class="hl clearfix acf-tab-group"></ul></td></tr>':'<div class="acf-tab-wrap"><ul class="hl clearfix acf-tab-group"></ul></div>',e.children(".field_type-tab:first").before(t)},add_tab:function(e){var t=e.closest(".field"),i=t.parent(),a=t.attr("data-field_key"),n=e.text();i.children(".acf-tab-wrap").exists()||this.add_group(i),i.children(".acf-tab-wrap").find(".acf-tab-group").append('<li><a class="acf-tab-button" href="#" data-key="'+a+'">'+n+"</a></li>")},toggle:function(e){var t=this,i=e.closest(".acf-tab-wrap").parent(),a=e.attr("data-key");e.parent("li").addClass("active").siblings("li").removeClass("active"),i.children(".field_type-tab").each(function(){$(this).attr("data-field_key")==a?t.show_tab_fields($(this)):t.hide_tab_fields($(this))})},show_tab_fields:function(e){e.nextUntil(".field_type-tab").each(function(){$(this).removeClass("acf-tab_group-hide").addClass("acf-tab_group-show"),$(document).trigger("acf/fields/tab/show",[$(this)])})},hide_tab_fields:function(e){e.nextUntil(".field_type-tab").each(function(){$(this).removeClass("acf-tab_group-show").addClass("acf-tab_group-hide"),$(document).trigger("acf/fields/tab/hide",[$(this)])})},refresh:function(e){var t=this;e.find(".acf-tab-group").each(function(){$(this).find(".acf-tab-button:first").each(function(){t.toggle($(this))})})}},$(document).on("acf/setup_fields",function(e,t){$(t).find(".acf-tab").each(function(){acf.fields.tab.add_tab($(this))}),acf.fields.tab.refresh($(t))}),$(document).on("click",".acf-tab-button",function(e){e.preventDefault(),acf.fields.tab.toggle($(this)),$(this).trigger("blur")}),$(document).on("acf/conditional_logic/hide",function(e,t,i){if("tab"==t.attr("data-field_type")){var a=t.siblings(".acf-tab-wrap").find('a[data-key="'+t.attr("data-field_key")+'"]');a.is(":hidden")||(a.parent().hide(),a.parent().siblings(":visible").exists()?a.parent().siblings(":visible").first().children("a").trigger("click"):acf.fields.tab.hide_tab_fields(t))}}),$(document).on("acf/conditional_logic/show",function(e,t,i){if("tab"==t.attr("data-field_type")){var a=t.siblings(".acf-tab-wrap").find('a[data-key="'+t.attr("data-field_key")+'"]');if(!a.is(":visible"))return a.parent().show(),a.parent().hasClass("active")?void a.trigger("click"):a.parent().siblings(".active").is(":hidden")?void a.trigger("click"):void 0}})}(jQuery),function($){acf.validation={status:!0,disabled:!1,run:function(){var e=this;e.status=!0,$(".field.required, .form-field.required").each(function(){e.validate($(this))})},show_spinner:function(e){if(e.exists()){var t=acf.o.wp_version;parseFloat(t)>=4.2?e.addClass("is-active"):e.css("display","inline-block")}},hide_spinner:function(e){if(e.exists()){var t=acf.o.wp_version;parseFloat(t)>=4.2?e.removeClass("is-active"):e.css("display","none")}},validate:function(e){var t=!1,i=null;if(e.data("validation",!0),e.is(":hidden")&&(t=!0,e.hasClass("acf-tab_group-hide"))){t=!1;var a=e.prevAll(".field_type-tab:first"),n=e.prevAll(".acf-tab-wrap:first");a.hasClass("acf-conditional_logic-hide")?t=!0:i=n.find('.acf-tab-button[data-key="'+a.attr("data-field_key")+'"]')}if(e.hasClass("acf-conditional_logic-hide")&&(t=!0),e.closest(".postbox.acf-hidden").exists()&&(t=!0),!t){if(""==e.find('input[type="text"], input[type="email"], input[type="number"], input[type="hidden"], textarea').val()&&e.data("validation",!1),e.find(".acf_wysiwyg").exists()&&"object"==typeof tinyMCE){e.data("validation",!0);var s=e.find(".wp-editor-area").attr("id"),o=tinyMCE.get(s);o&&!o.getContent()&&e.data("validation",!1)}if(e.find("select").exists()&&(e.data("validation",!0),"null"!=e.find("select").val()&&e.find("select").val()||e.data("validation",!1)),e.find('input[type="radio"]').exists()&&(e.data("validation",!1),e.find('input[type="radio"]:checked').exists()&&e.data("validation",!0)),e.find('input[type="checkbox"]').exists()&&(e.data("validation",!1),e.find('input[type="checkbox"]:checked').exists()&&e.data("validation",!0)),e.find(".acf_relationship").exists()&&(e.data("validation",!1),e.find(".acf_relationship .relationship_right input").exists()&&e.data("validation",!0)),e.find(".repeater").exists()&&(e.data("validation",!1),e.find(".repeater tr.row").exists()&&e.data("validation",!0)),e.find(".acf-gallery").exists()&&(e.data("validation",!1),e.find(".acf-gallery .thumbnail").exists()&&e.data("validation",!0)),$(document).trigger("acf/validate_field",[e]),!e.data("validation")){if(this.status=!1,e.closest(".field").addClass("error"),e.data("validation_message")){var l=e.find("p.label:first"),r=null;l.children(".acf-error-message").remove(),l.append('<span class="acf-error-message"><i class="bit"></i>'+e.data("validation_message")+"</span>")}i&&i.trigger("click")}}}},$(document).on("focus click",".field.required input, .field.required textarea, .field.required select",function(e){$(this).closest(".field").removeClass("error")}),$(document).on("click","#save-post",function(){acf.validation.disabled=!0}),$(document).on("submit","#post",function(){if(acf.validation.disabled)return!0;if(acf.validation.run(),!acf.validation.status){var e=$(this)
;return e.siblings("#message").remove(),e.before('<div id="message" class="error"><p>'+acf.l10n.validation.error+"</p></div>"),$("#submitdiv").exists()&&($("#submitdiv").find(".disabled").removeClass("disabled"),$("#submitdiv").find(".button-disabled").removeClass("button-disabled"),$("#submitdiv").find(".button-primary-disabled").removeClass("button-primary-disabled"),acf.validation.hide_spinner($("#submitdiv .spinner"))),!1}return $(".acf_postbox.acf-hidden").remove(),!0})}(jQuery),function($){var e=acf.fields.wysiwyg={$el:null,$textarea:null,o:{},set:function(e){return $.extend(this,e),this.$textarea=this.$el.find("textarea"),this.o=acf.helpers.get_atts(this.$el),this.o.id=this.$textarea.attr("id"),this},has_tinymce:function(){var e=!1;return"object"==typeof tinyMCE&&(e=!0),e},get_toolbar:function(){return!!acf.helpers.isset(this,"toolbars",this.o.toolbar)&&this.toolbars[this.o.toolbar]},init:function(){if(!acf.helpers.is_clone_field(this.$textarea)){var e=this.get_toolbar(),t="mceAddControl",i="theme_advanced_buttons{i}",a=$.extend({},tinyMCE.settings);if(4==tinymce.majorVersion&&(t="mceAddEditor",i="toolbar{i}"),e)for(var n=1;n<5;n++){var s="";acf.helpers.isset(e,"theme_advanced_buttons"+n)&&(s=e["theme_advanced_buttons"+n]),tinyMCE.settings[i.replace("{i}",n)]=s}tinyMCE.execCommand(t,!1,this.o.id),$(document).trigger("acf/wysiwyg/load",this.o.id),this.add_events(),tinyMCE.settings=a,wpActiveEditor=null}},add_events:function(){var e=this.o.id,t=tinyMCE.get(e);if(t){var i=$("#wp-"+e+"-wrap"),a=$(t.getBody());i.on("click",function(){$(document).trigger("acf/wysiwyg/click",e)}),a.on("focus",function(){$(document).trigger("acf/wysiwyg/focus",e)}),a.on("blur",function(){$(document).trigger("acf/wysiwyg/blur",e)})}},destroy:function(){var e=this.o.id,t="mceRemoveControl";try{var i=tinyMCE.get(e);if(!i)return;4==tinymce.majorVersion&&(t="mceRemoveEditor");var a=i.getContent();tinyMCE.execCommand(t,!1,e),this.$textarea.val(a)}catch(e){}wpActiveEditor=null}};$(document).on("acf/setup_fields",function(t,i){e.has_tinymce()&&($(i).find(".acf_wysiwyg").each(function(){e.set({$el:$(this)}).destroy()}),setTimeout(function(){$(i).find(".acf_wysiwyg").each(function(){e.set({$el:$(this)}).init()})},0))}),$(document).on("acf/remove_fields",function(t,i){e.has_tinymce()&&i.find(".acf_wysiwyg").each(function(){e.set({$el:$(this)}).destroy()})}),$(document).on("acf/wysiwyg/click",function(e,t){wpActiveEditor=t,container=$("#wp-"+t+"-wrap").closest(".field").removeClass("error")}),$(document).on("acf/wysiwyg/focus",function(e,t){wpActiveEditor=t,container=$("#wp-"+t+"-wrap").closest(".field").removeClass("error")}),$(document).on("acf/wysiwyg/blur",function(e,t){wpActiveEditor=null;var i=tinyMCE.get(t);if(i){var a=i.getElement();i.save(),$(a).trigger("change")}}),$(document).on("acf/sortable_start",function(t,i){e.has_tinymce()&&$(i).find(".acf_wysiwyg").each(function(){e.set({$el:$(this)}).destroy()})}),$(document).on("acf/sortable_stop",function(t,i){e.has_tinymce()&&$(i).find(".acf_wysiwyg").each(function(){e.set({$el:$(this)}).init()})}),$(window).load(function(){if(e.has_tinymce()){var t=$("#wp-content-wrap").exists(),i=$("#wp-acf_settings-wrap").exists();mode="tmce",i&&$("#wp-acf_settings-wrap").hasClass("html-active")&&(mode="html"),setTimeout(function(){i&&"html"==mode&&$("#acf_settings-tmce").trigger("click")},1),setTimeout(function(){i&&"html"==mode&&$("#acf_settings-html").trigger("click"),t&&e.set({$el:$("#wp-content-wrap")}).add_events()},11)}}),$(document).on("click",".acf_wysiwyg a.mce_fullscreen",function(){"no"==$(this).closest(".acf_wysiwyg").attr("data-upload")&&$("#mce_fullscreen_container td.mceToolbar .mce_add_media").remove()})}(jQuery);