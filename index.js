const express = require('express');
const crypto = require('crypto');
const app = express();
require('dotenv').config();
const port = 4000;

//quantità sprecate al secondo
const sprecoCiboPerSecondo = 41.2; // tonnellate
const sprecoAcquaPerSecondo = 7_930_000; // litri
const emissioniCO2PerSecondo = 1319; // tonnellate

const avvio = Date.now();
const key = process.env.KEY;

app.get('/sprechi/:chiave', (req, res) => {
  const adesso = Date.now();
  const secondiPassati = Math.floor((adesso - avvio) / 1000);
  const chiave = req.params.chiave;

  let hash = crypto.createHash('sha256').update(chiave).digest('hex');

  if(hash != key){
    res.status(401).json({errore: "chiave non valida"});
    return;
  }

  res.status(200).json({
    tempo_passato: `${secondiPassati} secondi`,
    cibo_sprecato: `${(sprecoCiboPerSecondo * secondiPassati).toFixed(2)} tonnellate`,
    acqua_sprecata: `${(sprecoAcquaPerSecondo * secondiPassati).toLocaleString()} litri`,
    co2_emessa: `${(emissioniCO2PerSecondo * secondiPassati).toFixed(2)} tonnellate`
  });
});

app.listen(port, () => {
  console.log(`API attiva su http://localhost:${port}`);
});


let hash = crypto.createHash('sha256', 'qwerty');
hash = hash.digest('hex');