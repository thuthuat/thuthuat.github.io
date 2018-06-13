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
