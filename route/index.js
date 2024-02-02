const express = require('express');
const {Register, Base, LoginLaman, getuserAll, Logout} = require('../controllers/User');
const verifyToken = require('../middleware/verifyToken');
const { UploadFileExel, CreateDataRekomendation, EditDataRekomendation, DeleteDataRekomendation, getDatarekomendasiById, getDatarekomendasiAll } = require('../controllers/Knn');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.get('/users', verifyToken, getuserAll)
router.post('/register', Register)
router.post('/login', LoginLaman)
router.post('/logout',verifyToken, Logout)

router.post('/file',upload.single('file'),verifyToken, UploadFileExel)
router.post('/createRecomendation',verifyToken, CreateDataRekomendation)
router.post('/updateRecomendation',verifyToken, EditDataRekomendation)
router.post('/deleteRekomendation',verifyToken, DeleteDataRekomendation)
router.get('/getDatarekomendasiByid',verifyToken, getDatarekomendasiById)
router.get('/getAllDataRekomendasi',verifyToken, getDatarekomendasiAll)


module.exports = router;