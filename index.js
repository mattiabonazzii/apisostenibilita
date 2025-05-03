const express = require('express');
const crypto = require('crypto');
const app = express();
require('dotenv').config();
const moment = require('moment');
const port = 4000;

//quantità sprecate al secondo
const sprecoCiboPerSecondo = 41.2; // tonnellate
const sprecoAcquaPerSecondo = 7_930_000; // litri
const emissioniCO2PerSecondo = 1319; // tonnellate

const avvio = Date.now();
const key = process.env.KEY;

//risorse sprecate dall'avvio del server
app.get('/sprechi-inizio', (req, res) => {
  const adesso = Date.now();
  const secondiPassati = Math.floor((adesso - avvio) / 1000);
  if(!isHashCorrect(req.headers['chiave'])){
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

app.get('/sprechi-oggi', (req, res) => {
  const secondiPassati = (moment() - moment().startOf('day')) / 1000;
  if(!isHashCorrect(req.headers['chiave'])){
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

app.get('/trasporto', (req, res) => {
  const secondiPassati = (moment() - moment().startOf('day')) / 1000;
  if(!isHashCorrect(req.headers['chiave'])){
    res.status(401).json({errore: "chiave non valida"});
    return;
  }
  
  let km = req.query.km;
  const numeri = {
    "piedi": 0,
    "autobus": 65,
    "auto": 141,
    "aereo": 255
  };

  res.status(200).json({
    piedi: `${km * numeri.piedi} kg CO2`,
    autobus: `${(km * numeri.autobus).toFixed(2)} kg CO2`,
    auto: `${(km * numeri.auto).toLocaleString()} kg CO2`,
    aereo: `${(km * numeri.aereo).toFixed(2)} kg CO2`
  });
});

function isHashCorrect(chiave){
  let hash = crypto.createHash('sha256').update(chiave).digest('hex');
  return hash === key;
}

app.listen(port, () => {
  console.log(`API attiva su http://localhost:${port}`);
});