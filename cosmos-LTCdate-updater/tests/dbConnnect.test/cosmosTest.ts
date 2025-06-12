import { getContainer } from "../../src/config/cosmosClient";

// cosmos db 연결 테스트 코드 
async function testCosmosConnection() {
  try {
    const container = getContainer();

    // 간단한 쿼리: 문서 1개 가져오기
    const querySpec = {
      query: "SELECT TOP 1 * FROM c"
    };

    const { resources } = await container.items.query(querySpec).fetchAll();

    if (resources.length > 0) {
      console.log("Cosmos DB 연결 성공! 문서 예시:");
      console.log(resources[0]);
    } else {
      console.log("연결은 성공했지만 문서가 없습니다.");
    }
  } catch (error) {
    console.error("Cosmos DB 연결 실패:");
    console.error(error);
  }
}

// 실행
testCosmosConnection();
