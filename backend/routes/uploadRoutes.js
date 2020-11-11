import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  // cb: call back
  destination(req, file, cb) {
    // null for error
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    // use "path" to grab file extension (.jpg and .png etc.)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// use regex to test if the file is an image
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // every file has a mime type (e.g. image/jpeg)
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    // if not an image, call back with error message
    cb('Images Only!')
  }
}

// multer can upload all types of files
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// pass in "upload.single()" as a middleware
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
