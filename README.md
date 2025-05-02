🌍 API per il Monitoraggio degli Sprechi e delle Emissioni
Questa API fornisce stime in tempo reale delle risorse sprecate (cibo, acqua, CO₂) e delle emissioni legate ai trasporti. Tutti gli endpoint richiedono una chiave SHA-256 da inviare tramite l’header chiave.

🔐 Autenticazione
Ogni richiesta deve includere l’header:

chiave: LA_TUA_CHIAVE

La chiave verrà hashata con SHA-256 e confrontata con quella salvata nella variabile d’ambiente KEY.

GET /sprechi-inizio
Restituisce una stima delle risorse sprecate dal momento in cui il server è stato avviato.

Risposta:

tempo_passato: ad esempio "325 secondi"

cibo_sprecato: ad esempio "13399.00 tonnellate"

acqua_sprecata: ad esempio "2,577,250,000 litri"

co2_emessa: ad esempio "428675.00 tonnellate"

GET /sprechi-oggi
Restituisce le risorse sprecate dall’inizio della giornata (dalla mezzanotte corrente).

Risposta:

tempo_passato: ad esempio "54622.49 secondi"

cibo_sprecato: ad esempio "2249965.58 tonnellate"

acqua_sprecata: ad esempio "433,306,271,307 litri"

co2_emessa: ad esempio "72087227.31 tonnellate"

GET /trasporto?km=X
Restituisce le emissioni di CO₂ (in kg) per una distanza specificata in chilometri, a seconda del mezzo di trasporto.

Parametro query:

km (obbligatorio): distanza percorsa in chilometri

Risposta:

piedi: emissioni per il tragitto a piedi, ad esempio "0.00 kg CO2"

autobus: ad esempio "650.00 kg CO2"

auto: ad esempio "1410.00 kg CO2"

aereo: ad esempio "2550.00 kg CO2"

🔧 Variabili d’ambiente
Nel file .env inserire:

KEY=hash_della_tua_chiave
