@echo off
SET BROWSER=chrome.exe
START %BROWSER% -new-tab "http://localhost:3001/blockchain"
start cmd /k npm run node_1
START %BROWSER% -new-tab "http://localhost:3002/blockchain"
start cmd /k npm run node_2
START %BROWSER% -new-tab "http://localhost:3003/blockchain"
start cmd /k npm run node_3
START %BROWSER% -new-tab "http://localhost:3004/blockchain"
start cmd /k npm run node_4
START %BROWSER% -new-tab "http://localhost:3005/blockchain"
start cmd /k npm run node_5