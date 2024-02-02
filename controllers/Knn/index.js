const exceljs = require("exceljs");
const connection = require("../../config/db");

const UploadFileExel = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    // Get the first worksheet
    const worksheet = workbook.getWorksheet();
    //   Iterate through rows in the Excel file and insert values into the database
    for (let row = 2; row <= worksheet.rowCount; row++) {
      const [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        humadity,
        rainfall,
        ph,
        plant,
      ] = worksheet.getRow(1).values.slice(1);
      await connection.execute(
        "INSERT INTO rekomendasi (nitrogen, fosfor, kalium, temperature, humadity, rainfall, ph, plant) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nitrogen, fosfor, kalium, temperature, humadity, rainfall, ph, plant]
      );
    }

    res.json({
      success: true,
      message: "File uploaded and data inserted into the database.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const CreateDataRekomendation = async (req, res) => {
  const {
    nitrogen,
    fosfor,
    kalium,
    temperature,
    humadity,
    rainfall,
    ph,
    plant,
  } = req.body;

  try {
    const insertUserQuery = `
        INSERT INTO rekomendasi (nitrogen, fosfor, kalium, temperature, humadity, rainfall, ph, plant) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    // Eksekusi pernyataan SQL untuk menyimpan pengguna baru
    connection.query(
      insertUserQuery,
      [nitrogen, fosfor, kalium, temperature, humadity, rainfall, ph, plant],
      (err, result) => {
        if (err) {
          console.error("Error creating data rekomendation:", err);
          return res
            .status(500)
            .json({ error: err, message: "Error creating data rekomendation" });
        }
        console.log("Rekomendation created successfully");
        res.status(201).json({
          message: "Rekomendation created successfully",
          data: {
            id: result.insertId,
            ...req.body,
          },
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const EditDataRekomendation = async (req, res) => {
  const { id, rekomendasi } = req.body;
  const {
    nitrogen,
    fosfor,
    kalium,
    temperature,
    humadity,
    rainfall,
    ph,
    plant,
  } = rekomendasi;

  try {
    const udpateknnQuery = `
        UPDATE rekomendasi SET nitrogen = ?, fosfor = ?, kalium = ?, temperature = ?, humadity = ?, rainfall = ?,  ph = ?, plant = ? WHERE rekomendasi_id = ?;`;
    // Eksekusi pernyataan SQL untuk menyimpan pengguna baru
    connection.execute(
      udpateknnQuery,
      [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        humadity,
        rainfall,
        ph,
        plant,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error update data rekomendation:", err);
          return res
            .status(500)
            .json({ error: err, message: "Error update data rekomendation" });
        }
        console.log("User created successfully");
        res
          .status(201)
          .json({
            message: "Rekomendation update successfully",
            data: { id: result.insertId },
          });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const DeleteDataRekomendation = async (req, res) => {
  try {
    const deleteQuery = "DELETE FROM Rekomendasi WHERE rekomendasi_id = ?";
    connection.execute(deleteQuery, [req.body.id], (err) => {
      if (err) {
        console.error("Error delete data rekomendation:", err);
        return res
          .status(500)
          .json({ error: err, message: "Error delete data rekomendation" });
      }
      console.log("User created successfully");
      res.status(201).json({
        message: "Deletion successful",
        data: {
          id: req.body.id,
        },
      });
    });

    console.log("Deletion successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getDatarekomendasiAll = async (req, res) => {
    const {search, limit, offset } = req.query;
    const getbyallQuery = 'SELECT * FROM Rekomendasi WHERE plant LIKE ? LIMIT ? OFFSET ?';
    try {
        const [rows] = await connection.promise().query(getbyallQuery, [`%${search}%`, parseInt(limit), parseInt(offset)]);


        if (rows.length > 0) {
          res.json({ success: true, message: 'Success get data by ID', data: rows });
        } else {
          res.status(404).json({ success: false, message: 'Data not found for the specified ID' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
};

const getDatarekomendasiById = async (req, res) => {
    const getbyIdQuery = 'SELECT * FROM Rekomendasi WHERE rekomendasi_id = ?';

    try {
        const [rows] = await connection.promise().query(getbyIdQuery, [req.query.id]);

        if (rows.length > 0) {
          res.json({ success: true, message: 'Success get data by ID', data: rows[0] });
        } else {
          res.status(404).json({ success: false, message: 'Data not found for the specified ID' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
};

module.exports = {
  UploadFileExel,
  CreateDataRekomendation,
  EditDataRekomendation,
  DeleteDataRekomendation,
  getDatarekomendasiById,
  getDatarekomendasiAll,
};
