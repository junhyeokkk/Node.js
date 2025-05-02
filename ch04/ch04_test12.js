// createReadStream(path, [options]) : 파일을 읽기 위한 스트림 객체를 만듭니다.
// createWriteStream(path, [options]) : 파일을 쓰기 위한 스트림 객체를 만듭니다.

let fs =  require('fs');

let infile = fs.createReadStream('./output.txt', {flags: 'r'});
let outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infile.on('data', function (data){
    console.log('읽어 들인 데이터', data);
    outfile.write(data);
});

infile.on('end', function (){
    console.log('파일 읽기 종료');
    outfile.end(function (){
        console.log('파일 쓰기 종료');
    });
});

