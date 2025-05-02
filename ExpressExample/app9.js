// 사용자가 로그인한 상태인지 확인 => 쿠키나 세션 이용
// 쿠키 : 클라이언트 웹 브라우저에 저장되는 정보
// 세션 : 웹 서버에 저장되는 정보

// Express 기본 모듈 불러오기
let express = require('express')
    ,http = require('http')
    ,path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser')
    , static = require('serve-static');

let app = express();

// 오류 핸들러 모듈 사용
let expressErrorHandler = require('express-error-handler');

let cookieParser = require('cookie-parser');

app.use('/public', static(path.join(__dirname, 'public')));

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(cookieParser());

// 라우터 객체 참조
let router = express.Router();

// 라우팅 함수 등록
router.route('/process/showCookie').get(function (req,res){
    console.log('/process/showCookie 호출됨.');

    // redirect로 응답
    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function (req,res){
    console.log('/process/setUserCookie 호출됨.');

    // 쿠키 설정
    res.cookie('user',{
        id: 'mike',
        name: '소녀시대',
        authorized: true
    })

    // redirect로 응답
    res.redirect('/process/showCookie');
});

// 모든 router 처리 끝난 후 404 오류 페이지 처리
let errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});

// 최근 에러처리 권장 방식 (라이브러리 없이 원하는 방식으로 에러페이지 커스터마이즈)
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//
//     res.status(err.status || 500).send(`
//     <h1>${err.status || 500} 에러</h1>
//     <p>${err.message}</p>
//   `);
// });


app.use('/', router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function (){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
})