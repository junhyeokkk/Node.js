// URL모듈 : URL주소 문자열을 주소, 요청파라미터, 프로토콜등으로 나누는 작업을 쉽게 할수있도록 만들어 놓은 모듈
// parse() : 요청 파라미터 문자열을 파싱하여 요청 파라미터 객체로 만들어줌
// stringify() : 요청 파라미터 객체를 문자열로 변환함
let url = require('url');

// 주소 문자열을 URL 객체로 만들기
// 1. 옛날 방법
let curURL = url.parse('https://search.naver.c' +
    'om/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BF%A0%ED%8C%A1&ackey=ddt1aaj0');

// 2. node.js 10부터 권장방식
let cURL = new URL('https://search.naver.com/sea' +
    'rch.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%BF%A0%ED%8C%A1&ackey=ddt1aaj0');

// URL 객체를 주소 문자열로 만들기
let curStr = url.format(curURL);
let curStr1 = url.format(cURL);

console.dir(curStr);
console.dir(curStr1);

// 요청 파라미터 구분하기
let querystring = require('querystring');
let param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));

