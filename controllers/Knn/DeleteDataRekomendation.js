const { executeQuery, getLastInsertedId } = require("../utils");
const { deleteRekomendasi, getbyIdRekomendasi } = require("./Query");

const DeleteDataRekomendation = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const idRekomendasi = await executeQuery(getbyIdRekomendasi, [req.body.id]);
    if (idRekomendasi.length === 0) {
      return res.json({
        success: false,
        message: "data tidak tersedia.",
      });
    }

    const rekomendasiId = await getLastInsertedId();
    await executeQuery(deleteRekomendasi, [rekomendasiId]);
    return res.json({
      success: true,
      message: "success delete data.",
      idRekomendasi,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = DeleteDataRekomendation;
