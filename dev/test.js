//Command to run: node dev/test.js
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();


// Case: test for creating a new block
/*
bitcoin.createNewBlock(2389,'0IOEFSDFSF90', 'SFDSSD90945DFSDFSE');
bitcoin.createNewBlock(18,'0IOEFSSDFSDF0', 'SFDSSD90945SDFZE')
bitcoin.createNewBlock(89,'0IOEFSDFER', 'SFDSSD90945SFSDFXQSE')
console.log(bitcoin);
*/



// Case: test for creating a new transaction
/*
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


//Case: test for hash method
/*
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


//Case: test for proof of work
/*
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

//Case: test for validating the chain
/*
const bc1 = {
    "chain": [
      {
        "index": 1,
        "timestamp": 1741720008685,
        "transactions": [],
        "nonce": 100,
        "hash": "0",
        "previousBlockHash": "0"
      },
      {
        "index": 2,
        "timestamp": 1741720042764,
        "transactions": [],
        "nonce": 18140,
        "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
        "previousBlockHash": "0"
      },
      {
        "index": 3,
        "timestamp": 1741720049198,
        "transactions": [
          {
            "amount": 12.5,
            "sender": "00",
            "recipient": "fba9d9d0feab11ef9837d5c2fd94c40a",
            "transactionId": "10057d80feac11ef9837d5c2fd94c40a"
          }
        ],
        "nonce": 41596,
        "hash": "0000aecd910ac910e1a755b49ffa6fdf2749403342c25da29065fe46de8af688",
        "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
      },
      {
        "index": 4,
        "timestamp": 1741720099683,
        "transactions": [
          {
            "amount": 12.5,
            "sender": "00",
            "recipient": "fba9d9d0feab11ef9837d5c2fd94c40a",
            "transactionId": "13d10470feac11ef9837d5c2fd94c40a"
          },
          {
            "amount": 500,
            "sender": "SDFSDFSD01SDEFR859SDF",
            "recipient": "ERZDFSDFFZEFDFSFS",
            "transactionId": "1eb9fc70feac11ef9837d5c2fd94c40a"
          },
          {
            "amount": 500,
            "sender": "SDFSDFSD01SDEFR859SDF",
            "recipient": "ERZDFSDFFZEFDFSFS",
            "transactionId": "1f9d5790feac11ef9837d5c2fd94c40a"
          },
          {
            "amount": 400,
            "sender": "SDFSDFSD01SDEFR859SDF",
            "recipient": "ERZDFSDFFZEFDFSFS",
            "transactionId": "21e48870feac11ef9837d5c2fd94c40a"
          },
          {
            "amount": 100,
            "sender": "SDFSDFSD01SDEFR859SDF",
            "recipient": "ERZDFSDFFZEFDFSFS",
            "transactionId": "23ec1840feac11ef9837d5c2fd94c40a"
          }
        ],
        "nonce": 156373,
        "hash": "000036d511079f1f13b0b4a0b307b21ef0e0eae0d0aa816773c1e0da4ec59c76",
        "previousBlockHash": "0000aecd910ac910e1a755b49ffa6fdf2749403342c25da29065fe46de8af688"
      },
      {
        "index": 5,
        "timestamp": 1741720173309,
        "transactions": [
          {
            "amount": 12.5,
            "sender": "00",
            "recipient": "fba9d9d0feab11ef9837d5c2fd94c40a",
            "transactionId": "31e8b8e0feac11ef9837d5c2fd94c40a"
          },
          {
            "amount": 100,
            "sender": "SDFSDFSD01SDEFR859SDF",
            "recipient": "ERZDFSDFFZEFDFSFS",
            "transactionId": "5c90fad0feac11ef9837d5c2fd94c40a"
          }
        ],
        "nonce": 22296,
        "hash": "00006f54fe2ed38cc10d6d0dcb76d3ea840ee56ef9635e68cd0a54ef9dedb408",
        "previousBlockHash": "000036d511079f1f13b0b4a0b307b21ef0e0eae0d0aa816773c1e0da4ec59c76"
      }
    ],
    "pendingTransactions": [
      {
        "amount": 12.5,
        "sender": "00",
        "recipient": "fba9d9d0feab11ef9837d5c2fd94c40a",
        "transactionId": "5dca3e20feac11ef9837d5c2fd94c40a"
      }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
  };

 console.log('VALID: ' , bitcoin.chainIsValid(bc1.chain));
 */

//console.log(bitcoin);
