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

    for (var i = 0; i < scrollTargets.length; i++) {
      var linkClass = "";
      if (i == testScrollTargetIndex) {
        linkClass = "js-active";
      }
      $scrollIndicator.find('ul').append($('<li><a class="' + linkClass + '" href="#' + $(scrollTargets[i]).attr('id') + '">&nbsp;</a></li>'));
    }

    $('body').append($scrollIndicator);

    function setScrollNavActive() {
      $('#js-scroll-indicator a').removeClass('js-active');
      $('#js-scroll-indicator a').eq(testScrollTargetIndex).addClass('js-active');
    }

    $('#js-scroll-indicator a').on('click', function(e) {
      e.preventDefault();

      var href = e.target.getAttribute('href');

      console.log( $(href) );

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

      if (direction == 'down') {

        for (var index in testTargetRanges) {
          if (viewportBottom > testTargetRanges[index][0] && viewportBottom < testTargetRanges[index][1]) {
            testScrollTargetIndex = index;
          }
        }

      } else if (direction == 'up') {

        for (var index in testTargetRanges) {
          if (viewportTop < testTargetRanges[index][1] && viewportTop > testTargetRanges[index][0]) {
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
