const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const app = express();
const Query = require('pg').Query



// const client = new Client({
//     user: 'test1',
//     // host: '127.0.0.1',
//     host: '59.3.55.93',
//     database: 'test1db',
//     password: 'test1',
//     port: '5432',
//     max: 10, // max number of clients in the pool
//
//     idleTimeoutMillis: 30000, // how long a client
//
// });


// client.connect();
//
// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// });

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('success!')
    }
});




router.post('/post', (req, res) => {
    console.log('who get in here post /users');
    var inputData;

    req.on('data', (data) => {
        inputData = JSON.parse(data);
    });

    req.on('end', () => {
        console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
    });

    res.write("OK!");
    res.end();
});





module.exports = router;