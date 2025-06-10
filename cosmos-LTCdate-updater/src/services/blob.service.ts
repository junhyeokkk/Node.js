import { containerClient } from "../config/blobClient";
import { CustomError } from "../errors/CustomError";

export class AzureService {
  async findLatestJsonFile(shipkey: string): Promise<string> {
    const blobs = containerClient.listBlobsFlat({ prefix: `${shipkey}/` });

    const datePaths: string[] = [];

    for await (const blob of blobs) {
    
        // blob 파일은 5LQO5/2025/04/28/20250428100845-NOON_AT_SEA-0.json 해당 형식 
        const parts = blob.name.split("/"); // '/' 로 part 나누기

        if (parts.length >= 4) {
            const [_, year, month, day] = parts;
            if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month) && /^\d{2}$/.test(day)) {
            const dateStr = `${year}-${month}-${day}`; // dateStr 형식 '2025-04-28'
            datePaths.push(dateStr);
            }
        }
    }

    if (datePaths.length === 0) {
      throw new CustomError("유효한 날짜 경로가 없습니다.", 400);
    }

    const latestDate = datePaths.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
    const [year, month, day] = latestDate.split("-");
    const targetPrefix = `${shipkey}/${year}/${month}/${day}/`;

    const latestFiles = containerClient.listBlobsFlat({ prefix: targetPrefix });

    for await (const blob of latestFiles) {
      if (blob.name.endsWith(".json")) {
        return blob.name;
      }
    }

    throw new CustomError("해당 날짜 폴더에 JSON 파일이 없습니다.", 400);
  }
}
