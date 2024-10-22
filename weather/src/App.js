import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("linear-gradient(to bottom, #A7C6ED, #e0e0e0, #ecf0f1, #e0e0e0, #A7C6ED)"); // Gradiente padrão
  const token = "c90ff10535e180a67ac8481f4a5bb1e8";

  async function handleSearch() {
    if (input === "") {
      alert("Informe alguma cidade!");
      return;
    }
    try {
      const response = await api.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${token}&units=metric&lang=pt_br`
      );
      setCity(response.data);
      setInput("");

      // Definindo a cor do background com base nas condições do clima
      const weatherMain = response.data.weather[0].main;
      if (weatherMain === "Rain") {
        setBackgroundColor("linear-gradient(to bottom, #A7C6ED, #e0e0e0, #ecf0f1, #e0e0e0, #A7C6ED)"); // Para chuvas fortes
      } else if (weatherMain === "Clear") {
        setBackgroundColor("linear-gradient(to bottom, #FFEA00, #FFD700, #FF6347)"); // Para ensolarado
      } else if (weatherMain === "Clouds") {
        setBackgroundColor("linear-gradient(to bottom, #A7C6ED, #e0e0e0, #ecf0f1, #e0e0e0, #A7C6ED)"); // Para nublado
      } else if (weatherMain === "Few Clouds") {
        setBackgroundColor("linear-gradient(to bottom, #B0E0E6, #F0F8FF)"); // Para nuvens dispersas
      } else if (weatherMain === "Mist" || weatherMain === "Smoke" || weatherMain === "Haze") {
        setBackgroundColor("linear-gradient(to bottom, #A7C6ED, #e0e0e0, #ecf0f1, #e0e0e0, #A7C6ED)"); // Para neblina e fumaça
      } else if (weatherMain === "Night") {
        setBackgroundColor("linear-gradient(to bottom, #2C3E50, #34495E)"); // Para noite
      } else {
        setBackgroundColor("linear-gradient(to bottom, #A7C6ED, #e0e0e0, #ecf0f1, #e0e0e0, #A7C6ED)"); // Para outras condições
      }
    } catch (error) {
      alert("Ops! Erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container" style={{ background: backgroundColor, transition: "background 0.5s" }}>
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
