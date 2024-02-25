const UploadFileExel = require("./UploadFile");
const CreateDataRekomendation = require("./CreateDataRekomendation");
const EditDataRekomendation = require('./EditDataRekomendation');
const DeleteDataRekomendation = require('./DeleteDataRekomendation');
const getDatarekomendasiAll = require('./GetDataRekomendasiAll');
const getDatarekomendasiById = require('./getDatarekomendasiById');

module.exports = {
  UploadFileExel,
  CreateDataRekomendation,
  EditDataRekomendation,
  DeleteDataRekomendation,
  getDatarekomendasiById,
  getDatarekomendasiAll,
};
