const express = require('express');
const multer = require('multer');
const {Register, LoginLaman, getuserAll, Logout} = require('../controllers/User');
const verifyToken = require('../middleware/verifyToken');
const { UploadFileExel, CreateDataRekomendation, EditDataRekomendation, DeleteDataRekomendation, getDatarekomendasiById, getDatarekomendasiAll, CreateDataHama, UpdateDataHama, DeleteDataHama, GetAllhama, GetDataById, CreateTanaman, UpdateDataTanaman, GetAllTanaman, GetDataTanamanById, DeleteDataTanaman, Recomendation } = require('../controllers/Knn');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/users', verifyToken, getuserAll);
router.post('/register', Register);
router.post('/login', LoginLaman);
router.post('/logout',verifyToken, Logout);

router.post('/file',upload.single('file'),verifyToken, UploadFileExel);
router.post('/createRecomendation',verifyToken, CreateDataRekomendation);
router.post('/updateRecomendation',verifyToken, EditDataRekomendation);
router.post('/deleteRekomendation',verifyToken, DeleteDataRekomendation);
router.get('/getDatarekomendasiByid',verifyToken, getDatarekomendasiById);
router.get('/getAllDataRekomendasi',verifyToken, getDatarekomendasiAll);

// hama 
router.post('/createDataHama',verifyToken, CreateDataHama);
router.post('/updateDataHama',verifyToken, UpdateDataHama);
router.post('/DeleteDataHama',verifyToken, DeleteDataHama);
router.get('/getAllDataHama',verifyToken, GetAllhama);
router.get('/getGetDataById',verifyToken, GetDataById);

// tanaman 
router.post('/createTanamam', verifyToken, CreateTanaman)
router.post('/updateDataTanaman', verifyToken, UpdateDataTanaman)
router.get('/getAllDataTanaman', verifyToken, GetAllTanaman)
router.get('/getDataTanamanById', verifyToken, GetDataTanamanById)
router.post('/deleteTanaman', verifyToken, DeleteDataTanaman)


// rekomendation 
router.post('/Recomendation', verifyToken, Recomendation)


module.exports = router;