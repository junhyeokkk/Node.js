// 노드는 대부분 이벤트를 기반으로 하는 비동기 방식으로 처리
// EventEmitter : 서로 이벤트를 보내고 받을 수 있게 하는 객체

// on(event, listener) : 지정된 이벤트의 리스너를 추가
// once(event, listener) : 지정된 이벤트의 리스터를 추가하지만 한 번 실행한 후에는 자동으로 리스너 제거
// removeListener(event, listener) : 지정된 이벤트에 대한 리스너를 제거

// process 객체는 언제든지 사용할 수 있는 객체인데 내부적으로 EventEmitter를 상속받도록 만들어져 있음
process.on('exit', function (){
    console.log('exit 이벤트 발생함.');
})

setTimeout(function (){
    console.log('2초 후에 시스템 종료 시도함.');

    process.exit();
}, 2000)

