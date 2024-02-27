// tanaman 
const getDataIdTanaman = `select plant_id from tanaman where nama_tanaman= ?;`;
const createDataTanaman = `INSERT INTO Tanaman (nama_tanaman) VALUES (?)`;
const updateDataTanaman = `UPDATE tanaman SET nama_tanaman = ? WHERE plant_id = ?`;
const getDataTanamanById = `select * from tanaman where nama_tanaman = ? `;
const getDataTanamanByID = `select * from tanaman where plant_id = ? `;
const getDataTanamanAll = `select * from tanaman
where nama_tanaman LIKE ?
order by
    plant_id desc
limit  ?
offset  ?`;
const deleteTanaman = `DELETE FROM tanaman WHERE plant_id = ?`;

// hama 
const getDatahamaId = `select hama_id FROM hama where nama_hama = ?;`;
const getDatahamaIdByeId = `select hama_id FROM hama where hama_id = ?;`;
const createDatahama = `INSERT INTO Hama (nama_hama) VALUES (?)`;
const updateDataHama = `UPDATE Hama SET nama_hama = ? WHERE hama_id = ?`;
const getAllHama = `select * from hama
where
    nama_hama LIKE ?
limit ? offset ?;`;
const getHamaById = `select * from hama where hama_id = ?`;
const Deletehama = `DELETE FROM hama WHERE hama_id = ?;`;

// rekomendasi 
const GetRekomendasiByPlantId = `select rekomendasi_id from rekomendasi where plant_id = ?`;
const GetRekomendasiByHamaId = `select rekomendasi_id from rekomendasi_hama where hama_id = ?`;
const insertRekomendasiQuery = `INSERT INTO Rekomendasi (nitrogen, fosfor, kalium, temperature, rainfall, ph, plant_id, humadity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
const getAllDataRekomendasi = `SELECT
    r.rekomendasi_id,
    r.nitrogen,
    r.fosfor,
    r.kalium,
    r.temperature,
    r.humadity,
    r.rainfall,
    r.ph,
    t.plant_id,
    t.nama_tanaman,
GROUP_CONCAT(h.hama_id) AS hama_ids,
GROUP_CONCAT(h.nama_hama) AS nama_hama
FROM
    Rekomendasi r
JOIN
Tanaman t ON r.plant_id = t.plant_id
LEFT JOIN
    Rekomendasi_Hama rh ON r.rekomendasi_id = rh.rekomendasi_id
LEFT JOIN
    Hama h ON rh.hama_id = h.hama_id
WHERE
    t.nama_tanaman LIKE ? OR
    h.nama_hama LIKE ?
GROUP BY
    r.rekomendasi_id
order by
    r.rekomendasi_id desc
limit ?
offset ?`;
const getDataRekomendasiById = `SELECT
r.rekomendasi_id,
r.nitrogen,
r.fosfor,
r.kalium,
r.temperature,
r.humadity,
r.rainfall,
r.ph,
t.plant_id,
t.nama_tanaman,
GROUP_CONCAT(h.hama_id) AS hama_ids,
GROUP_CONCAT(h.nama_hama) AS nama_hama
FROM
Rekomendasi r
JOIN
Tanaman t ON r.plant_id = t.plant_id
LEFT JOIN
Rekomendasi_Hama rh ON r.rekomendasi_id = rh.rekomendasi_id
LEFT JOIN
Hama h ON rh.hama_id = h.hama_id
where r.rekomendasi_id = ?
GROUP BY
r.rekomendasi_id;`;
const deleteRekomendasi = "DELETE FROM Rekomendasi WHERE rekomendasi_id = ?";
const getbyIdRekomendasi = "SELECT * FROM Rekomendasi WHERE rekomendasi_id = ?";
const updateRekomendasiQuery = `UPDATE Rekomendasi SET nitrogen = ?, fosfor = ?, kalium = ?, temperature = ?, rainfall = ?, ph = ?, plant_id = ?, humadity = ? WHERE rekomendasi_id = ?`;

// rekomendasi hama 
const DeleteRekomendasiHama = `DELETE FROM rekomendasi_hama WHERE rekomendasi_id = ?`;
const insertRekomendasiHama = `INSERT INTO Rekomendasi_Hama (rekomendasi_id, hama_id) VALUES (?, ?)`;


// rekomendation 
const getDataRekomendation = ` SELECT
r.rekomendasi_id,
r.nitrogen,
r.fosfor,
r.kalium,
r.temperature,
r.humadity,
r.rainfall,
r.ph,
t.plant_id,
t.nama_tanaman,
GROUP_CONCAT(h.hama_id) AS hama_ids,
GROUP_CONCAT(h.nama_hama) AS nama_hama
FROM
Rekomendasi r
JOIN
Tanaman t ON r.plant_id = t.plant_id
LEFT JOIN
Rekomendasi_Hama rh ON r.rekomendasi_id = rh.rekomendasi_id
LEFT JOIN
Hama h ON rh.hama_id = h.hama_id
WHERE
EXISTS (
    SELECT 1
    FROM Rekomendasi_Hama rh_inner
    WHERE rh_inner.rekomendasi_id = r.rekomendasi_id
    AND rh_inner.hama_id IN (?)
)
GROUP BY
r.rekomendasi_id`

module.exports = {
  getDataIdTanaman,
  insertRekomendasiQuery,
  insertRekomendasiHama,
  getDatahamaId,
  createDatahama,
  createDataTanaman,
  getAllDataRekomendasi,
  deleteRekomendasi,
  getbyIdRekomendasi,
  updateRekomendasiQuery,
  DeleteRekomendasiHama,
  getDataRekomendasiById,
  updateDataHama,
  getDatahamaIdByeId,
  Deletehama,
  getAllHama,
  getHamaById,
  getDataTanamanById,
  getDataTanamanAll,
  updateDataTanaman,
  getDataTanamanByID,
  GetRekomendasiByPlantId,
  deleteTanaman,
  GetRekomendasiByHamaId,
  getDataRekomendation
};
