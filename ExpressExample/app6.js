// 라우터 미들웨어 : 클라이언트 요청이 들어왔을때 일일이 요청 url을 확인하는 번거로움을 해결해줌

// Express 기본 모듈 불러오기
let express = require('express')
    ,http = require('http')
    ,path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser')
    , static = require('serve-static');

let app = express();

app.use('/public', static(path.join(__dirname, 'public')));

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// 라우터 객체 참조
let router = express.Router();

// 라우팅 함수 등록
router.route('/process/login/:name').post(function (req,res){
    console.log('/process/login/:name 처리함.');

    let paramName = req.params.name;

    let paramId = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : '+ paramName +'</p></div>');
    res.write('<div><p>Param id : '+ paramId +'</p></div>');
    res.write('<div><p>paramPassword : '+ paramPassword +'</p></div>');
    res.write("<br><br> <a href='./public/login3.html'>로그인 페이지로 돌아가기</a>")
    res.end();
})

// // 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function (req,res){
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다. </h1>');
// });

app.use('/', router);

http.createServer(app).listen(3000, function (){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
})