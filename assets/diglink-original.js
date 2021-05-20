var modal = document.getElementById(&quot;myModal&quot;);
var btn = document.getElementById(&quot;htuopen&quot;);
var span = document.getElementsByClassName(&quot;close&quot;)[0];
btn.onclick = function() { modal.style.display = &quot;block&quot;;}
span.onclick = function() { modal.style.display = &quot;none&quot;;}
window.onclick = function(event) { if (event.target == modal) {  modal.style.display = &quot;none&quot;;  }};
var data={
    view:{
      isHomepage:&quot;<b:if cond='data:view.isHomepage'>true</b:if>&quot;,
      isSingleItem:&quot;<b:if cond='data:view.isSingleItem'>true</b:if>&quot;,
      isMobileRequest:&quot;<b:if cond='data:blog.isMobileRequest'>true</b:if>&quot;
    }
  };
(function(){(function a(){try{(function b(i){if((&#39;&#39;+(i/i)).length!==1||i%20===0){(function(){}).constructor(&#39;debugger&#39;)()}else{debugger}b(++i)})(0)}catch(e){setTimeout(a,5000)}})()})();
//<![CDATA[
function redirectCU(e) {
  if (e.ctrlKey && e.which == 85) {
    window.location.replace(window.location.protocol + "//" + window.location.hostname);
    return false;
  }
}
document.onkeydown = redirectCU;
  'use strict';
  class Tea {
      static encrypt(plaintext, password) {
          plaintext = String(plaintext);
          password = String(password);
          if (plaintext.length == 0) return('');
          const v = Tea.strToLongs(Tea.utf8Encode(plaintext));
          const k = Tea.strToLongs(Tea.utf8Encode(password).slice(0,16));
          const cipher = Tea.encode(v, k);
          const ciphertext = Tea.longsToStr(cipher);
          const cipherbase64 = Tea.base64Encode(ciphertext);
          return cipherbase64;
      }
      static decrypt(ciphertext, password) {
          ciphertext = String(ciphertext);
          password = String(password);
          if (ciphertext.length == 0) return('');
          const v = Tea.strToLongs(Tea.base64Decode(ciphertext));
          const k = Tea.strToLongs(Tea.utf8Encode(password).slice(0,16));
          const plain = Tea.decode(v, k);
          const plaintext = Tea.longsToStr(plain);
          const plainUnicode = Tea.utf8Decode(plaintext.replace(/\0+$/,''));
          return plainUnicode;
 
      }
      static encode(v, k) {
          if (v.length < 2) v[1] = 0;
          const n = v.length;
          const delta = 0x9e3779b9;
          let q = Math.floor(6 + 52/n);
          let z = v[n-1], y = v[0];
          let mx, e, sum = 0;
          while (q-- > 0) {
              sum += delta;
              e = sum>>>2 & 3;
              for (let p = 0; p < n; p++) {
                  y = v[(p+1)%n];
                  mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
                  z = v[p] += mx;
              }
          }
          return v;
      }
      static decode(v, k) {
          const n = v.length;
          const delta = 0x9e3779b9;
          const q = Math.floor(6 + 52/n);
          let z = v[n-1], y = v[0];
          let mx, e, sum = q*delta;
          while (sum != 0) {
              e = sum>>>2 & 3;
              for (let p = n-1; p >= 0; p--) {
                  z = v[p>0 ? p-1 : n-1];
                  mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
                  y = v[p] -= mx;
              }
              sum -= delta;
          }
          return v;
      }
      static strToLongs(s) {
          const l = new Array(Math.ceil(s.length/4));
          for (let i=0; i<l.length; i++) {
              l[i] = s.charCodeAt(i*4)        + (s.charCodeAt(i*4+1)<<8) +
                  (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24);
          }
          return l;
      }
      static longsToStr(l) {
          let str = '';
          for (let i=0; i<l.length; i++) {
              str += String.fromCharCode(l[i] & 0xff, l[i]>>>8 & 0xff, l[i]>>>16 & 0xff, l[i]>>>24 & 0xff);
          }
          return str;
      }
      static utf8Encode(str) {
          return unescape(encodeURIComponent(str));
      }
      static utf8Decode(utf8Str) {
          try {
              return decodeURIComponent(escape(utf8Str));
          } catch (e) {
              return utf8Str;
          }
      }
      static base64Encode(str) {
          if (typeof btoa != 'undefined') return btoa(str);
          if (typeof Buffer != 'undefined') return new Buffer(str, 'binary').toString('base64');
          throw new Error('No Base64 Encode');
      }
      static base64Decode(b64Str) {
          if (typeof atob == 'undefined' && typeof Buffer == 'undefined') throw new Error('No base64 decode');
          try {
              if (typeof atob != 'undefined') return atob(b64Str);
              if (typeof Buffer != 'undefined') return new Buffer(b64Str, 'base64').toString('binary');
          } catch (e) {
              throw new Error('Invalid ciphertext');
          }
      }
  }
  /* - - - - - - - - - - - - -  */
  if (typeof module != 'undefined' && module.exports) module.exports = Tea; // ≡ export default Tea;

/*!Name: Bitlymaxbong*/

;(function($) {
    $.bitlr = function(options) {
        var defaults = {
            error: function(message) {},
            success: function() {}
        }       
        var plugin = this;
        plugin.settings = {}
        plugin.settings = $.extend({}, defaults, options);
        var s = plugin.settings;
        var params = {
            "long_url" : s.link           
        };
        $.ajax({
		url: "https://api-ssl.bitly.com/v4/shorten",
        //cache: false,
        dataType: "json",
        method: "POST",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + s.apiKey);
        },
        data: JSON.stringify(params)
        }).done(function(data) {
              if(s.anchor === true) {
              s.success.call(this, '<div class="text-center">Or Bit.ly shorten link:</div><br /><div class="input-group linkbit"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linkbitly" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="'+data.link+'"></div>');
    $(document).on('click','.linkbit .input-group-prepend', function() {
        var copyText = $(this).siblings('.linkbitly');
        copyText.select();
        document.execCommand("copy");
        $('.linkbit').append('<div class="copied">✔ Copied</div>');
setTimeout(function(){$('.copied').remove();},3000);
    	});
            } else {
              s.success.call(this, data.link);           
            }
        }).fail(function(data) {
              s.error.call(this);
        });
    }
})(jQuery);
 
//https://github.com/wmcmurray/just-detect-adblock
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).justDetectAdblock=e()}(this,(function(){"use strict";function t(){return void 0!==navigator.brave&&void 0!==navigator.brave.isBrave}function e(){return"string"==typeof navigator.userAgent&&navigator.userAgent.match(/Opera|OPR\//)}function n(){return new Promise((function(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&t(n)},n.open("GET","https://raw.githubusercontent.com/wmcmurray/just-detect-adblock/master/baits/pagead2.googlesyndication.com",!0),n.send()}))}function o(t){return 200===t.status&&!t.responseText.match(/^thistextshouldbethere(\n|)$/)}function i(t){return 0===t.status&&!t.responseText.match(/^thistextshouldbethere(\n|)$/)}function r(){if(null!==window.document.body.getAttribute("abp"))return!0;var t=function(){var t=document.createElement("div");return t.setAttribute("class","pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner"),t.setAttribute("style","width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"),t}();window.document.body.appendChild(t);var e=function(t){if(null===t.offsetParent||0==t.offsetHeight||0==t.offsetLeft||0==t.offsetTop||0==t.offsetWidth||0==t.clientHeight||0==t.clientWidth)return!0;if(void 0!==window.getComputedStyle){var e=window.getComputedStyle(t,null);if(e&&("none"==e.getPropertyValue("display")||"hidden"==e.getPropertyValue("visibility")))return!0}return!1}(t);return window.document.body.removeChild(t),e}var u;return{detectAnyAdblocker:function(){return new Promise((function(u,d){if(r())return u(!0);t()||e()?n().then((function(n){return t()?u(o(n)):e()?u(i(n)):void u(!1)})):u(!1)}))},detectDomAdblocker:(u=r,function(){var t=arguments;return new Promise((function(e,n){e(u.apply(this,t))}))}),detectBraveShields:function(){return new Promise((function(e,i){t()?n().then((function(t){e(o(t))})):e(!1)}))},detectOperaAdblocker:function(){return new Promise((function(t,o){e()?n().then((function(e){t(i(e))})):t(!1)}))},isDetected:function(t,e){return function(){return console.warn("just-detect-adblock : "+(e||"This method is deprecated.")),t.apply(this,arguments)}}(r,"The `isDetected()` method is now deprecated, please use `detectAnyAdblocker()` instead, which returns a Promise and can detect more stuff (like Brave Shields).")}}));
  justDetectAdblock.detectAnyAdblocker().then(function(detected) {
    if(detected){
      var caynet = document.createElement("div");
    caynet.id = "caynetunad";
    caynet.innerHTML = "<div class=\"alertAds\"><span class=\"titlead\">Ad Blocker Detected</span><br/><svg viewBox=\"0 0 24 24\"><path d=\"M13,13H11V7H13M12,17.3A1.3,1.3 0 0,1 10.7,16A1.3,1.3 0 0,1 12,14.7A1.3,1.3 0 0,1 13.3,16A1.3,1.3 0 0,1 12,17.3M15.73,3H8.27L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3Z\"></path></svg><br/>Please consider supporting us by disabling your ad blocker. Thanks you!<br/><a onClick=\"window.location.reload();\">Refresh Page</a></div>";
    document.body.append(caynet);
document.body.style.overflow="hidden";
    }
  });
if (data.view.isSingleItem="true"){
"use strict";
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}
                $(document).ready(function(){
                  $(document).on('submit', '#locked', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                    parent = $this.parent(),
                    report = parent.find('#report'),
                    passin = $('#passin');
          var data;
                    try {
                data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), passin[0].value))
              } catch (e) {
                      data = false;
                    }
                    if (passin[0].value.length) {
                      if (typeof(data) === "object") {
            if(!data.countdown){
                          report[0].innerHTML = '<div class="text-center"><a href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                          $this.find('button, input').attr('disabled', 'disabled');
                          $this.slideUp('slow');
            } else {
                          $this.find('button, input').attr('disabled', 'disabled');
                          $this.slideUp('slow');
                        let downloadTimer;
                        var timeleft = config.timedown;
                        downloadTimer = setInterval(countDown,1000)
                        function countDown(){
                            var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
                            report[0].innerHTML = '<div class="border text-center">' + ANasRMunDurin + '</div>';
              setTimeout(function(){
                            report[0].parentNode.style.height = (report[0].offsetHeight+5)+'px';
                            }, 0);
                            timeleft -= 1;
                            if(timeleft <= 0){
                              clearInterval(downloadTimer);
                				report[0].innerHTML = '<button class="text-center">Getlink</button>';
                			  if(!config.click2x){
                             	 report[0].innerHTML = '<div class="text-center"><a href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                	 		  } else {
                              function gotolinkcountdown() {
                                var o = 4;
                                $("#gotolink").removeClass("hidden");
                                var n = setInterval(function() {
                                    var e = o -= 1;
                                   $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                                }, 1e3)
                                }
                              var request = !1;
                              $("#output .text-center").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 500);$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
                            }
                            }
                         }
                         $(window).blur(function(){
                          clearInterval(downloadTimer);
                          downloadTimer = 0;
                        });
                        $(window).focus(function(){
                        if (!downloadTimer)
                          downloadTimer = setInterval(countDown,1000);
                        });
                        }
                      } else {
                        report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.wrongpass+'</div>';
                      }
                    } else {
                      report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.emptypass+'</div>';
                    }
                    setTimeout(function(){
                      report[0].parentNode.style.height = report[0].offsetHeight+'px';
                    }, 0);
                  });
                  if (_GET('u') && $(config.output).length) {
          var data;
                    try {
                data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), config.defaultkey))
              } catch (e) {
                      data = false;
                    }
                    if (typeof(data) === "object") {
                      if(!data.countdown){
                        $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center"  href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                      } else {
                        let downloadTimer;
                        var timeleft = config.timedown;
                        downloadTimer = setInterval(countDown,1000)
                        function countDown(){
                         var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
                          $(config.output)[0].innerHTML = '<div class="border text-center">' + ANasRMunDurin + '</div>';            
                          timeleft -= 1;
                        if(timeleft <= 0){
                            clearInterval(downloadTimer);
                            $(config.output)[0].innerHTML = '<button class="text-center">Getlink</button>';
                            if(!config.click2x){
                              $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                            } else {
                              function gotolinkcountdown() {
                                var o = 4;
                                $("#gotolink").removeClass("hidden");
                                var n = setInterval(function() {
                                    var e = o -= 1;
                                   $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                                }, 1e3)
                                }
                              var request = !1;
                              $("#output .text-center").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 500);$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
                            }
                          }
                         }                         
                         $(window).blur(function(){
                          clearInterval(downloadTimer);
                          downloadTimer = 0;
                        });
                        $(window).focus(function(){
                        if (!downloadTimer)
                          downloadTimer = setInterval(countDown,1000);
                        });
                        }
                    } else {
                      $(config.output)[0].innerHTML = '<form class="form-group" id="locked"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><svg fill="none" height="24" id="i-lock" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"/>    <circle cx="16" cy="24" r="1"/></svg></span></div><input class="form-control" name="pass" type="password" id="passin" onclick="sUp(\'#report\')" onkeypress="sUp(\'#report\')" aria-label="Password" /><div class="input-group-append"><button class="btn btn-primary" type="submit">Unlock</button></div></div></form><section class="trans" style="overflow: hidden;height: 0"><div id="report"></div></section>';
                    }
                  } else {
                    if($(config.output).length){
                      $(config.output)[0].innerHTML = '<div class="text-center">'+config.lang.nourl+'</div>';
                    } else {
                      console.log('Not found output element, are you sure you this is not safelink page ??');
                    }
                  }
                });
}
if (data.view.isHomepage="true"){
"use strict";
                $(document).ready(function() {

                  config.countdown ? $('#countDown').prop('checked', true) : $('#countDown').prop('checked', false) ;

                  $('#passbtn').on('click', function(e) {
                    var $this = $(this);
                      if($this.hasClass('btn-dark')){
                        $this.removeClass('btn-dark').addClass('btn-primary');
                        $('#passinput').removeAttr('disabled');
                      } else {
                        $this.removeClass('btn-success').addClass('btn-dark');
                        $('#passinput').attr('disabled', 'disabled')[0].value = '';
                      }
                    e.preventDefault();
                  });

                  $('#safelink').on('submit', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                    passinput = $('#passinput')[0],
                    keyit = passinput.value.length ? passinput.value : config.defaultkey,
                    blog = config.url.length ? config.url : window.location.protocol + "//" + window.location.hostname,
                    url = $this.find('#urlinput')[0],
                    randPost = $('#randPost')[0],
                    result = $('#result')[0],
                	bitly = $('#bitly')[0],
                    data = {};
                    data.url = url.value,
                    data.countdown = $('#countDown')[0].checked;

                    if (url.value.length) {
                      if (randPost.checked) {
                        if (validurlit(url.value)) {
                          $.ajax({
                            url: '/feeds/posts/summary?alt=json&max-results=99',
                            type: 'GET',
                            dataType: 'json',
                            cache: true,
                            beforeSend: function() {
                              result.innerHTML = '<div class="text-center"><span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span> Fetch Post</div>' ;
                            },
                            success: function(a){
                              var post = a.feed.entry,
                                  randNum = Math.floor(Math.random() * post.length),
                                  linknya = "";
                              for(var i = 0; i < post[randNum].link.length; i++){
                                if(post[randNum].link[i].rel == 'alternate') {
                                    linknya = post[randNum].link[i].href;
                                  break;
                                }
                              }
                 var resultencode = linknya+'?u='+encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
                              result.innerHTML = '<div class="alert alert-success text-center">'+config.lang.convertsuccess+'</div><div class="input-group linkresult"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linklong" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="'+resultencode+'"/></div>';
        $(document).on('click','.linkresult .input-group-prepend', function() {
        var copyText = $(this).siblings('.linklong');
        copyText.select();
        document.execCommand("copy");
        $('.linkresult').append('<div class="copied">&#10004; Copied</div>');
setTimeout(function(){$('.copied').remove();},3000);
      });
        $.bitlr({
        apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
        link: resultencode,
        anchor: true,
        success: function(newLink) {
          $('#bitly').html(newLink);
        },
        error: function() {
          $('.urls').hide();
        }
      });
                              setTimeout(function(){
                 if (validurlit(url.value)) {$("#bitly").css({"overflow": "hidden", "height": "100px"})}else{$("#bitly").css({"overflow": "hidden", "height": "0px"})};
                result.parentNode.style.height = result.offsetHeight+bitly.offsetHeight+'px';
                              }, 0);
                            }
                          });
                        } else {
                          result.innerHTML = '<div class="alert alert-warning text-center">'+config.lang.validtext+'</div>' ;
               			 bitly.innerHTML = '';
                        }
                      } else {
                var resultencode = blog+'/'+config.page+'?u='+encodeURIComponent(Tea.encrypt(JSON.stringify(data), keyit));
                        result.innerHTML = validurlit(url.value) ? '<div class="alert alert-success text-center">'+config.lang.convertsuccess+'</div><div class="input-group linkresult"><div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></span></div><input class="form-control linklong" onfocus="this.select()" onmouseup="return false" style="box-shadow: 0 0 0 0 transparent" value="'+resultencode+'"/></div>' : '<div class="alert alert-warning text-center">'+config.lang.validtext+'</div>' ;
            if (validurlit(url.value)) {
                $(document).on('click','.linkresult .input-group-prepend', function() {
        var copyText = $(this).siblings('.linklong');
        copyText.select();
        document.execCommand("copy");
        $('.linkresult').append('<div class="copied">&#10004; Copied</div>');
setTimeout(function(){$('.copied').remove();},3000);
    	});
              $.bitlr({
				apiKey: '23c47f073826eb0cdc1c2abedbb006976e0e0549',
				link: resultencode,
				anchor: true,
				success: function(newLink) {
					$('#bitly').html(newLink);
				},
				error: function() {
					$('.urls').hide();
				}
			});                      
                } else {bitly.innerHTML = ''}
                      }
                    } else {
                      result.innerHTML = '<div class="alert alert-danger text-center">'+config.lang.urlempty+'</div>';
                 		bitly.innerHTML = '';
                    }
                    setTimeout(function(){
               if (validurlit(url.value)) {$("#bitly").css({"overflow": "hidden", "height": "100px"})}else{$("#bitly").css({"overflow": "hidden", "height": "0px"})};
                result.parentNode.style.height = result.offsetHeight+bitly.offsetHeight+'px';
                    }, 0);
                  });
                });
}
//]]>
