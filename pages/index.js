import Head from "next/head";
import { useState } from "react";

function Weather() {
  const [city, setCity] = useState();
  const [wData, setWData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    const res = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          "X-RapidAPI-Key":
            "20ae1ffb34msha3d26d229344cb7p175cb3jsnd43821e99d02",
        },
      }
    );

    const data = await res.json();

    console.log(data);
      setWData(data);
    
  };

  return (
    <div>
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="grid min-h-screen antialiased text-white bg-cover place-items-center "
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        {/* box content */}
        <div className="box-content lg:w-2/6 lg:grid-cols-2 bg-black rounded-md lg:grid h-72 ">
          <div
            className="p-4 space-y-4 bg-cover rounded-md"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/3825179/pexels-photo-3825179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`,
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="text-xs">
              {wData ? wData.current.last_updated : null}
            </div>
            <div className="text-xs font-bold">{wData ? wData.location.tz_id : null}</div>
            <div className="text-xl">
              {wData ? wData.location.name : null}
            </div>
            <div className="text-2xl font-semibold tracking-tighter">
              {wData ? wData.current.temp_c : null}&#176; c
            </div>
          </div>

          <div className="px-6 space-y-2 bg-black rounded-lg pt-7">
            <div className="flex justify-between text-xs">
              <div>CLOUD</div>
              <div>{wData ? wData.current.cloud : null} Oktas</div>
            </div>

            <div className="flex justify-between text-xs">
              <div>HUMIDITY</div>
              <div>{wData ? wData.current.humidity : null} (g/m3)</div>
            </div>

            <div className="flex justify-between text-xs">
              <div>WIND</div>
              <div>{wData ? wData.current.wind_mph : null} mph</div>
            </div>

            <form onSubmit={handleSubmit} className="pt-10 space-y-6 pb-12 ">
              <div className="grid place-items-center ">
                <input
                  onChange={(e) => setCity(e.target.value)}
                  required
                  type="text"
                  className="w-full h-12 pl-4 text-black rounded-lg focus:ring-none focus:outline-none"
                  placeholder="Search city here "
                />

                {/* {JSON.stringify(wData)} */}
              </div>

              <button type="submit" className="btn btn-primary">
                Get weather
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
