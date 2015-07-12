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
