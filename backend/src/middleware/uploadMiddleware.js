import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only! Please upload jpg, jpeg, png, or webp files."));
  }
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;