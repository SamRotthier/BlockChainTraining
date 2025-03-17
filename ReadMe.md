# Blockchain_Prototype_JS
In this project my goal is to learn more about blockchain technologie.
This by building my own blockchain with JavaScript.

Followed tutorial: https://udemy.com/course/build-a-blockchain-in-javascript

## Info

This Blockchain can:
- perform a **proof of work** to secure the blockchain
- create **new blocks** trough a **mining** process
- Create new, immutable, **transactions**
- **Validate the blockchain** and all block data
- Retrieve address/transaction/block data

Features:
- **API** to interact with blockchain
- Upgrade API to a **decentralized blockchain network**, to host our blockchain
- A **concensus algorithm** to make sure the data is legitimate and always synchronized
- A **Block Explorer**, to xplore the data in our blockchain trough a **user interface**


Used Technologies (Installed packages):
- Node.JS
- Express
- Nodemon
- body-parser
- uuid
- request-promise



## Learned 

**What is a blockchain?**
- An immutable, Distributed Ledger
    - Immutable means that it cannot be changed (transaction is set in stone)
    - A Ledger is a collection of financial accounts or transactions 
    - Distributed means that it is not controlled by a single entity
- This is a sort of ledger (database) of made transactions <- Short own description
- Multiple people (thousands) host nodes and each node has a copy of the entire network (this makes it distributed)
    

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


