const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Arquitetura IoT + Web</title>

      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #020617);
          color: #e2e8f0;
          padding: 40px;
        }

        h1 {
          text-align: center;
          margin-bottom: 10px;
          font-size: 2.8rem;
          color: #38bdf8;
        }

        .subtitle {
          text-align: center;
          margin-bottom: 40px;
          color: #94a3b8;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          padding: 25px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card h2 {
          margin-bottom: 15px;
        }

        .status {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .online {
          background: #22c55e;
          color: #022c22;
        }

        .stack-list {
          list-style: none;
        }

        .stack-list li {
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .ming {
          border-left: 4px solid #22d3ee;
        }

        .web {
          border-left: 4px solid #a78bfa;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          color: #64748b;
        }
      </style>
    </head>

    <body>
      <h1>Plataforma IoT + Web</h1>
      <div class="subtitle">Arquitetura integrada com CI/CD</div>

      <div class="grid">

        <!-- STACK MING -->
        <div class="card ming">
          <h2>Stack MING</h2>
          <div class="status online">ONLINE</div>

          <ul class="stack-list">
            <li>MQTT (ingestão de dados)</li>
            <li>Node-RED (orquestração)</li>
            <li>InfluxDB (dados temporais)</li>
            <li>Grafana (visualização)</li>
          </ul>
        </div>

        <!-- STACK WEB -->
        <div class="card web">
          <h2>Stack WEB</h2>
          <div class="status online">ONLINE</div>

          <ul class="stack-list">
            <li>Backend Node.js (API)</li>
            <li>Frontend (dashboard web)</li>
            <li>MySQL (dados consolidados)</li>
          </ul>
        </div>

      </div>

      <div class="footer">
        Integração entre dados IoT e aplicações Web • Deploy via CI/CD
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});