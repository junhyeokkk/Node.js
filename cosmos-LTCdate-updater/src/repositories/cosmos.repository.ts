import { getContainer } from '../config/cosmosClient';

// shipkey로 NoonReport에서 선박을 찾아 ltctime이 가장 최신인 cosmos 데이터 1개 조회 
export async function getLatestLTCByShipkey(shipkey: string): Promise<string | null> {
  const container = getContainer();
  const querySpec = {
    query: "SELECT TOP 1 c.ltctime FROM c WHERE c.shipkey = @shipkey ORDER BY c.ltctime DESC",
    parameters: [{ name: "@shipkey", value: shipkey }],
  };

  const { resources } = await container.items.query(querySpec, { partitionKey: shipkey }).fetchAll();
  return resources?.[0]?.ltctime ?? null;
}
