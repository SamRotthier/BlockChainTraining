//command to start the server: node dev/api.js   (this is for without nodemon)
//command to start with nodemon: npm start
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Without body parser we get undefined errors.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function (req, res) {

})

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

    console.log(req.body);
    res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);
})

app.get('/mine', function (req, res) {

})


app.listen(3000, function(){
    console.log('Listening on port 3000...');
})