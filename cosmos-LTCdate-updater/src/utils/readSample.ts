import { getContainer } from "../config/cosmosClient";

async function main() {
    const container = getContainer();

    // shipkey를 넣어서 해당 데이터를 찾아 현재 ltc시간으로 변경
    const querySpec = {
        query: "SELECT * FROM c WHERE c.shipkey = @shipkey",
        parameters: [{ name: "@shipkey", value: "asdf001" }],
    };

    // 1. 문서 조회
    const { resources } = await container.items
        .query(querySpec, { partitionKey: "asdf001" })
        .fetchAll();

    console.log("조회 결과:", resources);

    // 2. ltcTime 현재시간으로 업데이트
    const nowIso = new Date().toISOString();

    console.log('ISOstring 형식  : ' + nowIso);

    for (const doc of resources) {
        doc.ltctime = nowIso;  // ISO 문자열로 갱신

        // 3. Cosmos DB 문서를 교체하는 것이므로 id, partitionKey가 필요하다.
        const { id, shipkey } = doc;

        // replace 메서드는 수정된 전체 문서가 필요함
        await container.item(id, shipkey).replace(doc);

        console.log(`문서 ${id}의 ltctime 업데이트 완료: ${nowIso}`);
    }
}

main().catch(console.error);
