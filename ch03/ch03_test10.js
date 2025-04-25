// 배열 메서드
// push(object) : 배열의 끝에 요소를 추가
// pop() : 배열의 끝에 있는 요소를 삭제
// unshift() : 배열의 앞에 요소를 추가
// shift() : 배열의 앞에 있는 요소 삭제
// splice(index, removeCount, [Object]) : 여러 개의 객체를 요소로 추가하거나 삭제
// slice(index, copyCount) : 여러개의 요소를 잘라내어 새로운 배열 객체로 만듬

let Users =[
    {name: '소녀시대', age:20},
    {name:'걸스데이', age:22},
    {name:'티아라', age:27}
];

console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

// delete Users[1]; // delete : 해당 인덱스의 객체를 삭제 후 그 공간은 그대로 남겨둠 --> splice 사용
// console.log('delete 키워드로 배열 요소 삭제 후');
// console.dir(Users);

Users.splice(1, 0,{name: '애프터스쿨',age:25});
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2,1);
console.log('splice()로 인덱스 2의 요소 를 1개 삭제한 후');
console.dir(Users);
