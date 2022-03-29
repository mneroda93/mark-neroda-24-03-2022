import {useEffect, useState} from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";

import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "./state";

export default function App() {
  const [interaction, setInteraction] = useState(false);
  const locationURL = useLocation();
  const history = useHistory();

  const {
    forecastsRA,
  } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      forecastsRA(position);
    }, (err) => {
      console.log(err);
      forecastsRA(false);
    });
  }, []);

  const routingJSX = (
    <Switch>
      <Route exact path="/">
        <>
          <SearchBar interaction={interaction}
                     setInteraction={() => {
                       setInteraction(!interaction)
                     }}
          />
          <WeatherDisplay interaction={interaction}
                          setInteraction={setInteraction}
          />
        </>
      </Route>
      <Route exact path="/favorites">
        <Favorites/>
      </Route>
    </Switch>
  );

  useEffect(() => {
    if(locationURL.pathname !== '/') {
      history.push('/');
    }
  },[]);

  return (
    <div className="App">
      <ToastContainer position="bottom-center" autoClose={2000}/>
      <Header homepageToggle={() => {
          if (locationURL.pathname === '/') {
            history.push('/favorites');
          } else {
            history.push('/');
          }
        }}
      />
      <div className="main-container">
        {routingJSX}
      </div>
    </div>
  );
}
