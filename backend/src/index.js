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
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: #0f172a;
        color: #e2e8f0;
        line-height: 1.6;
      }

      .container {
        max-width: 900px;
        margin: auto;
        padding: 40px 20px;
      }

      h1 {
        text-align: center;
        color: #38bdf8;
      }

      h2 {
        margin-top: 40px;
        color: #22d3ee;
      }

      h3 {
        margin-top: 20px;
        color: #a78bfa;
      }

      p {
        color: #cbd5f5;
      }

      .box {
        background: #1e293b;
        padding: 20px;
        border-radius: 10px;
        margin-top: 15px;
      }

      .footer {
        text-align: center;
        margin-top: 50px;
        font-size: 0.9rem;
        color: #64748b;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>Arquitetura IoT + Web</h1>
      <p style="text-align:center;">
        Integração entre dados em tempo real e aplicações corporativas
      </p>

      <h2>Stack MING (Dados em Tempo Real)</h2>

      <div class="box">
        <h3>MQTT</h3>
        <p>Protocolo leve para comunicação entre dispositivos IoT, responsável pela ingestão de dados.</p>

        <h3>Node-RED</h3>
        <p>Ferramenta de orquestração que processa, transforma e direciona os dados recebidos.</p>

        <h3>InfluxDB</h3>
        <p>Banco de dados otimizado para séries temporais, armazenando dados brutos em alta frequência.</p>

        <h3>Grafana</h3>
        <p>Plataforma de visualização para monitoramento em tempo real.</p>
      </div>

      <h2>Stack Web (Dados Consolidados)</h2>

      <div class="box">
        <h3>Backend (Node.js)</h3>
        <p>Responsável pela lógica de negócio e integração entre os sistemas.</p>

        <h3>Frontend</h3>
        <p>Interface para usuários finais, apresentando informações processadas.</p>

        <h3>MySQL</h3>
        <p>Banco relacional utilizado para armazenar dados consolidados e estruturados.</p>
      </div>

      <h2>Arquitetura Enterprise</h2>

      <div class="box">
        <p>
          A arquitetura separa os dados em dois níveis:
        </p>

        <h3>Dados Brutos (Raw Data)</h3>
        <p>
          Coletados diretamente dos dispositivos IoT e armazenados no InfluxDB.
          Possuem alta granularidade e são utilizados para monitoramento e análises em tempo real.
        </p>

        <h3>Dados Consolidados</h3>
        <p>
          Processados e agregados a partir dos dados brutos, sendo armazenados no MySQL.
          Utilizados para relatórios, dashboards de negócio e tomada de decisão.
        </p>

        <h3>Benefícios</h3>
        <p>
          Separação de responsabilidades, melhor performance, escalabilidade e aderência a padrões de arquitetura corporativa.
        </p>
      </div>

      <div class="footer">
        Arquitetura baseada em boas práticas de IoT + Sistemas Corporativos
      </div>
    </div>
  </body>
  </html>
  `);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});