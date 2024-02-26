const { executeQuery } = require("../../utils");
const { getDataTanamanByID } = require("../Query");

const getGetDatatanamanById = async (req, res, next) => {
  try {
    if (!req.query) {
      return res.status(400).json({ success: false, message: "error" });
    }
    const data = await executeQuery(getDataTanamanByID, [parseInt(req.query.id)])
    return res.status(200).json({
        success: true,
        message: "success get data",
        data : data[0]
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = getGetDatatanamanById;
