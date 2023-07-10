/* jquery-confirm v3.3.4 (http://craftpip.github.io/jquery-confirm/) */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(i,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(i)),t(n),n}:t(jQuery)}(function(t){"use strict";var i=window;t.fn.confirm=function(n,o){return void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1}),t(this).each(function(){var o=t(this);o.attr("jc-attached")?console.warn("jConfirm has already been attached to this element ",o[0]):(o.on("click",function(e){e.preventDefault();var s=t.extend({},n);if(o.attr("data-title")&&(s.title=o.attr("data-title")),o.attr("data-content")&&(s.content=o.attr("data-content")),void 0===s.buttons&&(s.buttons={}),s.$target=o,o.attr("href")&&0===Object.keys(s.buttons).length){var a=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),c=Object.keys(a)[0];s.buttons=a,s.buttons[c].action=function(){location.href=o.attr("href")}}s.closeIcon=!1;t.confirm(s)}),o.attr("jc-attached",!0))}),t(this)},t.confirm=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{});n.buttons=s}return i.jconfirm(n)},t.alert=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),a=Object.keys(s)[0];n.buttons[a]=s[a]}return i.jconfirm(n)},t.dialog=function(t,n){return void 0===t&&(t={}),"string"==typeof t&&(t={content:t,title:n||!1,closeIcon:function(){}}),t.buttons={},void 0===t.closeIcon&&(t.closeIcon=function(){}),t.confirmKeys=[13],i.jconfirm(t)},i.jconfirm=function(n){void 0===n&&(n={});var o=t.extend(!0,{},i.jconfirm.pluginDefaults);i.jconfirm.defaults&&(o=t.extend(!0,o,i.jconfirm.defaults)),o=t.extend(!0,{},o,n);var e=new i.Jconfirm(o);return i.jconfirm.instances.push(e),e},i.Jconfirm=function(i){t.extend(this,i),this._init()},i.Jconfirm.prototype={_init:function(){var n=this;i.jconfirm.instances.length||(i.jconfirm.lastFocused=t("body").find(":focus")),this._id=Math.round(99999*Math.random()),this.contentParsed=t(document.createElement("div")),this.lazyOpen||setTimeout(function(){n.open()},0)},_buildHTML:function(){var i=this;this._parseAnimation(this.animation,"o"),this._parseAnimation(this.closeAnimation,"c"),this._parseBgDismissAnimation(this.backgroundDismissAnimation),this._parseColumnClass(this.columnClass),this._parseTheme(this.theme),this._parseType(this.type);var n=t(this.template);n.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed),this.typeAnimated&&n.find(".jconfirm-box").addClass("jconfirm-type-animated"),this.useBootstrap?(n.find(".jc-bs3-row").addClass(this.bootstrapClasses.row),n.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"),n.find(".jconfirm-box-container").addClass(this.columnClassParsed),this.containerFluid?n.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid):n.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)):n.find(".jconfirm-box").css("width",this.boxWidth),this.titleClass&&n.find(".jconfirm-title-c").addClass(this.titleClass),n.addClass(this.themeParsed);var o="jconfirm-box"+this._id;n.find(".jconfirm-box").attr("aria-labelledby",o).attr("tabindex",-1),n.find(".jconfirm-content").attr("id",o),null!==this.bgOpacity&&n.find(".jconfirm-bg").css("opacity",this.bgOpacity),this.rtl&&n.addClass("jconfirm-rtl"),this.$el=n.appendTo(this.container),this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container"),this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box"),this.$jconfirmBg=this.$el.find(".jconfirm-bg"),this.$title=this.$el.find(".jconfirm-title"),this.$titleContainer=this.$el.find(".jconfirm-title-c"),this.$content=this.$el.find("div.jconfirm-content"),this.$contentPane=this.$el.find(".jconfirm-content-pane"),this.$icon=this.$el.find(".jconfirm-icon-c"),this.$closeIcon=this.$el.find(".jconfirm-closeIcon"),this.$holder=this.$el.find(".jconfirm-holder"),this.$btnc=this.$el.find(".jconfirm-buttons"),this.$scrollPane=this.$el.find(".jconfirm-scrollpane"),i.setStartingPoint(),this._contentReady=t.Deferred(),this._modalReady=t.Deferred(),this.$holder.css({"padding-top":this.offsetTop,"padding-bottom":this.offsetBottom}),this.setTitle(),this.setIcon(),this._setButtons(),this._parseContent(),this.initDraggable(),this.isAjax&&this.showLoading(!1),t.when(this._contentReady,this._modalReady).then(function(){i.isAjaxLoading?setTimeout(function(){i.isAjaxLoading=!1,i.setContent(),i.setTitle(),i.setIcon(),setTimeout(function(){i.hideLoading(!1),i._updateContentMaxHeight()},100),"function"==typeof i.onContentReady&&i.onContentReady()},50):(i._updateContentMaxHeight(),i.setTitle(),i.setIcon(),"function"==typeof i.onContentReady&&i.onContentReady()),i.autoClose&&i._startCountDown()}).then(function(){i._watchContent()}),"none"===this.animation&&(this.animationSpeed=1,this.animationBounce=1),this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce)),this.$contentPane.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed,1))},_typePrefix:"jconfirm-type-",typeParsed:"",_parseType:function(t){this.typeParsed=this._typePrefix+t},setType:function(t){var i=this.typeParsed;this._parseType(t),this.$jconfirmBox.removeClass(i).addClass(this.typeParsed)},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(t){var i=this.theme;this.theme=t||this.theme,this._parseTheme(this.theme),i&&this.$el.removeClass(i),this.$el.addClass(this.themeParsed),this.theme=t},_parseTheme:function(i){var n=this;i=i.split(","),t.each(i,function(o,e){-1===e.indexOf(n._themePrefix)&&(i[o]=n._themePrefix+t.trim(e))}),this.themeParsed=i.join(" ").toLowerCase()},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(i){var n=i.split(","),o=this;t.each(n,function(i,e){-1===e.indexOf(o._bgDismissPrefix)&&(n[i]=o._bgDismissPrefix+t.trim(e))}),this.backgroundDismissAnimationParsed=n.join(" ").toLowerCase()},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(t){this.animation=t||this.animation,this._parseAnimation(this.animation,"o")},_parseAnimation:function(i,n){n=n||"o";var o=i.split(","),e=this;t.each(o,function(i,n){-1===n.indexOf(e._animationPrefix)&&(o[i]=e._animationPrefix+t.trim(n))});var s=o.join(" ").toLowerCase();return"o"===n?this.animationParsed=s:this.closeAnimationParsed=s,s},setCloseAnimation:function(t){this.closeAnimation=t||this.closeAnimation,this._parseAnimation(this.closeAnimation,"c")},setAnimationSpeed:function(t){this.animationSpeed=t||this.animationSpeed},columnClassParsed:"",setColumnClass:function(t){this.useBootstrap?(this.columnClass=t||this.columnClass,this._parseColumnClass(this.columnClass),this.$jconfirmBoxContainer.addClass(this.columnClassParsed)):console.warn("cannot set columnClass, useBootstrap is set to false")},_updateContentMaxHeight:function(){var i=t(window).height()-(this.$jconfirmBox.outerHeight()-this.$contentPane.outerHeight())-(this.offsetTop+this.offsetBottom);this.$contentPane.css({"max-height":i+"px"})},setBoxWidth:function(t){this.useBootstrap?console.warn("cannot set boxWidth, useBootstrap is set to true"):(this.boxWidth=t,this.$jconfirmBox.css("width",t))},_parseColumnClass:function(t){var i;switch(t=t.toLowerCase()){case"xl":case"xlarge":i="col-md-12";break;case"l":case"large":i="col-md-8 col-md-offset-2";break;case"m":case"medium":i="col-md-6 col-md-offset-3";break;case"s":case"small":i="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":i="col-md-2 col-md-offset-5";break;default:i=t}this.columnClassParsed=i},initDraggable:function(){var i=this,n=this.$titleContainer;this.resetDrag(),this.draggable&&(n.on("mousedown",function(t){n.addClass("jconfirm-hand"),i.mouseX=t.clientX,i.mouseY=t.clientY,i.isDrag=!0}),t(window).on("mousemove."+this._id,function(t){i.isDrag&&(i.movingX=t.clientX-i.mouseX+i.initialX,i.movingY=t.clientY-i.mouseY+i.initialY,i.setDrag())}),t(window).on("mouseup."+this._id,function(){n.removeClass("jconfirm-hand"),i.isDrag&&(i.isDrag=!1,i.initialX=i.movingX,i.initialY=i.movingY)}))},resetDrag:function(){this.isDrag=!1,this.initialX=0,this.initialY=0,this.movingX=0,this.movingY=0,this.mouseX=0,this.mouseY=0,this.$jconfirmBoxContainer.css("transform","translate(0px, 0px)")},setDrag:function(){if(this.draggable){this.alignMiddle=!1;var i=this.$jconfirmBox.outerWidth(),n=this.$jconfirmBox.outerHeight(),o=t(window).width(),e=t(window).height();if(this.movingX%1==0||this.movingY%1==0){if(this.dragWindowBorder){var s=o/2-i/2,a=e/2-n/2;a-=this.dragWindowGap,(s-=this.dragWindowGap)+this.movingX<0?this.movingX=-s:s-this.movingX<0&&(this.movingX=s),a+this.movingY<0?this.movingY=-a:a-this.movingY<0&&(this.movingY=a)}this.$jconfirmBoxContainer.css("transform","translate("+this.movingX+"px, "+this.movingY+"px)")}}},_scrollTop:function(){if("undefined"!=typeof pageYOffset)return pageYOffset;var t=document.body,i=document.documentElement;return(i=i.clientHeight?i:t).scrollTop},_watchContent:function(){var i=this;this._timer&&clearInterval(this._timer);var n=0;this._timer=setInterval(function(){if(i.smoothContent){var o=i.$content.outerHeight()||0;o!==n&&(n=o);var e=t(window).height();i.offsetTop+i.offsetBottom+i.$jconfirmBox.height()-i.$contentPane.height()+i.$content.height()<e?i.$contentPane.addClass("no-scroll"):i.$contentPane.removeClass("no-scroll")}},this.watchInterval)},_overflowClass:"jconfirm-overflow",_hilightAnimating:!1,highlight:function(){this.hiLightModal()},hiLightModal:function(){var t=this;if(!this._hilightAnimating){t.$body.addClass("hilight");var i=parseFloat(t.$body.css("animation-duration"))||2;this._hilightAnimating=!0,setTimeout(function(){t._hilightAnimating=!1,t.$body.removeClass("hilight")},1e3*i)}},_bindEvents:function(){var i=this;this.boxClicked=!1,this.$scrollPane.click(function(t){if(!i.boxClicked){var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.backgroundDismiss?i.backgroundDismiss():i.backgroundDismiss)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e?i.close():i.hiLightModal()}i.boxClicked=!1}),this.$jconfirmBox.click(function(t){i.boxClicked=!0});var n=!1;t(window).on("jcKeyDown."+i._id,function(t){n||(n=!0)}),t(window).on("keyup."+i._id,function(t){n&&(i.reactOnKey(t),n=!1)}),t(window).on("resize."+this._id,function(){i._updateContentMaxHeight(),setTimeout(function(){i.resetDrag()},100)})},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(t,i){return{"-webkit-transition-duration":t/1e3+"s","transition-duration":t/1e3+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")"}},_setButtons:function(){var i=this,n=0;if("object"!=typeof this.buttons&&(this.buttons={}),t.each(this.buttons,function(o,e){n+=1,"function"==typeof e&&(i.buttons[o]=e={action:e}),i.buttons[o].text=e.text||o,i.buttons[o].btnClass=e.btnClass||"btn-default",i.buttons[o].action=e.action||function(){},i.buttons[o].keys=e.keys||[],i.buttons[o].isHidden=e.isHidden||!1,i.buttons[o].isDisabled=e.isDisabled||!1,t.each(i.buttons[o].keys,function(t,n){i.buttons[o].keys[t]=n.toLowerCase()});var s=t('<button type="button" class="btn"></button>').html(i.buttons[o].text).addClass(i.buttons[o].btnClass).prop("disabled",i.buttons[o].isDisabled).css("display",i.buttons[o].isHidden?"none":"").click(function(t){t.preventDefault();var n=i.buttons[o].action.apply(i,[i.buttons[o]]);i.onAction.apply(i,[o,i.buttons[o]]),i._stopCountDown(),(void 0===n||n)&&i.close()});i.buttons[o].el=s,i.buttons[o].setText=function(t){s.html(t)},i.buttons[o].addClass=function(t){s.addClass(t)},i.buttons[o].removeClass=function(t){s.removeClass(t)},i.buttons[o].disable=function(){i.buttons[o].isDisabled=!0,s.prop("disabled",!0)},i.buttons[o].enable=function(){i.buttons[o].isDisabled=!1,s.prop("disabled",!1)},i.buttons[o].show=function(){i.buttons[o].isHidden=!1,s.css("display","")},i.buttons[o].hide=function(){i.buttons[o].isHidden=!0,s.css("display","none")},i["$_"+o]=i["$$"+o]=s,i.$btnc.append(s)}),0===n&&this.$btnc.hide(),null===this.closeIcon&&0===n&&(this.closeIcon=!0),this.closeIcon){if(this.closeIconClass){var o='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(o)}this.$closeIcon.click(function(t){t.preventDefault();var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.closeIcon?i.closeIcon():i.closeIcon)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e&&i.close()}),this.$closeIcon.show()}else this.$closeIcon.hide()},setTitle:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.title=t;else if("function"==typeof t){"function"==typeof t.promise&&console.error("Promise was returned from title function, this is not supported.");var n=t();this.title="string"==typeof n&&n}else this.title=!1;this.isAjaxLoading&&!i||(this.$title.html(this.title||""),this.updateTitleContainer())},setIcon:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.icon=t;else if("function"==typeof t){var n=t();this.icon="string"==typeof n&&n}else this.icon=!1;this.isAjaxLoading&&!i||(this.$icon.html(this.icon?'<i class="'+this.icon+'"></i>':""),this.updateTitleContainer())},updateTitleContainer:function(){this.title||this.icon?this.$titleContainer.show():this.$titleContainer.hide()},setContentPrepend:function(t,i){t&&this.contentParsed.prepend(t)},setContentAppend:function(t){t&&this.contentParsed.append(t)},setContent:function(t,i){i=!!i;var n=this;t&&this.contentParsed.html("").append(t),this.isAjaxLoading&&!i||(this.$content.html(""),this.$content.append(this.contentParsed),setTimeout(function(){n.$body.find("input[autofocus]:visible:first").focus()},100))},loadingSpinner:!1,showLoading:function(t){this.loadingSpinner=!0,this.$jconfirmBox.addClass("loading"),t&&this.$btnc.find("button").prop("disabled",!0)},hideLoading:function(t){this.loadingSpinner=!1,this.$jconfirmBox.removeClass("loading"),t&&this.$btnc.find("button").prop("disabled",!1)},ajaxResponse:!1,contentParsed:"",isAjax:!1,isAjaxLoading:!1,_parseContent:function(){var i=this,n="&nbsp;";if("function"==typeof this.content){var o=this.content.apply(this);"string"==typeof o?this.content=o:"object"==typeof o&&"function"==typeof o.always?(this.isAjax=!0,this.isAjaxLoading=!0,o.always(function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)}),this.content=n):this.content=n}if("string"==typeof this.content&&"url:"===this.content.substr(0,4).toLowerCase()){this.isAjax=!0,this.isAjaxLoading=!0;var e=this.content.substring(4,this.content.length);t.get(e).done(function(t){i.contentParsed.html(t)}).always(function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)})}this.content||(this.content=n),this.isAjax||(this.contentParsed.html(this.content),this.setContent(),i._contentReady.resolve())},_stopCountDown:function(){clearInterval(this.autoCloseInterval),this.$cd&&this.$cd.remove()},_startCountDown:function(){var i=this,n=this.autoClose.split("|");if(2!==n.length)return console.error("Invalid option for autoClose. example 'close|10000'"),!1;var o=n[0],e=parseInt(n[1]);if(void 0===this.buttons[o])return console.error("Invalid button key '"+o+"' for autoClose"),!1;var s=Math.ceil(e/1e3);this.$cd=t('<span class="countdown"> ('+s+")</span>").appendTo(this["$_"+o]),this.autoCloseInterval=setInterval(function(){i.$cd.html(" ("+(s-=1)+") "),s<=0&&(i["$$"+o].trigger("click"),i._stopCountDown())},1e3)},_getKey:function(t){switch(t){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space"}var i=String.fromCharCode(t);return!!/^[A-z0-9]+$/.test(i)&&i.toLowerCase()},reactOnKey:function(i){var n=this,o=t(".jconfirm");if(o.eq(o.length-1)[0]!==this.$el[0])return!1;var e=i.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(e))return!1;var s=this._getKey(e);if("esc"===s&&this.escapeKey)if(!0===this.escapeKey)this.$scrollPane.trigger("click");else if("string"==typeof this.escapeKey||"function"==typeof this.escapeKey){var a;(a="function"==typeof this.escapeKey?this.escapeKey():this.escapeKey)&&(void 0===this.buttons[a]?console.warn("Invalid escapeKey, no buttons found with key "+a):this["$_"+a].trigger("click"))}t.each(this.buttons,function(t,i){-1!==i.keys.indexOf(s)&&n["$_"+t].trigger("click")})},setDialogCenter:function(){console.info("setDialogCenter is deprecated, dialogs are centered with CSS3 tables")},_unwatchContent:function(){clearInterval(this._timer)},close:function(n){var o=this;return"function"==typeof this.onClose&&this.onClose(n),this._unwatchContent(),t(window).unbind("resize."+this._id),t(window).unbind("keyup."+this._id),t(window).unbind("jcKeyDown."+this._id),this.draggable&&(t(window).unbind("mousemove."+this._id),t(window).unbind("mouseup."+this._id),this.$titleContainer.unbind("mousedown")),o.$el.removeClass(o.loadedClass),t("body").removeClass("jconfirm-no-scroll-"+o._id),o.$jconfirmBoxContainer.removeClass("jconfirm-no-transition"),setTimeout(function(){o.$body.addClass(o.closeAnimationParsed),o.$jconfirmBg.addClass("jconfirm-bg-h");var n="none"===o.closeAnimation?1:o.animationSpeed;setTimeout(function(){o.$el.remove();i.jconfirm.instances;for(var n=i.jconfirm.instances.length-1;n>=0;n--)i.jconfirm.instances[n]._id===o._id&&i.jconfirm.instances.splice(n,1);if(!i.jconfirm.instances.length&&o.scrollToPreviousElement&&i.jconfirm.lastFocused&&i.jconfirm.lastFocused.length&&t.contains(document,i.jconfirm.lastFocused[0])){var e=i.jconfirm.lastFocused;if(o.scrollToPreviousElementAnimate){var s=t(window).scrollTop(),a=i.jconfirm.lastFocused.offset().top,c=t(window).height();if(a>s&&a<s+c)e.focus();else{var r=a-Math.round(c/3);t("html, body").animate({scrollTop:r},o.animationSpeed,"swing",function(){e.focus()})}}else e.focus();i.jconfirm.lastFocused=!1}"function"==typeof o.onDestroy&&o.onDestroy()},.4*n)},50),!0},open:function(){return!this.isOpen()&&(this._buildHTML(),this._bindEvents(),this._open(),!0)},setStartingPoint:function(){var n=!1;if(!0!==this.animateFromElement&&this.animateFromElement)n=this.animateFromElement,i.jconfirm.lastClicked=!1;else{if(!i.jconfirm.lastClicked||!0!==this.animateFromElement)return!1;n=i.jconfirm.lastClicked,i.jconfirm.lastClicked=!1}if(!n)return!1;var o=n.offset(),e=n.outerHeight()/2,s=n.outerWidth()/2;e-=this.$jconfirmBox.outerHeight()/2,s-=this.$jconfirmBox.outerWidth()/2;var a=o.top+e;a-=this._scrollTop();var c=o.left+s,r=t(window).height()/2,l=t(window).width()/2;if(a-=r-this.$jconfirmBox.outerHeight()/2,c-=l-this.$jconfirmBox.outerWidth()/2,Math.abs(a)>r||Math.abs(c)>l)return!1;this.$jconfirmBoxContainer.css("transform","translate("+c+"px, "+a+"px)")},_open:function(){var t=this;"function"==typeof t.onOpenBefore&&t.onOpenBefore(),this.$body.removeClass(this.animationParsed),this.$jconfirmBg.removeClass("jconfirm-bg-h"),this.$body.focus(),t.$jconfirmBoxContainer.css("transform","translate(0px, 0px)"),setTimeout(function(){t.$body.css(t._getCSS(t.animationSpeed,1)),t.$body.css({"transition-property":t.$body.css("transition-property")+", margin"}),t.$jconfirmBoxContainer.addClass("jconfirm-no-transition"),t._modalReady.resolve(),"function"==typeof t.onOpen&&t.onOpen(),t.$el.addClass(t.loadedClass)},this.animationSpeed)},loadedClass:"jconfirm-open",isClosed:function(){return!this.$el||0===this.$el.parent().length},isOpen:function(){return!this.isClosed()},toggle:function(){this.isOpen()?this.close():this.open()}},i.jconfirm.instances=[],i.jconfirm.lastFocused=!1,i.jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:!0,draggable:!0,dragWindowGap:15,dragWindowBorder:!0,animateFromElement:!0,alignMiddle:!0,smoothContent:!0,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}}},contentLoaded:function(){},icon:"",lazyOpen:!1,bgOpacity:null,theme:"light",animation:"scale",closeAnimation:"scale",animationSpeed:400,animationBounce:1,escapeKey:!0,rtl:!1,container:"body",containerFluid:!1,backgroundDismiss:!1,backgroundDismissAnimation:"shake",autoClose:!1,closeIcon:null,closeIconClass:!1,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",scrollToPreviousElement:!0,scrollToPreviousElementAnimate:!0,useBootstrap:!0,offsetTop:40,offsetBottom:40,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row"},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};var n=!1;t(window).on("keydown",function(i){if(!n){var o=!1;t(i.target).closest(".jconfirm-box").length&&(o=!0),o&&t(window).trigger("jcKeyDown"),n=!0}}),t(window).on("keyup",function(){n=!1}),i.jconfirm.lastClicked=!1,t(document).on("mousedown","button, a, [jc-source]",function(){i.jconfirm.lastClicked=t(this)})});

/* Functions                                        
--------------------------------------------------------*/

function alerx(ititle, icontent, type) {
	
	let width 	= ($(window).width() > 860) ? '640px' : '90%';
	
	if (type == 'error') {
		$.alert({
			boxWidth: width,
			useBootstrap: false,
			theme: 'material',
			title: ititle,
			content: icontent,
			closeIcon: true,
			draggable: true,
			
			buttons: {
				ok: {
					btnClass: 'btn-red',
					action: function(){}
				},
			}
		});
	}
	else {
		$.alert({
			boxWidth: width,
			useBootstrap: false,
			theme: 'material',
			title: ititle,
			content: icontent,
			btnClass: 'btn-blue',
			closeIcon: true,
			draggable: true,
		});
	}
}

function goTo(line, t) {
	t = (t == undefined)  ? 100 : t;
	$('html, body').animate({
		scrollTop: $(line).offset().top-t
	}, 500);
}

//Popup
const popup = new Popup();
function Popup(){
	
	if(!(this instanceof Popup)) { return new Popup(); }
	
	const wWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
	const wHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;
	const scrollSize = wWidth - $("body").width();
	
	this.open = function(id){
		$('.popup').hide();
		$(`${id} .popup__container`).css("transform","translate(-50%,-400%)");
		
		$(id).fadeIn(1, function(){
			let popupHeight = parseInt( $(`${id} .popup__container`).innerHeight() + 50);
			
			$(`${id} .popup__overlay`).css({ "opacity": "1", "min-height": popupHeight + "px" });
						
			if( (wWidth <= 992) || (popupHeight > wHeight) ){
				$(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "30px" });
			} else {
				$(`${id} .popup__container`).css("transform","translate(-50%,-50%)");
			}
			
			$("body").css({"overflow": "hidden", "margin-right": scrollSize + "px"});
			$(".wrapper").addClass("blur");
		});
		
		$(window).on("resize", debounce(
			function() {
				let w = window.innerWidth > 0 ? window.innerWidth : screen.width;
				let h = window.innerHeight > 0 ? window.innerHeight : screen.height;
				let ph = $(`${id} .popup__container`).innerHeight();
				
				if( (w <= 992) || (ph > h) ){
					$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "30px" });
				} else {
					$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,-50%)", "top": "50%" });
				}		
			}
		));	
	}	

    this.video = function(id, url){
        let temp = `<iframe src="https://www.youtube.com/embed/${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        $(`${id} .popup-video__container`).append(`<div class="loader"/>`);
        $(id).fadeIn(1, function(){
            let popupHeight = parseInt( $(`${id} .popup-video__iframe`).innerHeight() + 50);
            $(`${id} .popup-video__iframe`).html(temp);
            $(`${id} .popup__overlay`).css({  "opacity": "1", "min-height": popupHeight + "px" });
            $("body").css({"overflow": "hidden", "margin-right": scrollSize + "px"});
			$(".wrapper").addClass("blur");
        });
    }

    this.videoClose = function(id){
        $(`${id} .popup-video__iframe`).html("");
        $(id).hide(0);
        $("body").css({"overflow": "", "margin-right":"0"});
        $(".wrapper").removeClass("blur");
        $(`${id} .popup-video__container .loader`).remove();
    }
	
	this.close = function(id){
		$(`${id} .popup__container`).css("transform","translate(-50%, -400%)");
		$(`${id} .popup__overlay`).css("opacity","0");
		
		setTimeout(function(){
			$(id).hide(0);
			$("body").css({"overflow": "", "margin-right":"0"});
			$(".wrapper").removeClass("blur");
		}, 500);
	}
}


//Select
$(function(){
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	for (i = 0; i < l; i++) {
	  selElmnt = x[i].getElementsByTagName("select")[0];
	  ll = selElmnt.length;
	  /* For each element, create a new DIV that will act as the selected item: */
	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x[i].appendChild(a);
	  /* For each element, create a new DIV that will contain the option list: */
	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");
	  for (j = 1; j < ll; j++) {
		/* For each option in the original select element,
		create a new DIV that will act as an option item: */
		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;

		if(selElmnt.options[j].hasAttribute("selected")){
			c.setAttribute("class", "same-as-selected");
		}
		
		c.addEventListener("click", function(e) {
			/* When an item is clicked, update the original select box,
			and the selected item: */
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
			  if (s.options[i].innerHTML == this.innerHTML) {
				s.selectedIndex = i;
				h.innerHTML = this.innerHTML;
				y = this.parentNode.getElementsByClassName("same-as-selected");
				yl = y.length;
				for (k = 0; k < yl; k++) {
				  y[k].removeAttribute("class");
				}
				this.setAttribute("class", "same-as-selected");
				break;
			  }
			}
			h.click();
			$(s).trigger("change");
		});
		b.appendChild(c);
	  }
	  x[i].appendChild(b);
	  a.addEventListener("click", function(e) {
		/* When the select box is clicked, close any other select boxes,
		and open/close the current select box: */
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active");
	  });
	}
	
	function closeAllSelect(elmnt) {
	  /* A function that will close all select boxes in the document,
	  except the current select box: */
	  var x, y, i, xl, yl, arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  xl = x.length;
	  yl = y.length;
	  for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
		  arrNo.push(i)
		} else {
		  y[i].classList.remove("select-arrow-active");
		}
	  }
	  for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
		  x[i].classList.add("select-hide");
		}
	  }
	}
	
	/* If the user clicks anywhere outside the select box,
	then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
});


/* Onload DOM                                        
--------------------------------------------------------*/
$(function(){
	//mob menu
	$(".js-toggle-menu").on("click", function(){
		$("body").toggleClass("menu--open");
	});

	//Click popup-overlay
	$(".popup__overlay").on("click", function(){
		let popupId = $(this).closest('.popup').attr("id");
		if($(`#${popupId}`).hasClass("popup-video"))
			popup.videoClose(`#${popupId}`);
		else
			popup.close(`#${popupId}`);    
	});
});