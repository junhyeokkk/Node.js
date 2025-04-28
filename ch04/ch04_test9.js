// open(path, flags, [mode], [callback]) : 파일 열기
// read(fd, buffer, offset, length, position, [callback]) : 지정된 파일 내용을 읽음
// write(fd, buffer, offset, length, position, [callback]) : 파일을 지정한 부분에 데이터를 씀
// close(fd, [callback]) : 파일 닫기

let fs = require('fs');

// 파일에 데이터 쓰기
fs.open('./output.txt', 'w', function (err, fd){
    if (err) throw err;

    let buf = new Buffer('안녕! \n');
    fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer){
        if(err) throw err;

        console.log(err, written, buffer);

        fs.close(fd, function (){
            console.log('파일 읽고 데이터 쓰고 파일 닫기 완료');
        });
    });
});