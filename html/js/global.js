/*
 * Initiate FastClick 
 *
 * (Speeds reponse to touch events)
 *
 */

$(function() {
    FastClick.attach(document.body);
});

/*
 *  Typekit loader
 *
 */

(function(d) {
  var config = {
    kitId: 'dbu2qpr',
    scriptTimeout: 3000
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config);}catch(e){}};s.parentNode.insertBefore(tk,s);
})(document);

var weatherAPI = {
  key: '1995a1ef818450cf6e5cc92d91f40a3d',
  url: 'http://api.openweathermap.org/data/2.5/weather?id=',
  cityId: '5720755'
};


/*
 *  Nav Menu Toggle
 *
 */

$(document).on('ready', function() {
  var menuIsOpen = false;

  var $menuButton = $('#js-menu-toggle');

  function openMenu() {
    menuIsOpen = true;
    $('.nav-drawer').velocity({translateX: '-100%'},{
      easing: 'easeInQuart'
    });
  }

  function closeMenu() {
    menuIsOpen = false;
    $('.nav-drawer').velocity({translateX: '0%'},{
      easing: 'easeInQuart'
    });
  }

  function toggleMenu(){
    if (menuIsOpen === false){
      openMenu();
    } else {
      closeMenu();
    }
  }

  $(document).delegate( '#js-menu-toggle', 'click', function(){
    toggleMenu();
  });

  // $(document).delegate( '.nav-drawer input, .nav-drawer button, .nav-drawer a', 'focusin', function(e){
  //   $(e.target).select();
  //   openMenu();
  // });

  $(document).on('closeMenuEvent', function(){
    closeMenu();
  });
});
  

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

function buildWeatherData(weather) {
  var percentOvercast = weather.clouds.all;
  var now = new Date().getTime();

  var sunrise = weather.sys.sunrise * 1000;
  var sunset = weather.sys.sunset * 1000;
  var daytime;
  var cloudsWord = "";
  var weatherIcon = "";

  console.log(percentOvercast);

  var weatherIconOptions = {
    day: {
      overcast: 'weather--icon-overcast',
      partlySunny: 'weather--icon-partly-sunny',
      sunny: 'weather--icon-sunny',
      rainy: 'weather--icon-rain',
      snow: 'weather--icon-snow'
    },
    night: {
      overcast: 'weather--icon-cloud',
      clear:  'weather--icon-full-mooon',
      rainy: 'weather--icon-rain',
      snow: 'weather--icon-snow'
    }
  };

  if (now > sunrise && now < sunset) {
    daytime = true;
  } else {
    daytime = false;
  }

  if (daytime && percentOvercast !== undefined) {
    if (percentOvercast === 0) {
      var cloudsWord = "clear";
      var weatherIcon = weatherIconOptions.day.sunny;
    } else if (percentOvercast < 25) {
      cloudsWord = "mostly sunny";
      weatherIcon = weatherIconOptions.day.partlySunny;
    } else if (percentOvercast >= 25 && percentOvercast < 50) {
      cloudsWord = "partly cloudy";
      weatherIcon = weatherIconOptions.day.partlySunny;
    } else if (percentOvercast > 50 && percentOvercast <= 75) {
      cloudsWord = "partly sunny";
      weatherIcon = weatherIconOptions.day.overcast;
    } else {
      cloudsWord = "overcast";
      weatherIcon = weatherIconOptions.day.overcast;
    }
  }

  if (!daytime && percentOvercast !== undefined) {
    if (percentOvercast === 0) {
      cloudsWord = "clear";
      weatherIcon = weatherIconOptions.night.clear;
    } else if (percentOvercast < 25) {
      cloudsWord = "mostly clear";
      weatherIcon = weatherIconOptions.night.clear;
    } else if (percentOvercast >= 25 && percentOvercast < 50) {
      cloudsWord = "partly cloudy";
      weatherIcon = weatherIconOptions.night.overcast;
    } else if (percentOvercast > 50 && percentOvercast <= 75) {
      cloudsWord = "mostly cloudy";
      weatherIcon = weatherIconOptions.night.overcast;
    } else {
      cloudsWord = "overcast";
      weatherIcon = weatherIconOptions.night.overcast;
    }
  }

  function setWeatherDetails() {
    var weatherDetails = {
      clouds: cloudsWord,
      daytime:  daytime,
      string: 'It is currently ' + cloudsWord + ' and ' + Math.round(kelvinToFahrenheit(weather.main.temp)) + '&#176;F',
      icon: createWeatherIcon(weatherIcon)
    };
    return weatherDetails;
  }

  return setWeatherDetails();
}

function getWeather() {
  var weather;

  var ajaxParams = {
    url: weatherAPI.url + weatherAPI.cityId + '&APPID=' + weatherAPI.key,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      weather = data;
      var weatherOutput = buildWeatherData(weather);

      var $weatherWidget = $('<div id="js-weather-widget">Farm weather: ' + weatherOutput.icon + weatherOutput.string + '</div>');

      $('.home .site-header').append($weatherWidget);
    }
  };

  $.ajax(ajaxParams);
}

function createWeatherIcon(weatherIcon) {
  var template = '<svg class="icon"><use xlink:href="#' + weatherIcon + '"></use></svg>';
  return template;
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
    });

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

        for (var i in testTargetRanges) {
          if (viewportBottom > testTargetRanges[i][0] + bufferDistance && viewportBottom < testTargetRanges[i][1] - bufferDistance) {
            testScrollTargetIndex = i;
          }
        }

      } else if (direction == 'up') {

        for (var j in testTargetRanges) {
          if (viewportTop < testTargetRanges[j][1] - bufferDistance && viewportTop > testTargetRanges[j][0] + bufferDistance) {
            testScrollTargetIndex = j;
          }
        }

      }
      setScrollNavActive();

      return direction;
    }

    // Set up our scroll target height ranges to check the scroll position against their locations
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
    });

    function setScroll() {
      $(window).on('scroll.navScroll', debounce(function(e) {

        if (lastScrollIndex == testScrollTargetIndex || window.innerWidth < 600) {
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

    offsetCounter = 0;

    // Load images into our photo grid
    function getImages(offset) {
      $('#photos .photo-grid').html('');

      for (var i = (0 + (offset * 6)); i < ((offset * 6 ) + 6); i++) {
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
      registerLightboxImages();
    }
    getImages(offsetCounter);

    function buildImagesNav() {
      var imagePageCount = ( srcsetArray.length / 6);

      var $imageNav = $('<nav id="js-image-nav"><ul id="js-image-nav__ul"></ul></nav>');

      $imageNav.appendTo($('#photos'));

      for (var i = 0; i < imagePageCount; i++) {
        var $imageNavItem = $('<li><a class="js-image-nav__link" href="#0" data-img-link="' + (i+1) + '">' + (i+1) + '</a></li>');

        $('#js-image-nav__ul').append( $($imageNavItem) );
      }

      $('.js-image-nav__link').eq(0).addClass('active');
    }
    buildImagesNav();

    $('body').on('click', '.js-image-nav__link', function(e) {
      e.preventDefault();

      $('.js-image-nav__link').removeClass('active');

      $(this).addClass('active');

      getImages( e.target.getAttribute('data-img-link') - 1 );
    });

    var idString = "";

    function makeLightBox() {
      var $lightbox = $('<figure class="lightbox"></figure>').css({
        'position':'fixed',
        'top':'5%',
        'left':'5%',
        'width': parseInt($(window).width() * 0.9) + 'px',
        'height': parseInt($(window).height() * 0.9) + 'px',
        'z-index': 30000,
        'opacity':0
      });
      return $lightbox;
    }

    $('body').on('click', '.lightbox', function() {
      $('.lightbox').remove();
    });

    function registerLightboxImages() {
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
    }

  }// end images gallery thing

});//end onload callback

/*
 * Ajax email form
 *
 */

$(document).on('ready', function() {

  var $contactForm = $('#js-contact-form');

  $contactForm.on('submit', function(e) {
    e.preventDefault();

    contactFormApp.sendFormObject(contactFormApp.createFormObject());
  });

});

var contactFormApp = contactFormApp || {};

// Create form
contactFormApp.createFormObject = function() {

	var retJson = {};

	retJson.user_name = $('#user_name').val();
	retJson.user_email = $('#user_email').val();
  retJson.nonce = $('#js-contact-form #nonce').val();
	retJson.user_message = $('#user_message').val();

  console.log(retJson);

	return retJson;

};

contactFormApp.sendFormObject = function(emailData) {

  var contactAjaxConfig = {
    url: '/mail.php',
    type: 'POST',
    data: emailData,
    success: function(data) {
      data = JSON.parse(data);
      console.log(data);
      $('#js-contact-form .contactForm__success h2').text(data.type + '!');
      $('#js-contact-form .contactForm__success-message').text(data.message);
      $('.contactForm__loading').slideUp();
      $('.contactForm__success').show();
      $('#js-contact-form label, #js-contact-form input, #js-contact-form button').slideUp();
    },
    error: function(err) {
      err = JSON.parse(err);
      console.log('error');
      console.log(err);
      $('#js-contact-form .contactForm__error h2').text(err.type + '!');
      $('#js-contact-form .contactForm__error-message').text(err.message);
      $('.contactForm__loading').slideUp();
      $('.contactForm__error').show();
    }
  };

  $.ajax(contactAjaxConfig);

};
