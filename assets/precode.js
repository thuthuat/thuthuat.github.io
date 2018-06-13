!function(e){function t(e){return e=e.replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&#34;/g,'"').replace(/&#39;/g,"'"),'<span style="color:#000000">'+e.replace(RegExp("<.*?>|&lt;!\\-\\-[\\s\\S]*?\\-\\-&gt;|\\/\\/[^\\n]+|#\\s+[^\\n]+|\\/\\*[\\s\\S]*?\\*\\/|\"(?:\\\\.|[^\"\\n])*\"|'(?:\\\\.|[^'\\n])*'|`(?:\\\\.|[^`])*`|&lt;\\/?[\\w:!-]+.*?&gt;|&lt;\\?\\S*|\\?&gt;|\\/[^\\n]+\\/[gimuy]*|\\$\\w+|&amp;[^\\s;]+;|\\b(?:true|false|null)\\b|(?:\\d*\\.)?\\d+|\\b(?:a(?:bstract|lias|nd|rguments|rray|s(?:m|sert)?|uto)|b(?:ase|egin|ool(?:ean)?|reak|yte)|c(?:ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(?:bugger|cimal|clare|f(?:ault|er)?|init|l(?:egate|ete)?)|do|double|e(?:cho|ls?if|lse(?:if)?|nd|nsure|num|vent|x(?:cept|ec|p(?:licit|ort)|te(?:nds|nsion|rn)))|f(?:allthrough|alse|inal(?:ly)?|ixed|loat|or(?:each)?|riend|rom|unc(?:tion)?)|global|goto|guard|i(?:f|mp(?:lements|licit|ort)|n(?:it|clude(?:_once)?|line|out|stanceof|t(?:erface|ernal)?)?|s)|l(?:ambda|et|ock|ong)|m(?:odule|utable)|NaN|n(?:amespace|ative|ext|ew|il|ot|ull)|o(?:bject|perator|r|ut|verride)|p(?:ackage|arams|rivate|rotected|rotocol|ublic)|r(?:aise|e(?:adonly|do|f|gister|peat|quire(?:_once)?|scue|strict|try|turn))|s(?:byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(?:emplate|hen|his|hrows?|ransient|rue|ry|ype(?:alias|def|id|name|of))|u(?:n(?:checked|def(?:ined)?|ion|less|signed|til)|se|sing)|v(?:ar|irtual|oid|olatile)|w(?:char_t|hen|here|hile|ith)|xor|yield)\\b","g"),function(e){return e&&("<"===e[0]&&">"===e.slice(-1)||/^\W$/.test(e)||(e="&lt;?"===e.slice(0,5)||"?&gt;"===e||"&lt;!--"===e.slice(0,7)?'<span style="color:#008000;font-style:italic;">'+e+"</span>":"&lt;!"===e.slice(0,5)?'<span style="color:#4682B4;font-style:italic;">'+e+"</span>":"&lt;"===e.slice(0,4)&&"&gt;"===e.slice(-4)?'<span style="color:inherit;">'+n(e)+"</span>":"/"!==e[0]&&"#"!==e[0]||!/^(\/\/|#\s+|\/\*)/.test(e)?-1!=="\"'`".indexOf(e[0])?'<span style="color:#008000;">'+e+"</span>":"/"===e[0]?'<span style="color:#4682B4;">'+e+"</span>":/^(\d*\.)?\d+$/.test(e)?'<span style="color:#0000FF;">'+e+"</span>":"true"===e||"false"===e||"null"===e?'<span style="color:#A52A2A;font-weight:bold;">'+e+"</span>":"$"===e[0]?'<span style="font-weight:bold;">'+e+"</span>":"&amp;"===e.slice(0,5)&&";"===e.slice(-1)?'<span style="color:#FF4500;">'+e+"</span>":'<span style="color:#FF0000;">'+e+"</span>":'<span style="color:#808080;font-style:italic;">'+e+"</span>")),e})+"</span>"}function n(e){return e.replace(/&lt;(\/?)(\S+)(\s.*?)?&gt;/g,function(e,t,n,l){return n='<span style="color:#800080;font-weight:bold;">'+n+"</span>",l=l?l.replace(/(\s+)([^\s=]+)(?:=("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|[^\s"']+))?/g,function(e,t,n,l){var s=t+'<span style="font-weight:bold;">'+n+"</span>";return l&&(s+='=<span style="color:#0000FF;">'+l+"</span>"),s}):"","&lt;"+t+n+l+"&gt;"})}e.GSH=function(e){if(e){e.nodeName&&(e=[e]);for(var n,l=0,s=e.length;s>l;++l)n=e[l],n.innerHTML=t(n.innerHTML)}},e.SH=t,e.SH_TAG=n}(window,document);
GSH(document.querySelectorAll('pre > code'));
// TO DO
$(document).ready(function() {
var e = $("pre code"),
	  l = "<button class='copycode'>Copy</button>";
    e.before(l);
});
(function($){
$.fn.selectText = function(){
    var doc = document;
    var element = this[0];
    console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();        
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy");
    }
}
$.fn.removeRange = function(){
 if (window.getSelection) {
    if (window.getSelection().empty) {
            window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
     }
    } else if (document.selection) {
           document.selection.empty();
  }
 }
})(jQuery);
$(document).ready(function() {
  $(".copycode").click(function() {
    var e = $(this).parent().find('code'),
        l = $(this),
        c ="Copied",
        d = l.text();
     e.selectText();
     l.html(c);
   setTimeout(function(){
     l.html(d);
   e.removeRange();
   },1000)
  });
});
