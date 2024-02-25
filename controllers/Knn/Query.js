const getDataIdTanaman = `select plant_id from tanaman where nama_tanaman= ?;`;
const insertRekomendasiQuery = `INSERT INTO Rekomendasi (nitrogen, fosfor, kalium, temperature, rainfall, ph, plant_id, humadity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
const insertRekomendasiHama = `INSERT INTO Rekomendasi_Hama (rekomendasi_id, hama_id) VALUES (?, ?)`;
const getDatahamaId = `select hama_id FROM hama where nama_hama = ?;`;
const getDatahamaIdByeId = `select hama_id FROM hama where hama_id = ?;`;
const createDatahama = `INSERT INTO Hama (nama_hama) VALUES (?)`;
const updateDataHama = `UPDATE Hama SET nama_hama = ? WHERE hama_id = ?`;
const createDataTanaman = `INSERT INTO Tanaman (nama_tanaman) VALUES (?)`;
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

const getAllHama = `select * from hama
where
    nama_hama LIKE ?
limit ? offset ?;`;
const getHamaById = `select * from hama where hama_id = ?`;
const deleteRekomendasi = "DELETE FROM Rekomendasi WHERE rekomendasi_id = ?";
const getbyIdRekomendasi = "SELECT * FROM Rekomendasi WHERE rekomendasi_id = ?";

const updateRekomendasiQuery = `UPDATE Rekomendasi SET nitrogen = ?, fosfor = ?, kalium = ?, temperature = ?, rainfall = ?, ph = ?, plant_id = ?, humadity = ? WHERE rekomendasi_id = ?`;

const DeleteRekomendasiHama = `DELETE FROM rekomendasi_hama WHERE rekomendasi_id = ?`;
const Deletehama = `DELETE FROM hama WHERE hama_id = ?;`;

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
  getHamaById
};
