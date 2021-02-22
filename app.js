const express = require('express');
const app = express();




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

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
