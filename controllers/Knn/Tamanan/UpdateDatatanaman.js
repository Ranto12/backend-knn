const {executeQuery} = require('../../utils')
const { updateDataTanaman } = require('../Query')

const UpdateDataTanaman = async (req, res, next) => {
        const { nama_tanaman, plant_id } = req.body;
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    if (nama_tanaman.length !== 0) {
      await executeQuery(updateDataTanaman, [nama_tanaman, parseInt(plant_id)]);
     return res.status(201).json({
        success: true,
        message: "success update data tanaman",
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

module.exports = UpdateDataTanaman;
