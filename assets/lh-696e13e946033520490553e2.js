;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "p20onv4mhn"							}), success: c, error: e});						}, cb  = function(section, $) {(function(a,b){"use strict";function c(b,c){this.element=a(b),this.options=a.extend({},d,c),this._defaults=d,this._name="countDown",this.init()}var d={css_class:"countdown",always_show_days:!1,with_labels:!0,with_seconds:!0,with_separators:!0,with_hh_leading_zero:!0,with_mm_leading_zero:!0,with_ss_leading_zero:!0,label_dd:"days",label_hh:"hours",label_mm:"minutes",label_ss:"seconds",separator:":",separator_days:","};a.extend(c.prototype,{init:function(){this.element.children().length||(this.element.attr("datetime")&&(this.endDate=this.parseEndDate(this.element.attr("datetime"))),void 0===this.endDate&&(this.endDate=this.parseEndDate(this.element.text())),void 0===this.endDate||(this.element.is("time")?this.timeElement=this.element:(this.timeElement=a("<time></time>"),this.element.html(this.timeElement)),this.markup(),this.setTimeoutDelay=this.sToMs(1),this.daysVisible=!0,this.timeElement.on("time.elapsed",this.options.onTimeElapsed),this.timeElement.on("time.tick",this.options.onTick),this.doCountDown()))},parseEndDate:function(a){var b;return(b=this.parseDuration(a),b instanceof Date)?b:(b=this.parseDateTime(a),b instanceof Date)?b:(b=this.parseHumanReadableDuration(a),b instanceof Date)?b:(b=Date.parse(a),!isNaN(b))?new Date(b):void 0},parseDuration:function(a){var b=a.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d{1,3}))?S)?$/);if(b){var c,e,f,g,h,i;return e=b[1]?this.dToMs(b[1]):0,f=b[2]?this.hToMs(b[2]):0,g=b[3]?this.mToMs(b[3]):0,h=b[4]?this.sToMs(b[4]):0,i=b[5]?parseInt(b[5],10):0,c=new Date,c.setTime(c.getTime()+e+f+g+h+i),c}},parseDateTime:function(a){var b=a.match(/^(\d{4,})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?:\:(\d{2}))?(?:\.(\d{1,3}))?([Z\+\-\:\d]+)?$/);if(b){var c=b[8]?b[8].match(/^([\+\-])?(\d{2}):?(\d{2})$/):void 0,e=0;c&&(e=this.hToMs(c[2])+this.mToMs(c[3]),e="-"===c[1]?e:-e);var f,g,h,i,j,k,l,m;return g=b[1],h=b[2]-1,i=b[3],j=b[4]||0,k=b[5]||0,l=b[6]||0,m=b[7]||0,f=new Date(Date.UTC(g,h,i,j,k,l,m)),f.setTime(f.getTime()+e),f}},parseHumanReadableDuration:function(a){var b=a.match(/^(?:(\d+).+\s)?(\d+)[h:]\s?(\d+)[m:]?\s?(\d+)?[s]?(?:\.(\d{1,3}))?$/);if(b){var c,e,f,g,h,i;return c=new Date,e=b[1]?this.dToMs(b[1]):0,f=b[2]?this.hToMs(b[2]):0,g=b[3]?this.mToMs(b[3]):0,h=b[4]?this.sToMs(b[4]):0,i=b[5]?parseInt(b[5],10):0,c.setTime(c.getTime()+e+f+g+h+i),c}},sToMs:function(a){return 1e3*parseInt(a,10)},mToMs:function(a){return 1e3*(60*parseInt(a,10))},hToMs:function(a){return 1e3*(60*(60*parseInt(a,10)))},dToMs:function(a){return 1e3*(60*(60*(24*parseInt(a,10))))},msToS:function(a){return parseInt(a/1e3%60,10)},msToM:function(a){return parseInt(a/1e3/60%60,10)},msToH:function(a){return parseInt(a/1e3/60/60%24,10)},msToD:function(a){return parseInt(a/1e3/60/60/24,10)},markup:function(){var a=["<span class=\"item item-dd\">","<span class=\"dd\"></span>","<span class=\"label label-dd\">",this.options.label_dd,"</span>","</span>","<span class=\"item item-hh\">","<span class=\"hh-1\"></span>","<span class=\"hh-2\"></span>","<span class=\"label label-hh\">",this.options.label_hh,"</span>","</span>","<span class=\"hub-theme-color item item-mm\">","<span class=\"mm-1\"></span>","<span class=\"mm-2\"></span>","<span class=\"label label-mm\">",this.options.label_mm,"</span>","</span>","<span class=\"hub-theme-color item item-ss\">","<span class=\"ss-1\"></span>","<span class=\"ss-2\"></span>","<span class=\"label label-ss\">",this.options.label_ss,"</span>","</span>"];this.timeElement.html(a.join("")),this.options.with_labels||this.timeElement.find(".label").remove(),this.options.with_separators||this.timeElement.find(".separator").remove(),this.options.with_seconds||(this.timeElement.find(".item-ss").remove(),this.timeElement.find(".separator").last().remove()),this.item_dd=this.timeElement.find(".item-dd"),this.separator_dd=this.timeElement.find(".separator-dd"),this.remaining_dd=this.timeElement.find(".dd"),this.remaining_hh1=this.timeElement.find(".hh-1"),this.remaining_hh2=this.timeElement.find(".hh-2"),this.remaining_mm1=this.timeElement.find(".mm-1"),this.remaining_mm2=this.timeElement.find(".mm-2"),this.remaining_ss1=this.timeElement.find(".ss-1"),this.remaining_ss2=this.timeElement.find(".ss-2"),this.timeElement.addClass(this.options.css_class)},doCountDown:function(){var a=this.endDate.getTime()-new Date().getTime(),c=this.msToS(a),d=this.msToM(a),e=this.msToH(a),f=this.msToD(a);if(0>=a&&(c=d=e=f=0),this.displayRemainingTime({ss:10>c?(this.options.with_ss_leading_zero?"0":" ")+c.toString():c.toString(),mm:10>d?(this.options.with_mm_leading_zero?"0":" ")+d.toString():d.toString(),hh:10>e?(this.options.with_hh_leading_zero?"0":" ")+e.toString():e.toString(),dd:f.toString()}),this.options.with_seconds||0!==f||0!==d||0!==e||(c=0),0===f&&0===d&&0===e&&0===c)return this.timeElement.trigger("time.elapsed");var g=this;return b.setTimeout(function(){g.doCountDown()},g.setTimeoutDelay),this.timeElement.trigger("time.tick",a)},displayRemainingTime:function(a){var b=[];b.push("P"),"0"!==a.dd&&b.push(a.dd,"D"),b.push("T",a.hh,"H",a.mm,"M"),this.options.with_seconds&&b.push(a.ss,"S"),this.timeElement.attr("datetime",b.join("")),this.daysVisible&&!this.options.always_show_days&&"0"===a.dd&&(this.item_dd.remove(),this.separator_dd.remove(),this.daysVisible=!1),this.remaining_dd.text(a.dd),this.remaining_hh1.text(a.hh[0].trim()),this.remaining_hh2.text(a.hh[1]),this.remaining_mm1.text(a.mm[0].trim()),this.remaining_mm2.text(a.mm[1]),this.remaining_ss1.text(a.ss[0].trim()),this.remaining_ss2.text(a.ss[1])}}),a.fn.countDown=function(b){var d=arguments;if(b===void 0||"object"==typeof b)return this.each(function(){a.data(this,"plugin_countDown")||a.data(this,"plugin_countDown",new c(this,b))});if("string"==typeof b&&"_"!==b[0]&&"init"!==b){var e;return this.each(function(){var f=a.data(this,"plugin_countDown");f instanceof c&&"function"==typeof f[b]&&(e=f[b].apply(f,Array.prototype.slice.call(d,1))),"destroy"==b&&a.data(this,"plugin_countDown",null)}),void 0===e?this:e}}})(window.jQuery,window,document);;var cb  = function($) {
var el = $(this);
var xhr = null;
profileParameterCheck(section.settings.profile_user);


// validator profile if exist and show missing feild
function profileParameterCheck(profileUser){
    if(typeof profileUser === 'string' && profileUser !== ''){
        profileUser = JSON.parse(profileUser);
    }

	let require_parameter = [];

    if(profileUser.length){
        // make require to array not double
        $.each(profileUser, function(index, value){
            let parseStr = value.split('|');
            // if exist require parameter
            if(parseStr[2]){
                // only 1 parameter
                if (parseStr[2].indexOf(',') == -1) {
                    if(require_parameter.includes(parseStr[2]) != true){
                        require_parameter.push(parseStr[2]);
                        return;
                    }
                }

                // multi parameter
                let parseStrRequire = parseStr[2].split(',');
                $.each(parseStrRequire, function(index2, value2){
                    if(require_parameter.includes(value2) != true){
                        require_parameter.push(value2);
                    }
                });
            }
        });

	}

	var errorHtml = validator_profile_require_parameter(require_parameter);
	el.find('.section_smart_error_text').html(errorHtml);


    //Event submit subcribe from
    el.find('.lh-subcriber-form').submit(function(e){
        e.preventDefault();

        if(xhr !== null){
            xhr.abort();
        }

        var t = $(this),
            formData = t.serializeArray(),
            messageDiv = t.find('.section_smart_error_text_submit'),
            formAction = t.attr('action');

        messageDiv.html('');

        if(formAction == ''){
            messageDiv.html('<div class="alert alert-error">An error has occurred. Please try to do it again.</div>');
        }else{
        t.addClass('loading');
        //Send ajax request to endpoint
        xhr = $.post( t.attr('action'),  formData)
          .done(function( data ) {
            var classAlert = data.status == 'success' ? 'success' : 'error';
            messageDiv.html('<div class="alert alert-'+ classAlert +'">'+ data.message +'</div>');
            if(data.status == 'success'){
                setTimeout(function(){
                    el.find('.section_smart_demo').addClass('section_smart_hide');
                }, 1500);
            }
            xhr = null;
            t.removeClass('loading');
          });
        }
    });
}

// validator profile require parameter
function validator_profile_require_parameter(parameters = ''){
    if(parameters.length){
        let parseStr = parameters;
        let errorText = '';
        $.each(parseStr, function(index, value){
            if(el.find('[name="'+value+'"]').length == 0){
                errorText += '<br/>Missing '+value+' field';
            }
        });
        return errorText;
	}
}

 };						cb.bind($('section[data-section-id="p20onv4mhn"]').get(0))(jQuery);};					cb.bind($('section[data-section-id="p20onv4mhn"]').get(0))({						url: "https://library.layouthub.com/HUB/files/U2VwLS0yMDIw/NTk5NDQ1MzA1/shopify-third-release/pages/a9I5F6LK1zBDE3vN/newsletter/",						settings: {"profile_user":"[\"1897|/apps/layouthub/hub-form/|email\"]"}					}, jQuery);})(jQuery);;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "ivnffpolk0b"							}), success: c, error: e});						}, cb  = function(section, $) {};					cb.bind($('section[data-section-id="ivnffpolk0b"]').get(0))({						url: "https://library.layouthub.com/HUB/files/U2VwLS0yMDIw/NTk5NDQ1MzA1/shopify-third-release/pages/fDRqnaNOgGdC41kh/reason/",						settings: {}					}, jQuery);})(jQuery);;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "xkpzlh9swci"							}), success: c, error: e});						}, cb  = function(section, $) {};					cb.bind($('section[data-section-id="xkpzlh9swci"]').get(0))({						url: "https://library.layouthub.com/HUB/files/Tm92LS0yMDE5/NTc0ODY0ODc5/First_release/pages/hpioO0EQBk5mvCXS/content/",						settings: {}					}, jQuery);})(jQuery);;(function($){var ajax = (p, c, e) => { $.ajax({url: window.location.href, method: "POST",							data: $.extend(true, p !== undefined && typeof p == "object" ? p : {}, {								action: "layouthub_section_ajax", section_id: "0ww6tozxjlse"							}), success: c, error: e});						}, cb  = function(section, $) {};					cb.bind($('section[data-section-id="0ww6tozxjlse"]').get(0))({						url: "https://library.layouthub.com/HUB/files/SmFuLS0yMDIx/NjEwNDM1MTg1/release-1-2021/pages/tRqiempHv4yxnf1O/form/",						settings: {}					}, jQuery);})(jQuery);;console.log('This page layout has been built by https://www.layouthub.com');