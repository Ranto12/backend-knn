const { executeQuery } = require("../utils");
const { getAllDataRekomendasi, GetLengthRekomendasi } = require("./Query");
const getDatarekomendasiAll = async (req, res) => {
  const {limit, offset, search} = req.query
  try {
    if(!req.query){
      return res
      .status(400)
      .json({ success: false, message: "error" });
    }
    const data = await executeQuery(getAllDataRekomendasi, [`%${search}%`, parseInt(limit), parseInt(offset)]);
    const GetdataLength = await executeQuery(GetLengthRekomendasi)
    res.status(200).json({
      success: true,
      massage: "data ready",
      totalData: GetdataLength[0].totalData,
      data
    })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = getDatarekomendasiAll;