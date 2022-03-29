import '../styles/Header.css';
import {ReactComponent as HomepageSVG} from "../assets/svg/home.svg";
import {ReactComponent as BookmarkSVG} from "../assets/svg/bookmark.svg";
import {ReactComponent as LightSVG} from "../assets/svg/light.svg";
import {ReactComponent as DarkSVG} from "../assets/svg/dark.svg";
import {ReactComponent as WeatherSVG} from "../assets/svg/weather.svg";
import {ReactComponent as Fahrenheit} from "../assets/svg/fahrenheit.svg";
import {ReactComponent as Centigrade} from "../assets/svg/centigrade.svg";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../state";
import {useHistory, useLocation} from "react-router-dom";

export default function Header() {

  const theme = useSelector((state) => state.theme);
  const units = useSelector((state) => state.units);
  const dispatch = useDispatch();
  const {
    themeToggle,
    unitsToggle,
  } = bindActionCreators(actionCreators, dispatch);

  const location = useLocation();
  const history = useHistory();

  const navigationJSX = (
    location.pathname === '/mark-neroda-24-03-2022/' ? (

      <HomepageSVG className="icon nav"
                   onClick={() => {
                     history.push('/mark-neroda-24-03-2022/favorites');
                   }}
      />
    ) : (
      <BookmarkSVG className="icon nav"
                   onClick={() => {
                     console.log('working')
                     history.push('/mark-neroda-24-03-2022/');
                   }}
      />
    )
  );

  const themeJSX = (
    theme ? (
      <LightSVG className="icon nav"
                onClick={() => {
                  themeToggle();
                }}
      />
    ) : (
      <DarkSVG className="icon nav"
               onClick={() => {
                 themeToggle();
               }}
      />
    )
  );

  const unitsJSX = (
    units ? (
      <Centigrade className="icon nav"
                  onClick={() => {
                    unitsToggle();
                  }}
      />
    ) : (
      <Fahrenheit className="icon nav"
                  onClick={() => {
                    unitsToggle();
                  }}
      />
    )
  );

  return (
    <>
      <div className="header"
           style={theme ? {color: 'white', backgroundColor: 'black'} : undefined}
      >
        <div className="title">
          <span style={theme ? {color: 'white'} : undefined}>Weather Forecasts Inc.</span>
          <WeatherSVG className="icon logo"/>
        </div>
        <div className="navigation">
          {navigationJSX}
          {themeJSX}
          {unitsJSX}
        </div>
      </div>
    </>
  );
}


