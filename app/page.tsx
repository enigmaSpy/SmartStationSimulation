"use client";

import { useEffect, useState } from "react";
interface WeatherData{
    temp: string;
    hum: string;
    date:string;
}
const Home=()=> {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [ledState,setLedState] = useState(false);
  useEffect(()=>{
    const fetchWeather = async()=>{
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeatherData(data);
    }
    fetchWeather();
    const interval = setInterval(fetchWeather,5000);
    return clearInterval(interval);
  },[]);

  const toggleLed = async()=>{
    const newState = !ledState;
    await fetch("/api/control",{
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({led:newState})
    });
    setLedState(newState);
  };
  return (
    <main>
      <h1>Dane Pogodowe</h1>
      <ul>
        {weatherData.map((data,index)=>(
          <li key={index}>
            <p>Temperatura: {data?.temp||"null"}</p>
            <p>Wilgotność: {data?.hum||"null"}</p>
          </li>
        ))}
      </ul>
      <button onClick={toggleLed}>{ledState?"Wyłącz Oświetlenie":"Włącz oświetlenie"}</button>
    </main>
  );
}

export default Home;
