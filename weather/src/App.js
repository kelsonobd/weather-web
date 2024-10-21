import { FiSearch } from "react-icons/fi";
import './App.css'

function App() {
  return (
    <div className="container">
      <h1 className="title">Previsão do Tempo</h1>

      <div className="containerInput">
        <input type="text" placeholter="Digite seu cep.." />

        <button className="buttonSearch">
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      <main className="main">
        <h2>Brasília</h2>
        <h3>25</h3>
        <span>Nublado</span>
        <div className="mainMaxMin">
          <span>Máx:26</span>
          <span>Mín:16</span>
        </div>
      </main>
    </div>
  );
}

export default App;
