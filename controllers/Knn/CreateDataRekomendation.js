const { executeQuery, getLastInsertedId } = require("../utils");
const { getDataIdTanaman, insertRekomendasiQuery, insertRekomendasiHama, getDatahamaId, createDatahama, createDataTanaman } = require("./Query");

const CreateDataRekomendation = async (req, res) => {
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
      tanaman,
      namaHama,
    } = req.body;
    let IdTanaman = await executeQuery(getDataIdTanaman, [`${tanaman}`]);
    if (IdTanaman.length === 0) {
      await executeQuery(createDataTanaman, [namaTanaman]);
      const DataIdTanaman = await getLastInsertedId();
      await executeQuery(insertRekomendasiQuery, [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        rainfall,
        ph,
        DataIdTanaman,
        humadity,
      ]);
    } else {
      await executeQuery(insertRekomendasiQuery, [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        rainfall,
        ph,
        IdTanaman.map((_id) => _id.plant_id),
        humadity,
      ]);
    }
    const rekomendasiId = await getLastInsertedId();
    const semuHama = namaHama.split(", ");
    for (const hama of semuHama) {
      let idHama = await executeQuery(getDatahamaId, [`${hama}`]);
      if (idHama.length === 0) {
        await executeQuery(createDatahama, [hama]);
        const dataId = await getLastInsertedId();
        await executeQuery(insertRekomendasiHama, [rekomendasiId, dataId]);
      } else {
        await executeQuery(insertRekomendasiHama, [
          rekomendasiId,
          idHama[0].hama_id,
        ]);
      }
    }
    return res.json({
      success: true,
      message: "Data inserted successfully.",
      rekomendasiId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = CreateDataRekomendation;
