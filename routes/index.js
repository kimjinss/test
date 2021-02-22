const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const app = express();
const Query = require('pg').Query



const client = new Client({
    user: 'test1',
    host: '127.0.0.1',
    // host: '59.3.55.93',
    database: 'test1db',
    password: 'test1',
    port: '5432',
    max: 10, // max number of clients in the pool

    idleTimeoutMillis: 30000, // how long a client

});




client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('success!')
    }
});




// router.get('/', function(req, res, next) {
//     const query = new Query("SELECT * FROM category")
//     client.query(query)
//
//     var rows = []; /** * row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시 */
//
//     query.on("row",row=>{
//         rows.push(row);
//     });
//     query.on('end', () => {
//         console.log(rows);
//         console.log('query done')
//         res.send(rows);
//         res.status(200).end();
//     });
//     query.on('error', err => {
//         console.error(err.stack)
//     });
// });

router.post('/post', (req, res) => {
    console.log('who get in here post /users');
    const query = new Query("SELECT * FROM user")
    client.query(query)
    var inputData;
    var rows = []; /** * row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시 */


    query.on("row",row=>{
        rows.push(row);
    });

    query.on('end', () => {
        console.log(rows[0].user);
        console.log('query done')
        // res.send(rows);
        // res.status(200).end();
    });
    query.on('error', err => {
        console.error(err.stack)
    });



    req.on('data', (data) => {
        inputData = JSON.parse(data);
    });

    req.on('end', () => {
        // console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
    });

    res.send(rows[0].user);
    res.status(200).end();
});




module.exports = router;