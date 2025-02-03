const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389,'0IOEFSDFSF90', 'SFDSSD90945DFSDFSE');
bitcoin.createNewBlock(18,'0IOEFSSDFSDF0', 'SFDSSD90945SDFZE')
bitcoin.createNewBlock(89,'0IOEFSDFER', 'SFDSSD90945SFSDFXQSE')

console.log(bitcoin);