import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve(); // vì ESM không có sẵn __dirname

// Đảm bảo thư mục upload tồn tại
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file Excel (.xlsx hoặc .xls)!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
