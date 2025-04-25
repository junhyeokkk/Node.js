// 콜백 함수 : 다른 함수에 인자로 전달되어, 특정 시점에 호출되는 함수 (비동기 프로그래밍에 자주사용)
// ==> 어떤 일이 끝난 다음에, 그 결과를 가지고 뭔가 추가 작업을 하고 싶을 때 쓰는 함수
/*
    add2는 계산기처럼 “버튼 누르면 결과 뱉고 끝!
    add는 비서처럼 “계산해 드릴게요, 그리고 결과는 누구한테 알려드릴까요?” 하는 스타일
 */
function add(a, b, callback) {
    let result = a+b;
    callback(result);
}

function add2(a, b) {
    return a+b;
}

add(10, 10, function (result){
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10, 10)의 결과 : %d', result);
});

