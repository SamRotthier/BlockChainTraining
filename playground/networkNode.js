//command to start the server: node dev/networkNode.js   (this is for without nodemon)
//command to start with nodemon: npm run node_1

//For Blockchain
//const express = require('express');
//const bodyParser = require('body-parser'); //Without body parser we get undefined errors.
//const Blockchain = require('./blockchain');
//const uuid = require('uuid'); // gives unique string, we'll use this for this node's address.
//const rp = require('request-promise');
//const nodeAddress = uuid.v1().split('-').join('');

//For BlockchainAsClass
import { BlockchainAsClass } from './blockchainAsClass.js';
import express from 'express';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import { v1 as uuidv1 } from 'uuid';
const nodeAddress = uuidv1().split('-').join('');

const app = express();
const port = process.argv[2];


const bitcoin = new BlockchainAsClass();
//const bitcoin = new Blockchain(); // <= Change too

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
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransations(newTransaction);
    res.json({ note: `Transaction will be added in block ${blockIndex}.` })
});

// post http://localhost:3000/transaction/broadcast
// this is the one we use for making new transactions
/*
Body example: 
{
    "amount": 20,
    "sender": "SDFSDFSD01SDEFR859SDF",
    "recipient": "ERZDFSDFFZEFDFSFS"
}
*/
app.post('/transaction/broadcast', function(req,res){
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransations(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(data => {
        res.json({ note: 'Transaction created and broadcast successfully.' })
    })
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

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    const requestPromises = []
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: { newBlock: newBlock},
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(data =>{
        const requestOptions = {
            uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender: "00",
                recipient : nodeAddress
            },
            json: true
        };
        
        return rp(requestOptions);
    }).then(data =>{
        res.json({
            note: "New block mined & broadcast successfully",
            block: newBlock
        });
    });
});

app.post('/receive-new-block', function(req,res){
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

    if(correctHash && correctIndex){
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({
            note: 'New block received and accepted.',
            newBlock : newBlock
        });
    } else {
        res.json({
            note: 'New block rejected.',
            newBlock: newBlock
        });
    }
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

app.get('/consensus', function(req, res){
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
            json: true
        };
         
        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(blockchains => {
        const currentChainLength = bitcoin.chain.length;
        let maxChainLength = currentChainLength;
        let newLongestChain = null;
        let newPendingTransactions = null;
        blockchains.forEach(blockchain =>{
            if(blockchain.chain.length > maxChainLength){
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
            };
       }); 

        if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))){
            res.json({
                note: 'Current chain has not been replaced.',
                chain: bitcoin.chain
            });
        } 
        else { //if (newLongestChain && bitcoin.chainIsValid(newLongestChain)) 
            bitcoin.chain = newLongestChain;
            bitcoin.pendingTransactions = newPendingTransactions;
            res.json({
                note: 'This chain has been replaced.',
                chain: bitcoin.chain
            });
        }
    });
});

//example: http://localhost:3001/block/00008498cd98b6adef1240a2091a75be835b0eda94a82402ba6ded90d6286ab4
app.get('/block/:blockHash', function(req, res){
    const blockhash = req.params.blockHash;
    const correctBlock = bitcoin.getBlock(blockhash);
    res.json({
        block : correctBlock
    });
});

//exq;ple: http://localhost:3001/transaction/4ee69ce000f111f0a3afe71f4e581ac4
app.get('/transaction/:transactionId', function(req, res){
    const transactionId = req.params.transactionId;
    const transactionData = bitcoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block
    });
});

//example: http://localhost:3001/address/SDFSDFSD01SDEFR859SDF
app.get('/address/:address', function(req, res){
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address);
    res.json({
        addressData: addressData
    });
});

app.get('/block-explorer', function(req, res){
    res.sendFile('./block-explorer/index.html', { root: __dirname});
});



app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});