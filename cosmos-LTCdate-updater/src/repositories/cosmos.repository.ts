import { getContainer } from '../config/cosmosClient';

// shipkey로 NoonReport에서 선박을 찾아 ltctime의 최신과 과거 조회 (단일 쿼리 버전)
export async function getLTCMinMaxByShipkey(
    sk: string
  ): Promise<{ earliest: string | null; latest: string | null; appVersion: string | null }> {
    const container = getContainer();

  // 최신 LTC + appVersion 조회 (TOP 1)
  const queryLatest = {
    query: `
      SELECT TOP 1 c.DATE_EVENT_LTC AS latest, c.APP_VERSION AS appVersion
      FROM c
      WHERE c.sk = @sk
      ORDER BY c.DATE_EVENT_LTC DESC
    `,
    parameters: [{ name: "@sk", value: sk }],
  };

  // earliest LTC만 조회 (MIN)
  const queryEarliest = {
    query: `
      SELECT MIN(c.DATE_EVENT_LTC) AS earliest
      FROM c
      WHERE c.sk = @sk
    `,
    parameters: [{ name: "@sk", value: sk }],
  };

  const [latestRes, earliestRes] = await Promise.all([
    container.items.query(queryLatest, { partitionKey: sk }).fetchAll(),
    container.items.query(queryEarliest, { partitionKey: sk }).fetchAll(),
  ]);

  const latest = latestRes.resources?.[0]?.latest ?? null;
  const appVersion = latestRes.resources?.[0]?.appVersion ?? null;
  const earliest = earliestRes.resources?.[0]?.earliest ?? null;

  return { earliest, latest, appVersion };
}


// shipkey로 NoonReport에서 선박을 찾아 ltctime의 최신과 과거 조회 (쿼리 2개 버전)
// export async function getLTCMinMaxByShipkey(sk: string): Promise<{ earliest: string | null, latest: string | null }> {
//   const container = getContainer();

//   const queryLatest = {
//     query: "SELECT TOP 1 c.DATE_EVENT_LTC FROM c WHERE c.sk = @sk ORDER BY c.DATE_EVENT_LTC DESC",
//     parameters: [{ name: "@sk", value: sk }],
//   };
  
//   const queryEarliest = {
//     query: "SELECT TOP 1 c.DATE_EVENT_LTC FROM c WHERE c.sk = @sk ORDER BY c.DATE_EVENT_LTC ASC",
//     parameters: [{ name: "@sk", value: sk }],
//   };

//   const [latestRes, earliestRes] = await Promise.all([
//     container.items.query(queryLatest, { partitionKey: sk }).fetchAll(),
//     container.items.query(queryEarliest, { partitionKey: sk }).fetchAll(),
//   ]);

//   const latest = latestRes.resources?.[0]?.DATE_EVENT_LTC ?? null;
//   const earliest = earliestRes.resources?.[0]?.DATE_EVENT_LTC ?? null;

//   return { earliest, latest };
// }


