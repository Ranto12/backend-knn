const UploadFileExel = require("./UploadFile");
const CreateDataRekomendation = require("./CreateDataRekomendation");
const EditDataRekomendation = require('./EditDataRekomendation');
const DeleteDataRekomendation = require('./DeleteDataRekomendation');
const getDatarekomendasiAll = require('./GetDataRekomendasiAll');
const getDatarekomendasiById = require('./getDatarekomendasiById');
const CreateDataHama = require('./Hama/Createhama')
const UpdateDataHama = require('./Hama/UpdateHama')
const DeleteDataHama = require('./Hama/Deletehama')
const GetAllhama = require('./Hama/GetDatahamaAll')
const GetDataById = require('./Hama/GetDataById')

module.exports = {
  UploadFileExel,
  CreateDataRekomendation,
  EditDataRekomendation,
  DeleteDataRekomendation,
  getDatarekomendasiById,
  getDatarekomendasiAll,
  CreateDataHama,
  UpdateDataHama,
  DeleteDataHama,
  GetAllhama,
  GetDataById
};
