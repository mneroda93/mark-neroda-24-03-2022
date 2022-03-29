import '../styles/WeatherDisplay.css';
import {getImage} from '../service/WeatherIconsService';
import {animation} from "../service/AnimationsService";
import '../styles/Animation.css';
import {useSelector, useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../state/index";
import {useEffect} from "react";
import {ReactComponent as Tilde} from "../assets/svg/approximation.svg";

export default function WeatherDisplay({setInteraction}) {

  const dispatch = useDispatch();

  const {
    addFavorite,
    removeFavorite
  } = bindActionCreators(actionCreators, dispatch);

  const theme = useSelector((state) => state.theme);
  const units = useSelector((state) => state.units);
  const favorites = useSelector((state) => state.favorites);
  const AIO = useSelector((state) => state.AIO);

  const floor = (num) => Math.floor(num);

  useEffect(() => {
    if (AIO.key) {
      setInteraction(true);
    }
  });

  const today = (
    <div className="section-1">
      {
        AIO && AIO.weatherIcon ? (
          <div className="section-1-info">
            <img className="weather-icon"
                 alt="weather icon"
                 src={getImage(AIO.weatherIcon)}
            />
            <div className="tag">
              <span className="location">{AIO.city + ','}</span>
              <span className="location">{AIO.country}</span>
              <span className="degrees">
                {units ? AIO.temperatureToday : floor(AIO.temperatureToday * 1.8 + 32)}&#176;
              </span>
            </div>
            <div>
              {
                favorites?.filter((favorite) => favorite.key === AIO.key).length > 0 ? (
                  <div className="remove-favorite fav-button">
                    <button className="button-12" role="button"
                            onClick={() => {
                              removeFavorite(AIO.key)
                            }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="add-favorite fav-button">
                    <button className="button-12" role="button"
                            onClick={() => {
                              addFavorite(AIO);
                            }}
                    >
                      Add to Favorites
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        ) : (animation)
      }
    </div>
  );

  const color = theme ? 'white' : 'black';
  const backgroundCurtain = theme ? {backgroundColor: 'rgba(255,255,255,0.2)'} : {backgroundColor: 'rgba(0,0,0,0.2)'};

  const unitsConversion = (celsius, value) => {
    return Math.floor(celsius ? value : value * 1.8 + 32)
  }

  const fiveDays = (
    <div className="section-2">
      {
        AIO && AIO.forecasts ? (
          AIO.forecasts.map((forecast, i) => {
            return (
              <div key={i}
                   className="card"
                   style={backgroundCurtain}
              >
                <span className="day" style={{}}>{forecast.day.substring(0, 3)}</span>
                <span><img alt="weather-icon" src={getImage(forecast.weatherIcon)}/></span>
                <div style={{textAlign:'center'}}>
                  <span style={{color}}>{unitsConversion(units, forecast.minMetric)}</span>
                  <span style={{color}}>&#176;</span>
                  <Tilde style={{width: '15px', height: '10px'}}
                         stroke={color}
                  />
                  <span style={{color}}>{unitsConversion(units, forecast.maxMetric)}</span>
                  <span style={{color}}>&#176;</span>
                </div>
              </div>
            );
          })
        ) : (animation)
      }
    </div>
  );

  return (
    <div className="weather-display"
         style={theme ? {color: 'white', backgroundColor: 'black'} : undefined}
    >
      {today}
      {fiveDays}
    </div>
  );
}
