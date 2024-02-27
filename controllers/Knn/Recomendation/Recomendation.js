const { executeQuery } = require("../../utils");
const { getDataRekomendation } = require("../Query");

const Recomendation = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Data kosong" });
    }
    const {
        nitrogen,
        fosfor,
        kalium,
        temperature,
        humadity,
        rainfall,
        ph,
        plant_id,
        hama
     } = req.body;
    const dataRecomendation = await executeQuery(getDataRekomendation, [req.body.hama])
    const hasil = [];

    function hitungKesamaan(arr1, arr2) {
      const kesamaan = arr1.filter(item => arr2.includes(item));
      return kesamaan.length;
  }
    dataRecomendation.forEach(recomendation => {
        const {
          nitrogen: recomNitrogen,
          fosfor: recomFosfor,
          kalium: recomKalium,
          temperature: recomTemperature,
          humadity: recomHumadity,
          rainfall: recomRainfall,
          ph: recomPh,
          hama_ids: recomhamaId,
          nama_hama: recomNamaHama
        } = recomendation;
        const LengthSamehama = hitungKesamaan(hama, recomhamaId.split(`,`))
        console.log(recomhamaId.slice(','))
    });
    
    

    return res.status(201).json({
        success: true,
        status: "success get data",
        totalData: dataRecomendation.length,
        cek: req.body,
        dataRecomendation, 
    })
    
  } catch (error) {
        console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = Recomendation;