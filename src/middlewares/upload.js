import multer from 'multer';
import path from 'path';
import slugify from 'slugify';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './objects');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);

//     const sanitizedFilename = slugify(file.originalname, {
//       replacement: '-',
//       remove: /[*+~.()'"!:@]/g,
//       lower: true,
//     });

//     const timestamp = Date.now();
//     const filename = `${sanitizedFilename}-${timestamp}${ext}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage });

// export default upload;

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './objects');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const sanitizedFilename = slugify(file.originalname, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });

    const timestamp = Date.now();
    const filename = `${sanitizedFilename}-${timestamp}-${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: multerStorage,
  // limits: { fileSize: 3 * 1024 * 1024 },
});

const uploadFiles = upload.array('files');

export default uploadFiles;
