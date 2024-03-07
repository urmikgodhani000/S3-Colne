import express from 'express';

import auth from '../middlewares/auth.js';
import {
  createFolder,
  createObject,
  deleteObject,
  getAllObjects,
  streamFile,
} from '../controllers/object.js';
import uploadFiles from '../middlewares/upload.js';

const router = express.Router();

router.use(auth);

router.route('/:parent_id').get(getAllObjects);
router.route('/:object_id').delete(deleteObject);

router.route('/folder').post(createFolder);
router.route('/file').post(uploadFiles, createObject);

router.route('/file/:file_id').get(streamFile);

export default router;
