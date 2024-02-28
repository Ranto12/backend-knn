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
        hama
     } = req.body;
     const hamaIds = req.body.hama.slice(', ').map(item => parseInt(item));
    const dataRecomendation = await executeQuery(getDataRekomendation, [[...hamaIds]])

    function hitungKesamaan(arr1, arr2) {
      const kesamaan = arr1.filter(item => arr2.includes(item));
      return kesamaan.length;
  }
  const nilai = [];
    dataRecomendation.forEach((recomendation, index) => {
      const LengthSamehama = hitungKesamaan(hama, recomendation.hama_ids.split(",").map(Number))
      const {
        nitrogen: recomNitrogen,
        fosfor: recomFosfor,
        kalium: recomKalium,
        temperature: recomTemperature,
        humadity: recomHumadity,
        rainfall: recomRainfall,
        ph: recomPh,
      } = recomendation;
      const hasilPerhitungan = Math.sqrt(
        (recomNitrogen - nitrogen) ** 2 
        +
        (recomFosfor - fosfor) ** 2 
        +
        (recomKalium - kalium) ** 2 
        +
        (recomTemperature - temperature) ** 2 
        +
        (recomHumadity - humadity) ** 2 
        +
        (recomRainfall - rainfall) ** 2 
        +
        (recomPh - ph) ** 2 
        +
        (LengthSamehama - hama.length) ** 2
    );
    nilai.push({
      ...recomendation,
      LengthSamehama,
      hasilPerhitungan: hasilPerhitungan,
    })
    });

    nilai.sort((a, b) => a.hasilPerhitungan - b.hasilPerhitungan);

    const limaDataTerkecil = nilai.slice(0, 5);

    return res.status(201).json({
        success: true,
        status: "success get data",
        totalData: limaDataTerkecil.length,
        data: limaDataTerkecil
    })
    
  } catch (error) {
        console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = Recomendation;