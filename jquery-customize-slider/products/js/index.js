;(function($, win){

  var $sliderContent,
      $sliderMain,
      $win,
      imgWidth = 214,
      itemLen = 0,
      timer,
      current = 0,
      interval = 5000,
      speed = 1000,
      mlslide = 74;

  var
  resize = function(event){
    if(event){
      event.preventDefault();
    }
    clearTimeout(timer);

    $sliderMain
    .stop()
    .css({
      "width": (itemLen + 2) * imgWidth + (itemLen + 2 - 1)*mlslide  + "px",
      "marginLeft": -( imgWidth * (current + 1) + mlslide ) + "px"
    },speed);
    timer = setTimeout( autoSlide , interval );

  },
  autoSlide = function(){
    clearTimeout(timer);
    if(current == itemLen - 1) current = 0;
    var next = current + 1 > itemLen - 1 ? 0 : current + 1;
    slide(next);

    timer = setTimeout( autoSlide , interval );
  },
  slide = function(next){
    var nextPosition = checkPosition(next);

    $sliderMain
    .append($cloneFirst)
    .prepend($cloneLast);
    $sliderMain
    .stop()
    .animate({
      "marginLeft": nextPosition + "px"
    },speed);
    current = next;

  },

  checkPosition = function(next){
    var newitemlength = itemLen + 2;
    var currentPosition = parseInt($sliderMain.css("marginLeft"), 10);
    var nextPosition = -(imgWidth * next + mlslide * (next));
    var edgePosition = -(newitemlength * imgWidth + imgWidth);
    if( current > next ){
      $sliderMain
      .stop()
      .css({
        "marginLeft": -(imgWidth + mlslide)
      },speed);
      $sliderMain.find("li:last").remove();
      $sliderMain.find("li:last").remove();
      $cloneFirst = $sliderMain.find("li:first").clone();
      $cloneLast = $sliderMain.find("li:last").clone();

      return 0;
    } else if( current < next ){
      $sliderMain
      .stop()
      .css({
        "marginLeft": 0
      },speed);
      $sliderMain.find("li:first").remove();
      $sliderMain.find("li:first").remove();
      $cloneFirst = $sliderMain.find("li:first").clone();
      $cloneLast = $sliderMain.find("li:last").clone();

      return -(imgWidth + mlslide);
    }
    return nextPosition;
  };

  $(function(){
    var $cloneFirst, $cloneLast;
    $win = $(win);
    $sliderContent = $(".slide");
    $sliderMain = $sliderContent.find("ul");
    imgWidth = $sliderMain.find("li").width();


    itemLen = $sliderMain.find("li").length;

    $cloneFirst = $sliderMain.find("li:first").clone();
    $cloneLast = $sliderMain.find("li:last").clone();

    $sliderMain
    .append($cloneFirst)
    .prepend($cloneLast);

    resize();

    $win.off().on("resize", resize);

    $(".slide .next_slide, .slide .prev_slide")
    .off()
    .on("click", function(event) {
      event.preventDefault();
      if( $sliderMain.is(":animated") ){
        return;
      }
      var next;
      clearTimeout(timer);
      if( $(this).hasClass("next_slide") ){
        if(current == itemLen - 1) current = 0;
        next = (current + 1) > itemLen - 1 ? 0 : current + 1;
      } else {
        if(current == 0) current = itemLen - 1;
        next = (current - 1) < 0 ? itemLen - 1 : current - 1;
      }
      slide(next);
      timer = setTimeout( autoSlide , interval );
    });

    timer = setTimeout( autoSlide, interval );
  });

}(jQuery, window));