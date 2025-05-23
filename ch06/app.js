// Express 기본 모듈 불러오기
let express = require('express'),
    http = require('http'),
    path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler')
;

// 오류 핸들러 모듈 사용
let expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
let expressSession = require('express-session');

// 익스프레스 객체 생성
let app = express(); // express 서버 객체 생성

// 기본 속성 설정
app.set('port', process.env.PORT || 3000); // 포트번호 설정

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my Key',
    resave:true,
    saveUninitialized:true
}));

// 라우터 객체 참조
let router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function (req, res){
    console.log('/process/login 호출');
})

// 라우터 객체 등록
app.use('/', router);

// ============ 404 오류 페이지 처리 ============= //
let errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html',
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// ======  서버 시작 ====== //
http.createServer(app).listen(app.get('port'), function (){
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
})