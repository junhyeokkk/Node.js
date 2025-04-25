// 시스템 정보를 알려주는 os 모듈
// hostname() : 운영체제의 호스트 이름을 알려줍니다.
// totalmem() : 시스템의 전체 메모리 용량을 알려줍니다.
// freemem() : 시스템에서 사용 가능한 메모리 용량을 알려 줍니다.
// cpus() : CPU 정보를 알려줍니다.
// networkInterface() : 네트워크 인터페이스 정보를 담은 배열 객체를 반환합니다.


let os = require('os');

console.log('시스템의 hostname : %s', os.hostname());
console.log('시스템의 메모리 : %d',os.freemem(), os.totalmem());
console.log('시스템의 cpu 정보 \n');
console.log(os.cpus());
console.log('시스템의 네트워크 인터페이스 정보 \n');
console.log(os.networkInterfaces());