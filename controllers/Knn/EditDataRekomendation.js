const { executeQuery, getLastInsertedId } = require("../utils");
const { getDataIdTanaman, createDataTanaman, updateRekomendasiQuery, getDatahamaId, createDatahama, DeleteRekomendasiHama, insertRekomendasiHama } = require("./Query");

const EditDataRekomendation = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "data kosong" });
    }
    const {
      id,
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
      await executeQuery(createDataTanaman, [tanaman]);
      const DataIdTanaman = await getLastInsertedId();
      await executeQuery(updateRekomendasiQuery, [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        rainfall,
        ph,
        DataIdTanaman,
        humadity,
        id,
      ]);
    } else {
      await executeQuery(updateRekomendasiQuery, [
        nitrogen,
        fosfor,
        kalium,
        temperature,
        rainfall,
        ph,
        IdTanaman.map((_id) => _id.plant_id),
        humadity,
        id,
      ]);
    }
    await executeQuery(DeleteRekomendasiHama, [id]);
    const semuHama = namaHama.split(", ")
    for (const hama of semuHama) {
      console.log("di eksekusi ")
      let idHama = await executeQuery(getDatahamaId, [`${hama}`]);
      if (idHama.length === 0) {
        await executeQuery(createDatahama, [hama]);
        const dataId = await getLastInsertedId();
        await executeQuery(insertRekomendasiHama, [id, dataId]);
      } else {
        await executeQuery(insertRekomendasiHama, [
          id,
          idHama[0].hama_id,
        ]);
      }
    }
    return res.status(200).json({
      success: true,
      message: "success update data",
      id,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = EditDataRekomendation;