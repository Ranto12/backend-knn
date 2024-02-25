const {executeQuery, getLastInsertedId} = require('../../utils')
const { createDatahama, getDatahamaId } = require('../Query')

const CreateHama = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const { hama } = req.body;
    let idHama = await executeQuery(getDatahamaId, [`${hama}`]);
    if (idHama.length === 0) {
      await executeQuery(createDatahama, [hama]);
      const dataId = await getLastInsertedId();
     return res.status(201).json({
        success: true,
        message: "success create data hama",
        dataId
      });
    } else {
     return res.status(201).json({
        success: true,
        message: `data sudah terdaftar pada id = ${idHama[0].hama_id}`
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = CreateHama;
