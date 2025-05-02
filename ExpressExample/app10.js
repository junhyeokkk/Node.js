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
let expressSession = require('express-session');

app.use('/public', static(path.join(__dirname, 'public')));

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}))

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

// 상품정보 라우팅 함수
router.route('/process/product').get(function (req, res){
    console.log('/process/product 호출됨');

    if(req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function (req, res){
    console.log('/process/login 호출됨');

    let paramId = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        // 이미 로그인 된 상태
        console.log('이미 로그인되어 상품 페이지로 이동');

        req.redirect('/public/product.html');
    } else{
        // 세션 저장
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        }
    }

    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>로그인 성공</h1>');
    res.write('<div><p>Param id : ' +paramId+'</p></div>');
    res.write('<div><p>Param password : ' +paramPassword+'</p></div>');
    res.write('<br><br><a href="/public/product.html">상품 페이지로 이동하기</a>');
    res.end();
})

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제
router.route('/process/logout').get(function (req, res){
    console.log('/precess/logout 호출됨');

    if(req.session.user){
        // 로그인된 상태
        console.log('로그아웃 합니다.');

        req.session.destroy(function (err){
            if (err) {throw err;}

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
    } else{
        //로그인 안된 상태
        console.log('아직 로그인되어 있지 않습니다.');

        res.redirect('/public/login2.html');
    }
})

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