const {executeQuery, getLastInsertedId} = require('../../utils')
const { updateDataHama, getDatahamaIdByeId } = require('../Query')

const UpdateDataHama = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const { hama, hama_id } = req.body;
    let idHama = await executeQuery(getDatahamaIdByeId, [`${hama_id}`]);
    if (idHama.length !== 0) {
      await executeQuery(updateDataHama, [hama, hama_id]);
     return res.status(201).json({
        success: true,
        message: "success update data hama",
        id_hama : idHama[0].hama_id
      });
    } else {
     return res.status(201).json({
        success: true,
        message: `data tidak tersedia`
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = UpdateDataHama;
