const sha256 = require('sha256') //npm i sha256 --save
const currentNodeUrl = process.argv[3];
const uuid = require('uuid');

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock(100,'0', '0'); //this is the genesis block
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp : Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length -1];
}

Blockchain.prototype.createNewTransaction= function(amount, sender, recipient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid.v1().split('-').join('')
    };

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransations = function(transactionObj){
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] +1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while(hash.substring(0,4) !== '0000'){
        nonce ++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        //console.log(hash)
    }

    //console.log(hash)
    return nonce;

}



module.exports = Blockchain;