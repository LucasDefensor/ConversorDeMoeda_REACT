import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

const moedas = {
  "AUD": "Australian Dollar",
  "BGN": "Bulgarian Lev",
  "BRL": "Brazilian Real",
  "CAD": "Canadian Dollar",
  "CHF": "Swiss Franc",
  "CNY": "Chinese Renminbi Yuan",
  "CZK": "Czech Koruna",
  "DKK": "Danish Krone",
  "EUR": "Euro",
  "GBP": "British Pound",
  "HKD": "Hong Kong Dollar",
  "HUF": "Hungarian Forint",
  "IDR": "Indonesian Rupiah",
  "ILS": "Israeli New Sheqel",
  "INR": "Indian Rupee",
  "ISK": "Icelandic Króna",
  "JPY": "Japanese Yen",
  "KRW": "South Korean Won",
  "MXN": "Mexican Peso",
  "MYR": "Malaysian Ringgit",
  "NOK": "Norwegian Krone",
  "NZD": "New Zealand Dollar",
  "PHP": "Philippine Peso",
  "PLN": "Polish Złoty",
  "RON": "Romanian Leu",
  "SEK": "Swedish Krona",
  "SGD": "Singapore Dollar",
  "THB": "Thai Baht",
  "TRY": "Turkish Lira",
  "USD": "United States Dollar",
  "ZAR": "South African Rand"
};

function App() {
  const [quantia, setQuantia] = useState('');
  const [resultado, setResultado] = useState('');
  const [deMoeda, setDeMoeda] = useState("BRL");
  const [paraMoeda, setParaMoeda] = useState("USD");

  function formatar(valor, moeda) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: moeda
    }).format(valor);
  }

  function convert() {
    const valor = parseFloat(quantia);
    if (isNaN(valor) || valor <= 0) {
      alert("Digite uma quantia válida.");
      return;
    }

    if (deMoeda === paraMoeda) {
      setResultado(formatar(valor, paraMoeda));
      return;
    }

    fetch(`https://api.frankfurter.dev/v1/latest?base=${deMoeda}&symbols=${paraMoeda}`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertido = valor * data.rates[paraMoeda];
        setResultado(formatar(convertido, paraMoeda));
      });
  }

  return (
    <div>
      <Navbar />

      <div className='container'>
        <h2>Conversor de Moedas Web</h2>

        <div>
          <input
            type="text"
            placeholder="Quantia"
            value={quantia}
            onChange={(e) => setQuantia(e.target.value)}
          />

          <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
            {Object.entries(moedas).map(([codigo, nome]) => (
              <option key={codigo} value={codigo}>{nome}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Resultado"
            value={resultado}
            readOnly
          />

          <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
            {Object.entries(moedas).map(([codigo, nome]) => (
              <option key={codigo} value={codigo}>{nome}</option>
            ))}
          </select>
        </div>

        <button style={{ marginTop: "15px" }} onClick={convert}>
          Converter
        </button>
      </div>
    </div>
  );
}

export default App;
