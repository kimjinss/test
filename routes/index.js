const express = require('express');
const { Client } = require('pg');
const router = express.Router();
const app = express();
const Query = require('pg').Query

const client = new Client({
    user: 'test1',
    host: '127.0.0.1', // 자신의 서버로 접속시 활성화
    // host: '59.3.55.93', // 외부에서 접속시 활성화
    database: 'test1db',
    password: 'test1',
    port: '5432',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client
}); // postgresql db 접속 설정

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('success!')
    }
}); // postgresql db 접속 여부 확인



router.post('/post', (req, res) => {

    var inputData;


    req.on('data', (data) => {
        inputData = JSON.parse(data);
    }); // 안드로이드에서 받은 json파일 파싱


    // req.on('end', () => {
    //     console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
    // });
    // const query = new Query("SELECT * FROM user;")
    const query = new Query("SELECT m_category_name from category;");
    client.query(query) // 쿼리문 실행

    const rows = []; /** * row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시 */

    query.on("row",row=>{
        rows.push(row);
    }); // 쿼리문을 실행하여 받은 정보를 row라는 이름으로 rows에 입력

    query.on('end', () => {
        console.log(rows[1].m_category_name);
        // console.log(rows[0].user);
        // console.log('query done')
        // res.send(rows[0].user);
        // res.status(200).end();
        res.write(rows[1].m_category_name);
        // res.write(rows[0].user);
        res.end();
    });


});





module.exports = router;