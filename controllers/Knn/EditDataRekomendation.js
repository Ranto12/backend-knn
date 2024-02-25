const connection = require("../../config/db");
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
        res.status(201).json({
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

module.exports = EditDataRekomendation;