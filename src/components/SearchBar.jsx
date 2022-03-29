import '../App.css';
import '../styles/SearchBar.css';
import {useEffect, useRef, useState} from "react";
import '../styles/Animation.css';
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../state";

export default function SearchBar({interaction}) {
  const [input, setInput] = useState('');
  const dispatch = useRef(undefined);

  const suggestions = useSelector((state) => state.suggestions);

  const {
    getSuggestions,
    forecastsRA
  } = bindActionCreators(actionCreators, useDispatch());

  const english = /^[a-zA-Z\s]*$/;
  const handleInput = (e) => {
    clearTimeout(dispatch.current); // Cancels timeout trigger on line(26) with a delay of 300, reduces unwanted API calls
    const currentInput = e.target.value;
    if(currentInput.length !== 0) {
      if (english.test(e.target.value) && e.target.value.charAt(0) !== ' ') {
        dispatch.current = setTimeout(() => {
          getSuggestions(currentInput);
        }, 300);
        setInput(currentInput);
      }
    } else {
      setInput('');
    }
  }

  useEffect(() => {
    return () => clearTimeout(dispatch.current);
  }, []);

  return (
    <>
      <div className="search-bar-container">
        <input className="search-bar"
               placeholder={'Enter a city name...'}
               value={input}
               onChange={(e) => {
                 handleInput(e);
               }}
               disabled={interaction ? "" : "disabled"}
        />
        <div className="picker">
          {
            suggestions.length > 0 && suggestions.map((cityObj, i) => {
              return (
                <p key={i}
                   onClick={() => {
                     forecastsRA(cityObj);
                     setInput('');
                   }}
                >
                  {`${cityObj.city}, ${cityObj.country}`}
                </p>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
