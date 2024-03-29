const { executeQuery } = require("../../utils");
const { Deletehama, GetRekomendasiByHamaId } = require("../Query");


const DeleteDataHama = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const DataDigunakan = await executeQuery(GetRekomendasiByHamaId, [
      req.body.hama_id,
    ]);
    if (DataDigunakan.length > 0) {
      return res.status(201).json({
        success: false,
        status: `data digunakan di rekomendasi id = ${DataDigunakan[0].rekomendasi_id}`,
      });
    } else {
      await executeQuery(Deletehama, [req.body.hama_id]);
      return res.status(201).json({
        success: true,
        status: `success delete data from id : ${req.body.hama_id}`,
      });
    }
  } catch (error) {
        console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = DeleteDataHama;
