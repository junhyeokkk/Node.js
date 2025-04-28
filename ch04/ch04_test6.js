// 노드의 파일 시스템은 파일을 다루는 기능과 디렉터리를 다루는 기능으로 구성
// 동기식 IO, 비동기식 IO 기능 함께 제공
// 동기식 IO 메서드는 ==> Sync라는 단어를 붙임

let fs = require('fs');

// 파일을 동기식 IO로 읽음
let data = fs.readFileSync('C:\\Users\\최준혁\\Desktop\\jj.txt');

// 읽어 들인 데이터 출력
console.log('data : '+ data);
