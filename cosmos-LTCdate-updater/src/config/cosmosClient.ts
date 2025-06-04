// Cosmos DB 연결 설정
import { CosmosClient } from "@azure/cosmos";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// 1. 해당 방식으로 client 지정해줬는데 계속 SSL/TLS 인증 문제 발생
// -> Azure cosmos db Emulator는 https를 사용하기 때문에 인증서 필요
// 2. 인증서 무시 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 방법 실행 >> 개발 환경에만 적용 배포환경에서는 인증서 가져와 반영해야함 
// 3. https://learn.microsoft.com/ko-kr/azure/cosmos-db/how-to-develop-emulator?tabs=windows%2Cjavascript&pivots=api-nosql 공식문서 참고

// const endpoint = "https://localhost:8081/";
// const key = "C2y6yDjf5/R+ob0N8A6o2b==";
//
// const client = new CosmosClient({ endpoint, key });

// 4. 밑의 방식으로 클라이언트 생성 후 오류 해결

const client = new CosmosClient({
    endpoint: 'https://localhost:8081/',
    key: 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
})

export function getContainer() {
    return client.database("SampleShipDB").container("JSON-REPORT");
}


