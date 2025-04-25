let Calc = require('./ch04_test4');

let calc = new Calc();
calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함');