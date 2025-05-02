let http = require('http');

let postData = 'q=actor';

let opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

let resData = '';
let req = http.request(opts, function (res){
    res.on('data', function (chunk){
        resData += chunk;
    });

    res.on('end', function (){
        console.log(resData);
    });
});

req.on('error', function (err){
    console.log('오류 발생 : ' + err.message);
});

// 요청 데이터 보내기
req.write(postData);
req.end();
