const { executeQuery } = require("../../utils");
const { GetRekomendasiByPlantId, deleteTanaman } = require("../Query");

const DeleteDataTanaman = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const DataDigunakan = await executeQuery(GetRekomendasiByPlantId, [
      req.body.tanaman_id,
    ]);
    if (DataDigunakan.length > 0) {
      return res.status(201).json({
        success: false,
        status: `data digunakan di rekomendasi id = ${DataDigunakan[0].rekomendasi_id}`,
      });
    } else {
      await executeQuery(deleteTanaman, [req.body.tanaman_id]);
      return res.status(201).json({
        success: true,
        status: `success delete data from id : ${req.body.tanaman_id}`,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = DeleteDataTanaman;
