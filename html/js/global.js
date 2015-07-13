/*
 *  Typekit loader
 *
 */

(function(d) {
  var config = {
    kitId: 'dbu2qpr',
    scriptTimeout: 3000
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

var weatherAPI = {
  key: '1995a1ef818450cf6e5cc92d91f40a3d',
  url: 'http://api.openweathermap.org/data/2.5/weather?id=',
  cityId: '5720755'
};

/*
 *  Weather Stuff
 *
 */

function getDate(timestamp) {

    //Set timezone to Eugene OR
    var eugeneTime = timestamp + (3600000*-7);

    var date = new Date(eugeneTime);

    var year    = date.getUTCFullYear();
    var month   = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day     = date.getUTCDate();
    var hours   = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    month   = (month < 10) ? '0' + month : month;
    day     = (day < 10) ? '0' + day : day;
    hours   = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds: seconds;

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

function kelvinToFahrenheit(temp) {
  return 32 + ((temp - 273.15) * 1.8);
}

function overcastLevel(weather) {
    var percentOvercast = weather.clouds.all;
    var now = new Date().getTime();

    var sunrise = weather.sys.sunrise * 1000;
    var sunset = weather.sys.sunset * 1000;
    var daytime;
    var cloudsWord = "";

    if (now > sunrise && now < sunset) {
      daytime = true;
    } else {
      daytime = false;
    }

    if (daytime && percentOvercast) {
      if (percentOvercast == 0) {
        cloudsWord = "clear";
      } else if (percentOvercast < 25) {
        cloudsWord = "mostly sunny";
      } else if (percentOvercast >= 25 && percentOvercast < 50) {
        cloudsWord = "partly cloudy";
      } else if (percentOvercast > 50 && percentOvercast <= 75) {
        cloudsWord = "partly sunny";
      } else {
        cloudsWord = "overcast";
      }
    }

    if (!daytime && percentOvercast) {
      if (percentOvercast == 0) {
        cloudsWord = "clear";
      } else if (percentOvercast < 25) {
        cloudsWord = "mostly clear";
      } else if (percentOvercast >= 25 && percentOvercast < 50) {
        cloudsWord = "partly cloudy";
      } else if (percentOvercast > 50 && percentOvercast <= 75) {
        cloudsWord = "mostly cloudy";
      } else {
        cloudsWord = "overcast";
      }
    }

    console.log('now: ' + now);
    console.log('UTC parsed: ' + getDate(now));
    console.log('sunrise: ' + getDate(weather.sys.sunrise * 1000));
    console.log('sunset: ' + getDate(weather.sys.sunset * 1000));

    return cloudsWord;
}

function getWeather() {
  var weather;

  $.get( weatherAPI.url + weatherAPI.cityId + '&APPID=' + weatherAPI.key, function(data) {
    weather = data;
    console.dir(weather);
    var weatherString = 'It is currently ' + overcastLevel(weather) + ' and ' + Math.round(kelvinToFahrenheit(weather.main.temp)) + '\B0F.';
    console.log(weatherString);
  });

}

$(document).on('ready', function() {
  getWeather();
});

/*
 *  Scroll code
 *
 */

$(document).on('ready', function() {

  if ($('body').hasClass('home')) {

    //Generalized debounce function
    function debounce(fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }

    // scroll detection variables
    var lastScrollTop = 0,
        newScrollTop,
        scrollDirection;

    // current scroll target index
    var testScrollTargetIndex = 0;
    var lastScrollIndex = 0;

    // targets to which we shall scroll
    var scrollTargets = $('.js-front-page-waypoint');

    // build scrolling navigation menu
    var $scrollIndicator = $('<nav id="js-scroll-indicator"><ul></ul></nav>');

    // build up scroll navigation menu's dots for quick nav/user feedback
    for (var i = 0; i < scrollTargets.length; i++) {
      var linkClass = "";
      if (i == testScrollTargetIndex) {
        linkClass = "js-active";
      }
      $scrollIndicator.find('ul').append($('<li><a class="' + linkClass + '" href="#' + $(scrollTargets[i]).attr('id') + '">&nbsp;</a></li>'));
    }

    $('body').append($scrollIndicator);

    // set current nav link to '.active' based on index of current target element
    function setScrollNavActive() {
      $('#js-scroll-indicator a').removeClass('js-active');
      $('#js-scroll-indicator a').eq(testScrollTargetIndex).addClass('js-active');
    }

    // event listener for scroll nav menu
    $('#js-scroll-indicator a').on('click', function(e) {
      e.preventDefault();

      var href = e.target.getAttribute('href');

      $(href).velocity('scroll', {
        complete: function() {
          setScrollNavActive();
        }
      });
    })

    function detectDirection() {
      newScrollTop = window.scrollY;
      if (newScrollTop > lastScrollTop) {
        direction = 'down';
      } else {
        direction = 'up';
      }
      lastScrollTop = newScrollTop;

      var viewportTop = window.scrollY;
      var viewportBottom = window.scrollY + $(window).height();
      var bufferDistance = 40; //Add a little space before event kicks to prevent annoying surprises

      if (direction == 'down') {

        for (var index in testTargetRanges) {
          if (viewportBottom > testTargetRanges[index][0] + bufferDistance && viewportBottom < testTargetRanges[index][1] - bufferDistance) {
            testScrollTargetIndex = index;
          }
        }

      } else if (direction == 'up') {

        for (var index in testTargetRanges) {
          if (viewportTop < testTargetRanges[index][1] - bufferDistance && viewportTop > testTargetRanges[index][0] + bufferDistance) {
            testScrollTargetIndex = index;
          }
        }

      }
      setScrollNavActive();

      return direction;
    }

    var testTargetRanges = [];

    function getTargetParams() {
      var windowHeight = $(window).height();
      testTargetRanges = [];
      for(var i = 0; i < scrollTargets.length; i++) {
        var targetTop = $(scrollTargets[i]).offset().top;
        var targetBottom = $(scrollTargets[i]).offset().top + parseInt(windowHeight);
        testTargetRanges.push([targetTop, targetBottom]);
      }
    }
    getTargetParams();

    $(window).on('resize', debounce(function() {
      getTargetParams();
    }, 100));

    $(window).bind('scroll', function() {
      scrollDirection = detectDirection();
    })

    function setScroll() {
      $(window).on('scroll.navScroll', debounce(function(e) {

        if (lastScrollIndex == testScrollTargetIndex) {
          return;
        }

        var viewportTop = window.scrollY;
        var viewportBottom = window.scrollY + $(window).height();
        var target = $(scrollTargets[testScrollTargetIndex]);

        $(window).unbind('.navScroll');

        target.velocity('scroll', {
          complete: function() {
            lastScrollIndex = testScrollTargetIndex;
            setTimeout(function(){
              setScroll();
            },25);
          }
        });

      }, 50));
    }
    setScroll();

  }

});

/*
 * Build images grid on homepage
 *
 */

$(document).on('ready', function() {

  if ($('body').hasClass('home') && srcsetArray) {

    var imageID = 0;

    var lightboxImg = [];

    function getImages(offset) {
      for (var i = 0; i < offset; i++) {
        srcsetArray[i] = srcsetArray[i].reverse();

        var srcsetString = "";

        for (var stringItem in srcsetArray[i]) {
          srcsetString += srcsetArray[i][stringItem];
          if (stringItem < srcsetArray[i].length-1) {
            srcsetString += 'w, ';
          } else {
            srcsetString += 'w';
          }
        }

        var src = srcsetString.split(' ')[0];

        lightboxImg.push( $('<img class="photo-grid__photo" src="' + src + '" sizes="100vw" srcset="' + srcsetString + '" />') );

        var $imgdiv = $('<div id="photo-grid__item-' + [imageID] + '" class="photo-grid__item col-1-3"></div>');

        var $style = $('<style>#photo-grid__item-' + [imageID] + ' { background-image:url("' + srcsetString.split(' ')[2] + '"); }</style>');

        imageID++;

        $('#photos .photo-grid').append( $imgdiv );
        $('#photos .photo-grid').append( $style );
      }
    }
    getImages(6);

    function buildImagesNav() {
      console.log('srcsetArray.length: ' + srcsetArray.length);
      var imagePageCount = ( srcsetArray.length / 6);
      console.log('imagePageCount: ' + imagePageCount);

      var $imageNav = $('<nav id="js-image-nav"><ul id="js-image-nav__ul"></ul></nav>');

      $imageNav.appendTo($('#photos'));

      for (var i = 0; i < imagePageCount; i++) {
        var $imageNavItem = $('<li><a class="js-image-nav__link" href="#0" data-img-link-"' + (i+1) + '">' + (i+1) + '</a></li>');

        $('#js-image-nav__ul').append( $($imageNavItem) );
      }


    }
    buildImagesNav();


    var idString = "";

    function makeLightBox() {
      var $lightbox = $('<figure class="lightbox"></figure>').css({
        'position':'fixed',
        'top':'5%',
        'left':'5%',
        'width': parseInt($(window).width() * 0.9) + 'px',
        'height': parseInt($(window).height() * 0.9) + 'px',
        'z-index': 300,
        'opacity':0
      });
      return $lightbox;
    }

    $('body').on('click', '.lightbox', function() {
      $('.lightbox').remove();
    });

    for (var imgId in lightboxImg ) {
      idString = '#photo-grid__item-' + imgId;
      (function() {
          var index = imgId;
          $('body').on('click', idString, function() {
            var $newLightBox = makeLightBox();
            $( $newLightBox ).append(lightboxImg[index]);
            $( $newLightBox ).appendTo( $('body') ).velocity({
              opacity: 1
            });
          });
      })();
    }

  }// end images gallery thing

});//end onload callback
