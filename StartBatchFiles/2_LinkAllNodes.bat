@echo off
curl -X POST "http://localhost:3001/register-and-broadcast-node" ^
     -H "Content-Type: application/json" ^
     -d "{\"newNodeUrl\":\"http://localhost:3002\"}"
curl -X POST "http://localhost:3001/register-and-broadcast-node" ^
     -H "Content-Type: application/json" ^
     -d "{\"newNodeUrl\":\"http://localhost:3003\"}"
curl -X POST "http://localhost:3001/register-and-broadcast-node" ^
     -H "Content-Type: application/json" ^
     -d "{\"newNodeUrl\":\"http://localhost:3004\"}"
curl -X POST "http://localhost:3001/register-and-broadcast-node" ^
     -H "Content-Type: application/json" ^
     -d "{\"newNodeUrl\":\"http://localhost:3005\"}"
