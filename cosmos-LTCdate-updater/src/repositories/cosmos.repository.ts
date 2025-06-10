import { getContainer } from '../config/cosmosClient';

// shipkey로 NoonReport에서 선박을 찾아 ltctime의 최신, 앱 버전, 과거 조회 
export async function getLTCMinMaxByShipkey(
    sk: string
  ): Promise<{ earliest: string | null; latest: string | null; appVersion: string | null }> {
    const container = getContainer();

  // 최신 LTC + appVersion 조회 (TOP 1) ==> 마지막 리포트 버전 앱 버전 조회 
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

  const [latestRes, earliestRes] = await Promise.all([ // Promise.all([...]) => 두 개의 비동기 작업 병렬 실행
   
    container.items.query(queryLatest, { partitionKey: sk }).fetchAll(),
    container.items.query(queryEarliest, { partitionKey: sk }).fetchAll(),
  ]);

  const latest = latestRes.resources?.[0]?.latest ?? null;
  const appVersion = latestRes.resources?.[0]?.appVersion ?? null;
  const earliest = earliestRes.resources?.[0]?.earliest ?? null;

  if(latest != null && appVersion != null && earliest != null) {
    console.log('가장 최근 : ', latest);
    console.log('앱 버전 : ', appVersion);
    console.log('가장 처음 : ', earliest);
  }

  return { earliest, latest, appVersion };
}



