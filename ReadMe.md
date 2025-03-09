In this project my goal is to learn more about blockchain technologie.

Installed packages:
- Node.JS
- Express
- Nodemon
- body-parser
- uuid
- request-promise


Followed tutorial: https://udemy.com/course/build-a-blockchain-in-javascript

Wat is een blockchain?
- Dat is een soort ledger (database) van gemaakte transacties

Wat is mining?
- Dat is het crearen van een block (een nieuwe transactie in de blockchain)

wat is proof of work?
- Dit maakt de blockchain secure. (TODO uitbreiden)
 
 wat is een genesis block?
 - dit is de eerste block in de blockchain

Hoe zijn de blocken gesyncroniseerd?


Nodemon:
Nodemon will automatically restart the server for us after every change (save).
Onder package.json, scripts : "start": "nodemon --watch dev -e js dev/api.js"
=> Watch the dev folder for changes to js files and restart the api.js file


Personal commands:
cd ../../projects/blockchaintraining
npm run node_1
=> **See Bat file* to make this easier
To start we'll also have to link the nodes togheter, do this with register-and-broadcast-node(for every node):
Post http://localhost:3001/register-and-broadcast-node
{
    "newNodeUrl": "http://localhost:3002"
}
Post http://localhost:3001/register-and-broadcast-node
{
    "newNodeUrl": "http://localhost:3003"
}
Post http://localhost:3001/register-and-broadcast-node
{
    "newNodeUrl": "http://localhost:3004"
}
Post http://localhost:3001/register-and-broadcast-node
{
    "newNodeUrl": "http://localhost:3005"
}


