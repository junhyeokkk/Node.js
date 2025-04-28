// 버퍼 객체를 크기만 지정하여 만든 후 문자열 쓰기
let output = '안녕 1!';
// let buffer1 = new Buffer(10); // 예전 코드
let buffer1 = Buffer.alloc(10); // 권장 코드
let len = buffer1.write(output, 'utf8');
console.log('첫 번째 버퍼의 문자열 : %s');

// 버퍼 객체를 문자열을 이용해 만들기
// let buffer2 = new Buffer('안녕 2!', 'utf8'); // 예전 코드
let buffer2 = Buffer.from('안녕 2!' ,'utf8'); // 권장 코드
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString());

// 타입 확인
console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));

// 버퍼 객체에 들어 있는 문자열 데이터를 문자열 변수로 만듬
let byteLen = Buffer.byteLength(output);
let str1 = buffer1.toString('utf8', 0 , byteLen);
let str2 = buffer2.toString('utf8');

// 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사
buffer1.copy(buffer2, 0 ,0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf8'));

// 두 개의 버퍼를 붙여 줍니다.
let buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));