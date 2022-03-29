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
      <Route exact path="/mark-neroda-24-03-2022/">
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
      <Route exact path="/mark-neroda-24-03-2022/favorites">
        <Favorites/>
      </Route>
    </Switch>
  );

  return (
    <div className="App">
      <ToastContainer position="bottom-center" autoClose={2000}/>
      <Header/>
      <div className="main-container">
        {routingJSX}
      </div>
    </div>
  );
}
