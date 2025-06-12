import { containerClient } from "../../src/config/blobClient";

// blob db 연결 테스트 코드 
async function listBlobs() {

    const exists = await containerClient.exists();
    console.log("컨테이너 존재 여부:", exists); // false면 무조건 오류 발생

    console.log("Blob 목록:");
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(" -", blob.name);
    }
}

listBlobs().catch(console.error);