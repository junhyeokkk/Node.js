import ExcelJS from "exceljs";
import fs from "fs";

async function excelMade() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("MockData");

    sheet.columns = [
        { header: "Name", key: "name", width: 20 },
        { header: "shipKey", key: "shipkey", width: 20 },
        { header: "OtherColumn", key: "other", width: 20 },
        { header: "Date", key: "date", width: 20 },
    ];

    sheet.addRows([
        { name: "선박001", shipkey: "asdf001", other: "songa", date: "2025-03-02T12:00:00.000" },
        { name: "선박002", shipkey: "asdf002", other: "sk", date: "2025-03-01T12:00:00.000" },
        { name: "선박003", shipkey: "asdf003", other: "lg", date: "2025-02-22T12:00:00.000" },
    ]);

    const filePath = "./data.xlsx";
    await workbook.xlsx.writeFile(filePath);
    console.log(`엑셀 파일 생성: ${filePath}`);
}

excelMade().catch(console.error);
