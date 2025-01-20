import fetch from "node-fetch";
//Tính kết quả
async function processData(data, range, type) {
  try {
    let result = 0;
    const start = Number(range[0]);
    const end = Number(range[1]);
    if (Number(type) === 1) {
      result = data
        .slice(start, end + 1)
        .reduce((acc, val) => acc + Number(val), 0);
    }
    if (Number(type) === 2) {
      const filteredData = data.slice(start, end + 1);
      for (let i = 0; i < filteredData.length; i++) {
        if (i % 2 === 0) {
          result += Number(filteredData[i]);
        } else {
          result -= Number(filteredData[i]);
        }
      }
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
async function main() {
  try {
    //Lấy dữ liệu
    const urlInput = "https://share.shub.edu.vn/api/intern-test/input";
    const response = await fetch(urlInput);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const dataResponse = await response.json();
    const token = dataResponse.token;
    const data = dataResponse.data;
    const query = dataResponse.query;
    //Tính kết quả
    const result = await Promise.all(
      query.map((item) => processData(data, item.range, item.type))
    );
    console.log("result", result);
    //Gửi kết quả
    const urlOutput = "https://share.shub.edu.vn/api/intern-test/output";
    const responseOutput = await fetch(urlOutput, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result),
    });
    if (!responseOutput.ok) {
      throw new Error(responseOutput.statusText);
    }
    const dataOutput = await responseOutput.json();
    console.log(dataOutput.message);
  } catch (error) {
    console.error(error);
  }
}

main();
