//command to start the server: node dev/networkNode.js   (this is for without nodemon)
//command to start with nodemon: npm run node_1
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Without body parser we get undefined errors.
const Blockchain = require('./blockchain');
const uuid = require('uuid'); // gives unique string, we'll use this for this node's address.
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid.v1().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// get http://localhost:3000/blockchain
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

// post http://localhost:3000/transaction
/*
Body example: 
{
    "amount": 20,
    "sender": "SDFSDFSD01SDEFR859SDF",
    "recipient": "ERZDFSDFFZEFDFSFS"
}
*/
app.post('/transaction', function (req, res) {
   const blockIndex =  bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: `Transaction will be added in block ${blockIndex}.`})
});

// get http://localhost:3000/mine
app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash =  bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note: "New block mined successfully",
        block: newBlock
    });
});

// post http://localhost:3000/register-and-broadcast-node
/*
Body example
{
    "newNodeUrl": "http://localhost:3002"
}
*/
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl);
    } 

    const regNodesPromises = []
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        };

        regNodesPromises.push(rp(requestOptions));
    })

    Promise.all(regNodesPromises).then(data =>{
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-node-bulk',
            method: 'POST',
            body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
            json: true
        }

        return rp(bulkRegisterOptions);
    })
    .then(data =>{
        res.json({ note: 'New node registered with network successfully.'})
    })
});

// post http://localhost:3000/register-node
/*
 Body example:
{
    "newNodeUrl": "http://localhost:3003"
}
*/
app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note:'New node registered successfully.' });

   
});

// post http://localhost:3000/register-node-bulk
/*
Body example:
{
    "allNetworkNodes": [
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004"
    ]
}
*/
app.post('/register-node-bulk', function(req, res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });

    res.json({ note: 'Bulk registration succesful.' });
});

app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});