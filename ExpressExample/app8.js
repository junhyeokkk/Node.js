// express-error-handler 미들웨어 : 404에러 처리 핸들러

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

app.use('/public', static(path.join(__dirname, 'public')));

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// 라우터 객체 참조
let router = express.Router();

// 라우팅 함수 등록
router.route('/process/users/:id').get(function (req,res){
    console.log('/process/users/:id 처리함.');

    // URL 파라미터 확인
    let paramId = req.params.id;

    console.log('/process/users와 토큰 %s를 이용해 처리함.', paramId);

    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' +paramId+'</p></div>');
    res.end();
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