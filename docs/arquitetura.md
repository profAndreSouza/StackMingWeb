# Arquitetura do Sistema

## Stack MING
- MQTT (broker)
- Node-RED (orquestração)
- InfluxDB (time series)
- Grafana (visualização)

## Stack WEB
- Backend Node.js
- Frontend React
- MySQL (dados estruturados)

## Fluxo

ESP32 → MQTT → Node-RED → InfluxDB → Grafana  
                      → Backend → Frontend