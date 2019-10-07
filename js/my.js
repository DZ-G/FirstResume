// 背景图动画
function bgImg(state) {
  if (!state) {
    clearInterval(timer)
    timer=undefined
    clearTimeout(time)
    time = undefined
    return
  }
  var $img_num = $('#JoynBackground').children('img').length;
  var $img_show = 1;

  timer = setInterval(function () {
    if (!state) {
      clearInterval(timer)
      timer=undefined
    }
    $("#JoynBackground  img[name='" + $img_show + "']").css({
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%"
        }).animate({
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%"
        }, 5000);
    time = setTimeout(function () {
      $("#JoynBackground img[name='" + $img_show + "']").fadeOut(1000);
      $img_show++;
      $img_show = $img_show > $img_num ? '1' : $img_show;
      $("#JoynBackground img[name='" + $img_show + "']").css({
        width: "120%",
        height: "120%",
        top: "-10%",
        left: "-10%"
      }).fadeIn(1000).animate({
        width: "100%",
        height: "100%",
        top: "0%",
        left: "0%"
      }, 5000);
      clearTimeout(time)
      time = undefined
    }, 5000);
  }, 11000);

}

// 首页随指针偏移动画
$(function () {
  var box = $(".slider .items-group .item .block");

  $(" .slider .items-group .item").mouseenter(function (e) {
    box.css("transition", " box-shadow 0.5s")
    // box[0].style.boxShadow = "darkgrey 0px 0px 30px 5px ";
    box.css("boxShadow", "darkgrey 0px 0px 30px 5px ")
    box.mouseenter(function (e) {
      var offset = positionBox(e, box[0]);
      box.css("transform", "scale(1.03) translate(" + offset.x + "px ," + offset.y + "px) rotateX(" + offset.y + "deg) rotateY(" + offset.x + "deg)");
      // box[0].style.transform = "scale(1.03) translate(" + offset.x + "px ," + offset.y + "px) rotateX(" + offset.y + "deg) rotateY(" + offset.x + "deg)";
      var bcx = (offset.x) * 20
      var bcy = (offset.y) * 20
      $(' .slider .items-group .item .block .circleLight')[0].style.background = "radial-gradient(circle at " + bcx + "px " + bcy + "px, rgb(255, 255, 255), transparent)"

    });

    box.mousemove(function (e) {
      var offset = positionBox(e, box[0]);
      box[0].style.transform = "scale(1.03) translate(" + offset.x + "px ," + offset.y + "px) rotateX(" + offset.y + "deg) rotateY(" + offset.x + "deg)";
      var bcx = (offset.x) * 20
      var bcy = (offset.y) * 20
      $(' .slider .items-group .item .block .circleLight')[0].style.background = "radial-gradient(circle at " + bcx + "px " + bcy + "px, rgb(255, 255, 255), transparent)"

    })

    box.mouseleave(function (e) {
      $('.slider .items-group .item .block .circleLight')[0].style.background = "radial-gradient(circle at 0px 0px, rgb(255, 255, 255), transparent)"
      // box[0].style.transfrom = " ";
      box.css("transition", "transform 0.2s")
      box.css("transform", "scale(1.03) translate(0px, 0px) rotateX(0deg) rotateY(0deg)")

    });
  })


  $(" .slider .items-group .item").mouseleave(function () {
    box.css("transition", " box-shadow 0.5s")
    box.css("boxShadow", "none")
  })
})

// 获取指针位置
function positionBox(event, box) {
  var x, y;
  var e = event || window.event;
  //拿到容器宽高
  var boxWidth = box.clientWidth;
  //console.log("boxWidth:"+boxWidth)
  var boxHeight = box.clientHeight;
  //console.log("boxHeight:"+boxHeight)
  //拿到鼠标距离盒子的x y坐标
  x = e.clientX - box.offsetLeft;
  //console.log( e.clientX)
  y = e.clientY - box.offsetTop;
  // console.log( "X :"+ x +"y:"+y )

  //计算偏移量
  x = (x - (boxWidth / 2)) / 30
  y = (y - (boxHeight / 2)) / 30

  return {
    x: x,
    y: y
  }
}

// 展示区轮播图动画
(function ($, window, document, undefined) {
  var Carousel = function (elem, options) {
    this.defaults = {
      curDisplay: 0,
      autoPlay: false,
      interval: 3000
    };
    this.opts = $.extend({}, this.defaults, options);
    var self = this;
    this.$carousel = elem;
    this.$aImg = this.$carousel.find('img');
    this.imgLen = this.$aImg.length;
    this.curDisplay = this.opts.curDisplay;
    this.autoPlay = this.opts.autoPlay;
    this.viewWidth = $(window).width() / 2;
    this.b_switch = true;
    this.iNow = this.opts.curDisplay;
    this.timer = null;
    this.interval = this.opts.interval;
  };
  Carousel.prototype = {
    play: function () {
      if (this.autoPlay) {
        if (this.iNow === this.imgLen - 1) {
          this.iNow = 0;
        } else {
          this.iNow++;
        }
        this.movingNext(this.iNow);
      }
    },
    movingPrev: function (index) {
      this.curDisplay = index;
      this.initalCarousel();
    },
    movingNext: function (index) {
      this.curDisplay = index;
      this.initalCarousel();
    },
    initalCarousel: function () {
      var self = this;
      var half_imgLen = Math.floor(this.imgLen / 2);
      var leftNum, rightNum;
      for (var i = 0; i < half_imgLen; i++) {
        leftNum = this.curDisplay - i - 1;
        this.$aImg.eq(leftNum).css({
          transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        });
        rightNum = this.curDisplay + i + 1;
        if (rightNum > this.imgLen - 1)
          rightNum -= this.imgLen;
        this.$aImg.eq(rightNum).css({
          transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
        this.$aImg.removeClass('on');
      }
      this.$aImg.eq(this.curDisplay).css({
        transform: 'translateZ(300px)'
      }).addClass('on');
      this.$carousel.on('webkitTransitionEnd', function () {
        self.b_switch = true;
      });
    },
    inital: function () {
      var self = this;
      this.initalCarousel();
      this.$aImg.on('click', function (ev) {
        if (self.b_switch && !$(this).hasClass('on')) {
          self.iNow = $(this).index();
          self.b_switch = false;
          var direction = self.viewWidth < ev.clientX ? 'next' : 'prev';
          var index = $(this).index();
          if (direction === 'next') {
            self.movingNext(index);
          } else {
            self.movingPrev(index);
          }
        }
      }).hover(function () {
          clearInterval(self.timer);
        },
        function () {
          self.timer = setInterval(
            function () {
              self.play();
            }, self.interval);
        });
      this.timer = setInterval(function () {
        self.play();
      }, this.interval);
      this.$carousel.on('selectstart', function () {
        return false;
      });
    },
    constructor: Carousel
  };

  $.fn.carousel = function (options) {
    var carousel = new Carousel(this, options);
    return carousel.inital();
  };
})(jQuery, window, document, undefined);


//动画进度和数字进度
function myAnimate(num, className) {
  removeMyAnimate(className)
  let progress_num = 0
  if (typeof (num) === "number" && 0 < num <= 100) {
    if (num > 50) {
      $("." + className + " .circle-right").transition({
        rotate: "45deg"
      }, 500, 'linear', function () {
        $("." + className + " .circle-left").transition({
          rotate: -135 + (num - 50) * 3.6 + "deg"
        }, 200, 'linear')
      })
      var t = setInterval(function () {
        progress_num++
        $("." + className + " .progress-num").html(progress_num + "%");
        if (progress_num == num) {
          clearInterval(t);
          return
        }
      }, 15);
    } else {
      $("." + className + " .circle-right").transition({
        rotate: -135 + num * 3.6 + "deg"
      }, 500, 'linear')
      var t = setInterval(function () {
        progress_num++
        $("." + className + " .progress-num").html(progress_num + "%");
        if (progress_num == num) {
          clearInterval(t);
          return
        }
      }, 15);
    }
  } else {
    return
  }
}
//初始化样式
function removeMyAnimate(ClassName) {
  $("." + ClassName + " .circle-right").removeAttr("style");
  $("." + ClassName + " .circle-left").removeAttr("style");
}


$('.first-chirld i').click(function () {
  $('#hamburger').toggleClass("is-active");
  $(".navigation").toggleClass("active")
  $(".nav-zhe").toggleClass("active")
  let rot = parseInt($('#hamburger').data('rot')) - 180
  $('.nav').transition({
    rotate: rot + "deg"
  })
  $('#hamburger').data('rot', rot)
  swiper.slideTo(1, 1000, true);
})
$('.second-chirld i').click(function () {
  $('#hamburger').toggleClass("is-active");
  $(".navigation").toggleClass("active")
  $(".nav-zhe").toggleClass("active")
  let rot = parseInt($('#hamburger').data('rot')) - 180
  $('.nav').transition({
    rotate: rot + "deg"
  })
  $('#hamburger').data('rot', rot)
  swiper.slideTo(2, 1000, true);
})
$('.third-chirld i').click(function () {
  $('#hamburger').toggleClass("is-active");
  $(".navigation").toggleClass("active")
  $(".nav-zhe").toggleClass("active")
  let rot = parseInt($('#hamburger').data('rot')) - 180
  $('.nav').transition({
    rotate: rot + "deg"
  })
  $('#hamburger').data('rot', rot)
  swiper.slideTo(3, 1000, true);
})
$('.forth-chirld i').click(function () {
  $('#hamburger').toggleClass("is-active");
  $(".navigation").toggleClass("active")
  $(".nav-zhe").toggleClass("active")
  let rot = parseInt($('#hamburger').data('rot')) - 180
  $('.nav').transition({
    rotate: rot + "deg"
  })
  $('#hamburger').data('rot', rot)
  swiper.slideTo(4, 1000, true);
})