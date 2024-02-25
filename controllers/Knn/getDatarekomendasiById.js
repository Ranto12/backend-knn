const connection = require("../../config/db");
const getDatarekomendasiById = async (req, res) => {
  const getbyIdQuery = "SELECT * FROM Rekomendasi WHERE rekomendasi_id = ?";
  try {
    const [rows] = await connection
      .promise()
      .query(getbyIdQuery, [req.query.id]);

    if (rows.length > 0) {
      res.json({
        success: true,
        message: "Success get data by ID",
        data: rows[0],
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found for the specified ID",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = getDatarekomendasiById;