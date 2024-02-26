const { executeQuery, getLastInsertedId } = require("../../utils");
const { createDataTanaman, getDataTanamanById } = require("../Query");

const CreateTanaman = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const { nama_tanaman } = req.body;
    let datatanaman = await executeQuery(getDataTanamanById, [`${nama_tanaman}`]);
    if (datatanaman.length === 0) {
      await executeQuery(createDataTanaman, [nama_tanaman]);
      const dataId = await getLastInsertedId();
      return res.status(201).json({
        success: true,
        message: "success create data hama",
        dataId,
      });
    } else {
      return res.status(201).json({
        success: true,
        message: `data sudah terdaftar pada id = ${datatanaman[0].plant_id}`,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = CreateTanaman;
