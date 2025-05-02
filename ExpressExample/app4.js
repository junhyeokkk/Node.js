// body-parser 미들웨어 : 클라이언트가 POST 방식으로 요청할 때 본문 영역에 들어있는 요청 파라미터
// 등을 파싱하여 요청 객체의 body 속성에 넣어줌

// Express 기본 모듈 불러오기
let express = require('express')
    ,http = require('http')
    ,path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser')
    , static = require('serve-static');

// 익스프레스 객체 생성
let app = express();

// 기본 속성 설정
app.set('port', [process.env.PORT] || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname,'public')));

// 미들웨어에서 파라미터 확인
app.use(function (req,res,next){
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    let paramId = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+ paramId +'</p></div>');
    res.write('<div><p>paramPassword : '+ paramPassword +'</p></div>');
    res.end();
});

http.createServer(app).listen(3000, function (){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
})