;(function($, win){

  var $sliderContent,
      $sliderMain,
      $win,
      imgWidth = 1600,
      winWidth,
      minWidth = 1000,
      imageLen = 0,
      timer,
      current = 0,
      interval = 5000,
      speed = 1000;

  var
  resize = function(event){
    if(event){
      event.preventDefault();
    }
    clearTimeout(timer);
    winWidth = $win.width();
    winWidth = minWidth > winWidth? minWidth : winWidth;
    $sliderMain.find("li")
    .css({
      "width": winWidth + "px"
    });

    $sliderMain
    .stop()
    .css({
      "width": (imageLen + 2) * winWidth + "px",
      "marginLeft": -( winWidth * (current + 1) ) + "px"
    },speed);
    timer = setTimeout( autoSlide , interval );

  },
  autoSlide = function(){
    clearTimeout(timer);
    var next = current + 1 > imageLen - 1 ? 0 : current + 1;
    slide(next);

    timer = setTimeout( autoSlide , interval );
  },
  slide = function(next){
    var nextPosition = checkPosition(next);
    $sliderMain
    .stop()
    .animate({
      "marginLeft": nextPosition + "px"
    },speed);
    current = next;
  },

  checkPosition = function(next){
    var currentPosition = parseInt($sliderMain.css("marginLeft"), 10);
    var nextPosition = -(winWidth * next + winWidth);
    var edgePosition = -(imageLen * winWidth + winWidth);

    if( current === imageLen - 1 && next === 0 ){
      $sliderMain
      .stop()
      .css({
        "marginLeft": 0
      },speed);
      return -(winWidth);
    } else if( current === 0 && next === imageLen - 1 ){
      $sliderMain
      .stop()
      .css({
        "marginLeft": -(imageLen * winWidth + winWidth) + "px"
      },speed);
      return -(imageLen * winWidth);
    }
    return nextPosition;
  };

  $(function(){
    var $cloneFirst, $cloneLast;
    $win = $(win);
    $sliderContent = $(".slide");
    $sliderMain = $sliderContent.find("ul");
    imgWidth = $sliderMain.find("li").width();

    imageLen = $sliderMain.find("li").length;

    winWidth = $win.width();
    winWidth = minWidth > winWidth? minWidth : winWidth;

    $cloneFirst = $sliderMain.find("li:first").clone();
    $cloneLast = $sliderMain.find("li:last").clone();


    $sliderMain
    .append($cloneFirst)
    .prepend($cloneLast);

    resize();

    $win.off().on("resize", resize);

    $(".slide .next, .slide .prev")
    .off()
    .on("click", function(event) {
      event.preventDefault();
      if( $sliderMain.is(":animated") ){
        return;
      }
      var next;
      clearTimeout(timer);
      if( $(this).hasClass("next") ){
        next = (current + 1) > imageLen - 1 ? 0 : current + 1;
      } else {
        next = (current - 1) < 0 ? imageLen - 1 : current - 1;
      }
      slide(next);
      timer = setTimeout( autoSlide , interval );
    });

    timer = setTimeout( autoSlide, interval );
  });

}(jQuery, window));