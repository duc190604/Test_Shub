import fetch from "node-fetch";
import * as XLSX from "xlsx";
import fs from "fs";
async function processExcelFromUrl() {
  const fileUrl = "https://go.microsoft.com/fwlink/?LinkID=521962";
  const outputPath = "./filtered-data.xlsx";
  try {
    //Lấy dữ liệu từ API
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Không thể tải file: ${response.statusText}`);
    }
    //Đọc và xử lí dữ liệu từ API
    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(Buffer.from(buffer), { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    const filteredData = data.filter((row) => {
      try {
        const sales = parseFloat(row["  Sales "]);
        if (isNaN(sales)) {
          return false;
        }
        return sales > 50000;
      } catch (error) {
        return false;
      }
    });
    //Xử lí để lưu file mới
    const newWorksheet = XLSX.utils.json_to_sheet(filteredData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Filtered Data");
    const outputBuffer = XLSX.write(newWorkbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log(`File cũ đã bị xóa: ${outputPath}`);
    }
    fs.writeFileSync(outputPath, outputBuffer);
    const absolutePath = fs.realpathSync(outputPath);
    console.log(`File Excel đã được lưu tại: ${absolutePath}`);
  } catch (error) {
    console.error("Lỗi khi xử lý - ", error);
  }
}
processExcelFromUrl();
