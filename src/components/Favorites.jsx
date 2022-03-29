import '../styles/Favorites.css';
import '../styles/Animation.css';
import {getImage} from "../service/WeatherIconsService";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../state";
import {useDispatch} from "react-redux";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const theme = useSelector((state) => state.theme);
  const units = useSelector((state) => state.units);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    forecastsRA,
  } = bindActionCreators(actionCreators, dispatch);

  const floor = (num) => Math.floor(num);
  const AIO = useSelector((state) => state.AIO);

  const tile = theme ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)";
  const fontColor = theme ? "white" : "black";

  return (
    <div className="favorites">
      {
        favorites?.map((city, i) => {
          return (
            <div key={i} className="card favorite-card" style={{backgroundColor: tile, color: fontColor}}
                 onClick={() => {
                   if (AIO.key !== city.key) {
                     forecastsRA(city);
                   }
                   history.push('/mark-neroda-24-03-2022/');
                 }}
            >
              <span>{city.city}</span>
              <img alt="weather-icon"
                   src={getImage(city.weatherIcon)}
              />
              <span>{units ? city.temperatureToday : floor(city.temperatureToday * 1.8 + 32)}&#176;</span>
              <span>{city.forecasts[0].description}</span>
            </div>
          );
        })
      }
    </div>
  );
}
