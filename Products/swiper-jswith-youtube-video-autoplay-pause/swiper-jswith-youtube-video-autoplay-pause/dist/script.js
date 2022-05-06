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