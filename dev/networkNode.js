//command to start the server: node dev/api.js   (this is for without nodemon)
//command to start with nodemon: npm run node_1
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Without body parser we get undefined errors.
const Blockchain = require('./blockchain')
const uuid = require('uuid'); // gives unique string, we'll use this for this node's address.
const port = process.argv[2]

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
Example: 
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


app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
})