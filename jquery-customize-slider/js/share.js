;(function(win, $){
  "use strict";

  var wlb = $.wlb = (function(){
    var

    rollOver = function(option){
      var
        param = $.extend({
          "fixClass"  : "current",
          "onName"    : "_on",
          "offName"   : "_off",
          "overClass" : null
        }, option),
        $img = $( (!param["overClass"]? "." + param["overClass"] + ", " : "") + "img[src*=" + param["offName"] + "], input[src*=" + param["offName"] + "]" ),
        i = -1,
        len = $img.length;

      for( ; ++i < len; ){

        var
          $focus = $img.eq(i),
          defaultSrc = $focus.attr("src"),
          imgType = defaultSrc.match(/(\.gif|\.jpg|\.png)$/);

        if(imgType){
          imgType = imgType[0];
          var rollOverSrc;
          if(param["offName"] == ""){
            rollOverSrc = defaultSrc.replace(imgType, param["onName"] + imgType);
          } else {
            rollOverSrc = defaultSrc.replace(param["offName"] + imgType, param["onName"] + imgType);
          }
          var rollOverImg = new Image();
          rollOverImg.src = rollOverSrc;
          $focus.data("src", {
            "defaultSrc" : defaultSrc,
            "rollOverSrc" : rollOverSrc
          })
          .on({
            "mouseenter": function(){
              var $this = $(this);
              $this.attr("src", $this.data("src").rollOverSrc);
            },
            "mouseleave": function(){
              var $this = $(this);
              $this.not( "." + param.fixClass ).attr("src", $this.data("src").defaultSrc);
            }
          });
        }
      }
      $focus = null;
      return $img;
    };
    
    return {
      "rollOver"      : rollOver
    }   
  })();
    
  $(function(){
    wlb.rollOver();

  });
})(window, jQuery);