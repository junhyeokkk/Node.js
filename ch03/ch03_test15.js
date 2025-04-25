// 프로토타입 객체 => 데이터를 넣어두는 목적 보다는 하나의 틀로 사용하기위해 생성 >> 붕어빵 틀
function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function (speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
}

let p1 = new Person('소녀시대', 20);
let p2 = new Person('걸스데이', 22);

console.log(p1.name + '객체의 walk(10)을 호출합니다.');
p1.walk(10);