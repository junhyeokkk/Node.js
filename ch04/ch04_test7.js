// 파일 입출력 메서드
// readFile(filename, [encoding], [callback]) : 비동기식 IO로 파일 읽기
// readFileSync(filename, [encoding]) : 동기식 IO로 파일 읽기
// writeFile(filename, data, encoding='utf-8', [callback]) : 비동기식 IO로 파일 쓰기
// writeFileSync(filename, data, encoding='utf-8') : 동기식 IO로 파일 쓰기

let fs = require('fs');

// 파일을 비동기식 IO로 읽음
fs.readFile('C:\\Users\\최준혁\\Desktop\\jj.txt','utf8', function (err, data){
    // 읽은 데이터 출력
    console.log(data);
});

console.log('바탕화면 jj.txt 파일 읽음 요청');

