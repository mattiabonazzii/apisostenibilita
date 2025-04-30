const express = require('express');
const app = express();
const port = 3000;

//quantità sprecate al secondo
const sprecoCiboPerSecondo = 41.2; // tonnellate
const sprecoAcquaPerSecondo = 7_930_000; // litri
const emissioniCO2PerSecondo = 1319; // tonnellate

const avvio = Date.now();

app.get('/sprechi', (req, res) => {
  const adesso = Date.now();
  const secondiPassati = Math.floor((adesso - avvio) / 1000);

  res.json({
    tempo_passato: `${secondiPassati} secondi`,
    cibo_sprecato: `${(sprecoCiboPerSecondo * secondiPassati).toFixed(2)} tonnellate`,
    acqua_sprecata: `${(sprecoAcquaPerSecondo * secondiPassati).toLocaleString()} litri`,
    co2_emessa: `${(emissioniCO2PerSecondo * secondiPassati).toFixed(2)} tonnellate`
  });
});

app.listen(port, () => {
  console.log(`API attiva su http://localhost:${port}`);
});
