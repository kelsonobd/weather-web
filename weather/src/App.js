import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleSearch = () =>{
    alert("valor do input " + input)
  }

  return (
    <div className="container">
      <h1 className="title">Previsão do Tempo</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholter="Digite a cidade"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      <main className="main">
        <h2>Brasília</h2>
        <h3 className="mainCelsius">25</h3>
        <p className="mainTemp">Nublado</p>
        <div className="mainMaxMin">
          <span>Máx:26</span>
          <span>Mín:16</span>
        </div>
      </main>
    </div>
  );
}

export default App;
