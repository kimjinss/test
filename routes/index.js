const express = require('express');
const app = express();

let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bek'
    },
    {
        id: 3,
        name: 'chris'
    }
]

app.get('/users', (req, res) => {
    console.log('who get in here/users');
    res.json(users)
});

app.post('/post', (req, res) => {
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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


출처: https://gakari.tistory.com/entry/안드로이드-Nodejs서버로-POST방식으로-데이터를-보내기?category=414830 [가카리의 공부방]