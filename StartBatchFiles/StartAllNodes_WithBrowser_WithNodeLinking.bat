@echo off
SET BROWSER=chrome.exe

start cmd /k npm run node_1
timeout /T 5 /NOBREAK >nul
start cmd /k npm run node_2
start cmd /k npm run node_3
start cmd /k npm run node_4
start cmd /k npm run node_5

timeout /T 5 /NOBREAK >nul
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

timeout /T 3 /NOBREAK >nul
START %BROWSER% -new-tab "http://localhost:3001/blockchain"
START %BROWSER% -new-tab "http://localhost:3002/blockchain"
START %BROWSER% -new-tab "http://localhost:3003/blockchain"
START %BROWSER% -new-tab "http://localhost:3004/blockchain"
START %BROWSER% -new-tab "http://localhost:3005/blockchain"