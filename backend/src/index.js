const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend rodando com CI/CD");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});