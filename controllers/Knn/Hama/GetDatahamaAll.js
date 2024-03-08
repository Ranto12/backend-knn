const { executeQuery } = require("../../utils");
const { getAllHama, GetLengthHama } = require("../Query");

const GetAllhama = async (req, res) => {
  const {limit, offset, search} = req.query
  try {
    if(!req.query){
      return res
      .status(400)
      .json({ success: false, message: "error" });
    }
    const data = await executeQuery(getAllHama, [`%${search}%`, parseInt(limit), parseInt(offset)]);
    const lengthHama = await executeQuery(GetLengthHama, [`%${search}%`])
    res.status(200).json({
      success: true,
      massage: "succes get data",
      totalData: lengthHama[0].total_data,
      data
    })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = GetAllhama;