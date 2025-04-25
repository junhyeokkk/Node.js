// 파일 패스를 다루는 path 모듈
// join() : 여러 개의 이름들을 모두 합쳐 하나의 파일 패스로 만들어 줍니다. 파일 패스를 완성할 때 구분자를 알아서 조정합니다.
// dirname() : 파일 패스에서 디렉터리 이름을 반환합니다.
// basename() : 파일 패스에서 파일의 확장자를 제외한 이름을 반환합니다.
// extname() : 파일 패스에서 파일의 확장자를 반환합니다.

let path = require('path');

// 디렉터리 이름 합치기
let directories = ["users","mike", "docs"];
let docsDirectory = directories.join(path.sep);
console.log('문서 디렉터리 :  %s', docsDirectory);

// 디렉터리 이름과 파일 이름 합치기
let curPath = path.join('/Users/mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath);

// 패스에서 디렉터리, 파일 이름, 확장자 구별하기
let filename =  "C:\\Users\\최준혁\\Desktop\\jj.txt";
let dirname = path.dirname(filename);
let basename = path.basename(filename);
let extname = path.extname(filename);

console.log('디렉터리 : %s, 파일 이름 : %s, 확장자 : %s', dirname, basename, extname);

