import React, { useEffect, useState } from "react";

const DelhiWeather = () => {
  const [weather, setWeather] = useState(null);
  const apiKey = "300f49c562bd4ace9ba90240251203";

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=New Delhi,India&aqi=no`)
      .then((r) => r.json())
      .then((data) => setWeather(data));
  }, []);

  if (!weather?.current) return (
    <div className="glass rounded-3xl p-6 w-64 text-center text-[#1c1c1e]/50 text-sm">
      Loading weather...
    </div>
  );

  const stats = [
    { label: "Wind", value: `${weather.current.wind_kph} km/h` },
    { label: "Humidity", value: `${weather.current.humidity}%` },
    { label: "UV Index", value: weather.current.uv },
    { label: "Feels Like", value: `${weather.current.feelslike_c}°` },
  ];

  return (
    <div
      className="glass rounded-3xl overflow-hidden w-full max-w-70 sm:max-w-[320px] shadow-xl">
      <div className="p-5 sm:p-6 text-center">
        <p className="text-xs font-semibold text-[#066363] tracking-widest uppercase mb-1">
          Live Weather
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1c1c1e]"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          {weather.location.name}
        </h2>
        <p className="text-xs text-[#8e8e93] mt-0.5">{weather.location.country}</p>

        <div className="flex justify-center items-center mt-4 gap-3">
          <img src={weather.current.condition.icon} alt="icon" className="w-14 h-14" />
          <div className="text-left">
            <p className="text-4xl sm:text-5xl font-800 text-[#1c1c1e] leading-none"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>
              {weather.current.temp_c}°
            </p>
            <p className="text-sm text-[#8e8e93] mt-1">{weather.current.condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-5">
          {stats.map((s) => (
            <div key={s.label}
              className="bg-[#f2f2f7] rounded-2xl px-3 py-3 text-left">
              <p className="text-xs text-[#8e8e93] mb-1">{s.label}</p>
              <p className="text-base font-bold text-[#1c1c1e]">{s.value}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-[#8e8e93] mt-4">
          Updated: {weather.current.last_updated}
        </p>
      </div>
    </div>
  );
};

export default DelhiWeather;
