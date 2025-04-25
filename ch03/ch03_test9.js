// 배열 메서드
// push(object) : 배열의 끝에 요소를 추가
// pop() : 배열의 끝에 있는 요소를 삭제
// unshift() : 배열의 앞에 요소를 추가
// shift() : 배열의 앞에 있는 요소 삭제
// splice(index, removeCount, [Object]) : 여러 개의 객체를 요소로 추가하거나 삭제
// slice(index, copyCount) : 여러개의 요소를 잘라내어 새로운 배열 객체로 만듬

let Users =[
    {name: '소녀시대', age:20},
    {name:'걸스데이', age:22}
];
console.log('push() 호출 전 배열 요소의 수 : %d',Users.length);

Users.push({name: '티아라', age: 30});
console.log('push() 호출 후 배열 요소의 수 : %d',Users.length);

Users.pop()
console.log('pop() 호출 후 배열 요소의 수 : %d',Users.length);

console.log('unshift() 호출 전 배열 요소의 수 : %d',Users.length);

Users.unshift({name: '티아라', age: 30});
console.log('unshift() 호출 후 배열 요소의 수 : %d',Users.length);

Users.shift();
console.log('shift() 호출 후 배열 요소의 수 : %d',Users.length);
