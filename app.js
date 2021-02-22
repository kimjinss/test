const express = require('express');
const app = express();
const indexRouter = require('./routes')

app.set('port', process.env.PORT || 8080);

app.use('/',indexRouter)


// app.post('/post', (req, res) => {
//     console.log('who get in here post /users');
//     let inputData;
//
//     req.on('data', (data) => {
//         inputData = JSON.parse(data);
//     });
//
//     req.on('end', () => {
//         console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
//     });
//
//     res.write("OK!");
//     res.end();
// });












app.use((req,res,next) => {
    res.status(404).send('Not Found');
});

app.use((err,req,res,next) => {
    console.error(err);
    res.status(500).send(err.message);
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
