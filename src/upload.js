import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { createBrotliCompress } from 'zlib';

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESSKEY,
  secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
  region: 'ap-northeast-2'
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'shsongram',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});
export const uploadMiddleware = upload.single('file');
export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
};
