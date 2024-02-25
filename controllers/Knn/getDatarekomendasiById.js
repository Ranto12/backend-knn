const { executeQuery } = require("../utils");
const { getDataRekomendasiById } = require("./Query");

const getDatarekomendasiById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const data = await executeQuery(getDataRekomendasiById, [req.query.id])
    res.status(200).json({
      success: true,
      data : data[0],
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      success: true
    })
  }
};

module.exports = getDatarekomendasiById;