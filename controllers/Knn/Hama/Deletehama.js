const { executeQuery } = require("../../utils");
const { getDatahamaIdByeId, Deletehama } = require("../Query");


const DeleteDataHama = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const idHama = await executeQuery(getDatahamaIdByeId, [req.body.hama_id]);
    if (idHama.length === 0) {
      return res.json({
        success: false,
        message: "data tidak tersedia.",
      });
    }

    await executeQuery(Deletehama, [req.body.hama_id]);
    return res.json({
      success: true,
      message: "success delete data.",
      idHama: idHama[0].hama_id,
    });
  } catch (error) {
        console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = DeleteDataHama;
