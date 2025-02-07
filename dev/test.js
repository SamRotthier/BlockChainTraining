//Command to run: node dev/test.js
const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

/*
// test for creating a new block
bitcoin.createNewBlock(2389,'0IOEFSDFSF90', 'SFDSSD90945DFSDFSE');
bitcoin.createNewBlock(18,'0IOEFSSDFSDF0', 'SFDSSD90945SDFZE')
bitcoin.createNewBlock(89,'0IOEFSDFER', 'SFDSSD90945SFSDFXQSE')
console.log(bitcoin);
*/

/*
// test for creating a new transaction
bitcoin.createNewBlock(2389,'0IOEFSDFSF90', 'SFDSSD90945DFSDFSE');
bitcoin.createNewTransaction(100,'SAMEZRZDSRZEFR090', 'YORBENQSDSD090');
bitcoin.createNewBlock(12123,'0551DDFSD', 'SDFSDF085151'); //Mining a new block (placing pending transactions into the new block)
//console.log(bitcoin.chain[1]); //Checking the transaction

bitcoin.createNewTransaction(50,'SAMEZRZDSRZEFR090', 'YORBENQSDSD090');
bitcoin.createNewTransaction(300,'SAMEZRZDSRZEFR090', 'YORBENQSDSD090');
bitcoin.createNewTransaction(2000,'SAMEZRZDSRZEFR090', 'YORBENQSDSD090');
bitcoin.createNewBlock(94415,'SDFSDFSD15', 'SDFSDFSDF515202');
console.log(bitcoin.chain[2]);
*/

/*
//test for hash method
const previousBlockHash = 'DSFZSRFZEFD50'
const currentBlockData = [
    {
        amount: 10,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBENQSDSD090'
    },
    {
        amount: 30,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBESDQSAZSDD090'
    },
    {
        amount: 200,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBENQSDZQEQZEQFDSD090'
    }
];
const nonce = 100;
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
*/

/*
//test for proof of work
const previousBlockHash = 'DSFZSRFZEFD50'
const currentBlockData = [
    {
        amount: 10,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBENQSDSD090'
    },
    {
        amount: 30,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBESDQSAZSDD090'
    },
    {
        amount: 200,
        sender: 'SAMEZRZDSRZEFR090',
        recipient: 'YORBENQSDZQEQZEQFDSD090'
    }
];
console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData)) // found 68920
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 68920));
*/


console.log(bitcoin);
