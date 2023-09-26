import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("C");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  const styling = { display: "flex", justifyContent: "center", rowGap: "20px", alignItems: "center", flexDirection: "column" };
  const btnStyling = { background: "#5c5656", color: "white" }

  const searchLocation = async (event) => {

    if (event.key === "Enter" || event.type === 'click') {
      try {
        const response = await axios.get(url);
        setData(response.data);

      } catch (error) {
        toast.error("Enter valid Location!", { theme: "dark" });
      }
      setLocation("");
    }
  };



  return (
    <>
      <div className="app" style={Object.keys(data).length === 0 ? styling : null}>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
          <div className="search-icon" onClick={(e) => searchLocation(e)}><AiOutlineSearch /> </div>
        </div>
        {Object.keys(data).length === 0 ? <div className="empty-container"> Enter the location to get weather! </div>
          :
          <div className="container">
            <div className="btn-container">
              <button style={unit === "F" ? btnStyling : null} onClick={() => setUnit("C")}>Celcius</button>
              <button id="btn2" style={unit === "C" ? btnStyling : null} onClick={() => setUnit("F")}>Farhenheit</button>
            </div>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1>
                    {unit === "F"
                      ? data.main.temp.toFixed() + "°F"
                      : ((data.main.temp - 32) * 5 / 9).toFixed() + "°C"}
                  </h1>
                ) : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">

                  {data.main ? (
                    <p className="bold">
                      {unit === "F"
                        ? data.main.feels_like.toFixed() + "°F"
                        : ((data.main.feels_like - 32) * 5 / 9).toFixed() + "°C"}

                    </p>
                  ) : null}
                  <p className="fieldName">Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p className="fieldName">Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p className="fieldName">Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        }
      </div>
      <ToastContainer position="bottom-center" />
         <p style={{position:"fixed",color:"gray", bottom:"10px",left:"10px"}}>&copy; 2023 Nitish Kumar Jha. All rights reserved.</p>
    </>
  );
}

export default App;
