const exceljs = require("exceljs");
const { executeQuery, getLastInsertedId } = require("../utils");
const {createDataTanaman,createDatahama, getDataIdTanaman,getDatahamaId,insertRekomendasiHama, insertRekomendasiQuery} = require('./Query');

const UploadFileExel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    // Load the uploaded Excel file
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1); // assuming the data is in the first sheet

    // Iterate through each row in the worksheet
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      // start from row 2 to skip headers
      const row = worksheet.getRow(rowNumber);

      // Extract data from the row
      const nitrogen = row.getCell("A").value;
      const fosfor = row.getCell("B").value;
      const kalium = row.getCell("C").value;
      const temperature = row.getCell("D").value;
      // const humadity = row.getCell("E").value;
      const ph = row.getCell("E").value;
      // const namaHama = row.getCell("G").value;
      const rainfall = row.getCell("F").value;
      const namaTanaman = row.getCell("G").value;
  
      if (nitrogen === null) {
        break;
      }

      let IdTanaman = await executeQuery(getDataIdTanaman, [`${namaTanaman}`]);
      if (IdTanaman.length === 0) {
        await executeQuery(createDataTanaman, [namaTanaman]);
        const DataIdTanaman = await getLastInsertedId();
        await executeQuery(insertRekomendasiQuery, [
          nitrogen,
          fosfor,
          kalium,
          temperature,
          rainfall,
          ph,
          DataIdTanaman,
        ]);
      } else {
        // Insert data into Rekomendasi table
        await executeQuery(insertRekomendasiQuery, [
          nitrogen,
          fosfor,
          kalium,
          temperature,
          rainfall,
          ph,
          IdTanaman.map((_id) => _id.plant_id),
        ]);
      }

      // Get the last inserted ID
      // const rekomendasiId = await getLastInsertedId();

      // Insert data into Rekomendasi_Hama table
      // const semuHama = namaHama.split(",");

    // Konversi kembali ke dalam array
    // const uniqueNamaHamaArray = Array.from(new Set(semuHama.map(item => item.trim()))).filter(item => item !== "");
    //   for (const hama of uniqueNamaHamaArray) {
    //     let idHama = await executeQuery(getDatahamaId, [`${hama}`]);
    //     if (idHama.length === 0) {
    //       await executeQuery(createDatahama, [hama]);
    //       const dataId = await getLastInsertedId();
    //       await executeQuery(insertRekomendasiHama, [
    //         rekomendasiId,
    //         dataId,
    //       ]);
    //     } else {
    //       await executeQuery(insertRekomendasiHama, [
    //         rekomendasiId,
    //         idHama[0].hama_id,
    //       ]);
    //     }
    //   }
    }
    res.json({ success: true, message: "Data inserted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = UploadFileExel;