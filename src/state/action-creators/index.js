const API_KEY = '3mvwBNeQmvqlrLUPDb4tuOsH9TVJGq3U';
const BASE_URL = 'http://dataservice.accuweather.com/';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

const getGeoLocation = async (coords) => {
  return await fetch(`${BASE_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${coords.coords.latitude}%2C${coords.coords.longitude}`)
    .then((resp) => resp.json())
    .then((data) => {
      return {
        key: data.Key,
        city: data.LocalizedName,
        country: data.Country.LocalizedName
      };
    });
}

const getCurrentConditions = async (cityObj) => {
  return await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityObj.key}?apikey=${API_KEY}`)
    .then((resp) => resp.json())
    .then((data) => {
      cityObj.temperatureToday = Math.floor(data[0].Temperature.Metric.Value);
      cityObj.weatherIcon = data[0].WeatherIcon;
      return cityObj;
    })
    .catch((err) => {
      console.log('There has been an error: ' + err);
    });
}

const getFiveDayForecast = async (cityObj) => {
  return await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityObj.key}?apikey=${API_KEY}&metric=true`)
    .then((resp) => resp.json())
    .then(async (forecasts) => {
      const arr = [];
      for (const obj of forecasts.DailyForecasts) {
        arr.push({
          day: days[(new Date(obj.EpochDate * 1000)).getDay()],
          weatherIcon: obj.Day.Icon,
          description: obj.Day.IconPhrase,
          minMetric: Math.floor(obj.Temperature.Minimum.Value),
          maxMetric: Math.floor(obj.Temperature.Maximum.Value),
        })
      }
      cityObj.forecasts = arr;
      return cityObj;
    })
    .catch((err) => {
      console.log('There has been an error: ' + err);
    });
}

export const forecastsRA = (position) => async (dispatch) => {
  if (position) {
    if (position.coords) { // is it geolocation?
      getGeoLocation(position)
        .then(async (cityObj) => {
          getCurrentConditions(cityObj)
            .then(async (cityObj) => {
              getFiveDayForecast(cityObj)
                .then(async (cityObj) => {
                  await dispatch({
                    type: 'FORECASTS',
                    payload: cityObj
                  })
                })
            })
        })
    } else { // no, it is a user selection from suggestions
      getCurrentConditions(position)
        .then(async (cityObj) => {
          getFiveDayForecast(cityObj)
            .then(async (cityObj) => {
              await dispatch({
                type: 'FORECASTS',
                payload: cityObj
              })
            })
        })
    }
  } else { // no geolocation.. get Tel Aviv as default using static info(105)
    const cityObj = {
      key: 215854,
      city: 'Tel Aviv',
      country: 'Israel'
    };
    getCurrentConditions(cityObj)
      .then(async (cityObj) => {
        getFiveDayForecast(cityObj)
          .then(async (cityObj) => {
            await dispatch({
              type: 'FORECASTS',
              payload: cityObj
            })
          })
      })
  }
}

export const themeToggle = () => {
  return {type: 'dark'}
}

export const unitsToggle = () => {
  return {type: 'celsius'}
}

export const addFavorite = (cityObj) => {
  return {
    type: 'addFavorite',
    payload: cityObj
  }
}

export const removeFavorite = (key) => {
  return {
    type: 'removeFavorite',
    payload: key
  }
}

export const getSuggestions = (input) => async (dispatch) => {
  fetch(`${BASE_URL}locations/v1/cities/autocomplete?apikey=%09${API_KEY}&q=${input}`)
    .then((resp) => resp.json())
    .then(async (data) => {
      const cities = [];
      for (const city of data) {
        cities.push(
          {
            key: city.Key,
            city: city.LocalizedName,
            country: city.Country.LocalizedName
          }
        );
      }
      await dispatch({
        type: 'SUGGESTIONS',
        payload: cities
      })
    })
    .catch((err) => {
      console.log('There has been an error: ' + err);
    })
}
