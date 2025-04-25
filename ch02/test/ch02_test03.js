// 모듈 : 메인 파일이나 코드중에서 독립적인 기능을 별도 파일로 분리한 파일


// 내부 사용자 정의 모듈 사용
let calc = require('./module/module1');
console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(10,10));

// 외장 모듈 사용
let nconf = require('nconf');
nconf.env();

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));