//search
var searchbar = document.querySelector('.navbar .form-control');
var navBar = document.querySelector('.navbar');
var searchnav = document.querySelector('svg');
var onoff = false;
var li = document.querySelector('.div_itemlist li');
console.log(searchbar);
searchnav.addEventListener('click', function () {
    if (onoff == false) {
        searchbar.setAttribute('style', 'display: block');
        navBar.setAttribute('style', 'width: 100%');
        onoff = true;
    }
    else if (onoff == true) {
        searchbar.setAttribute('style', 'display: none');
        navBar.setAttribute('style', 'width: initial');
        onoff = false;
    }
});
// star rating
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});
//影片切換
let lastSlideIndex = 0;
var mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  // 動態加載使用
  observer:true,//修改swiper自己或子元素时，自动初始化swiper
  observeParents:true,//修改swiper的父元素时，自动初始化swiper
  on: {
    init: function() {
      const self = this;
      const activeIndex = self.activeIndex;
      
      setTimeout(function(){
        playPauseVideo(self, self.activeIndex, "play");
      }, 1000);
      
      lastSlideIndex = activeIndex;
    },
    slideNextTransitionEnd: function() {
      const self = this;
      const activeIndex = self.activeIndex;
      
      playPauseVideo(self, lastSlideIndex, "pause");
      playPauseVideo(self, activeIndex, "play");
      
      lastSlideIndex = activeIndex;
    },
    slidePrevTransitionEnd: function() {
      const self = this;
      const activeIndex = self.activeIndex;

      playPauseVideo(self, lastSlideIndex, "pause");
      playPauseVideo(self, activeIndex, "play");
      
      lastSlideIndex = activeIndex;
    }
  }
});

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}
// When the slide is changing
function playPauseVideo(swiper, activeIndex, control){
  var currentSlide, player;
  currentSlide = swiper.slides[activeIndex];
  player = currentSlide.querySelector('iframe');
  switch (control) {
    case "play":
      postMessageToPlayer(player, {
        "event": "command",
        "func": "mute"
      });
      postMessageToPlayer(player, {
        "event": "command",
        "func": "playVideo"
      });
      break;
    case "pause":
      postMessageToPlayer(player, {
        "event": "command",
        "func": "pauseVideo"
      });
      break;
  }
}
//規格
$('#MACOS').on('click', function(){
    this.setAttribute('style', 'border-bottom: 3px solid rgba(255, 255, 255, 1);');
    $('#Windows').attr('style', 'border-bottom: none;');
    $('.rec').attr('style', 'display: none;');   
    $('#minos').text('10.12.6');
    $('#mincpu').text('Intel Core i7 @ 4.2 GHZ (4 core)');
    $('#minram').text('8GB');
    $('#minhdd').text('500 MB available space');
});

$('#Windows').on('click', function(){
  this.setAttribute('style', 'border-bottom: 3px solid rgba(255, 255, 255, 1);');
  $('#MACOS').attr('style', 'border-bottom: none;');
  $('.rec').attr('style', 'display: block;');
  $('.rec').attr('style', 'height: 80px;');    
  $('#minos').text('Windows Vista, Windows 7, Windows 10');
  $('#mincpu').text('Intel i3');
  $('#minram').text('4 GB RAM');
  $('#minhdd').text('500 MB available space');
});


let btns = document.querySelectorAll('#btnheart');
btns.forEach(btn => {
    btn.addEventListener('click', setEvent);
});
function setEvent(btn) {
    let span = this.getElementsByClassName('fa-heart')[0];
    let className = span.getAttribute('class');

    if (className.includes('far')) {
        span.setAttribute('class', 'fas fa-heart');
    } else {
        span.setAttribute('class', 'far fa-heart');
    }
}