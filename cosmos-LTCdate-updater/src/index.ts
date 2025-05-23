import dotenv from "dotenv";
// import { readKeysFromExcel } from "./utils/excelReader";
// import { updateDateForKey } from "./services/dateUpdater";

dotenv.config();

async function main() {
    // const keys = await readKeysFromExcel("data.xlsx");
    // for (const key of keys) {
    //     await updateDateForKey(key);
    // }
    console.log("날짜 갱신 완료");
}

main().catch(console.error);
