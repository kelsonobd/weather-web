import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState({});
  const token = "c90ff10535e180a67ac8481f4a5bb1e8";
  async function handleSearch() {
    if (input === "") {
      alert("Informe alguma cidade!");
      return;
    }
    try {
      const response = await api.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
          input
        )}&appid=${token}&units=metric&lang=pt_br`
      );
      setCity(response.data);
      console.log(response);
      setInput("");
    } catch {
      alert("Ops! Erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Previsão do Tempo</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      {Object.keys(city).length > 0 && (
        <main className="main">
          <h2>{city.name}</h2>
          <h3>{Math.round(city.main.temp)}°C</h3>
          <p className="mainTemp">{city.weather[0].description}</p>
          <div className="mainMaxMin">
            <span>Mín: {Math.round(city.main?.temp_min)} °C</span>
            <span>Máx: {Math.round(city.main?.temp_max)} °C</span>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
