import multer from 'multer';
import path from 'path';

// مجلد تخزين الصور مؤقتاً
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // تأكد أن المجلد موجود أو أنشئه
  },
  filename: function (req, file, cb) {
    // تعيين اسم فريد للملف
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

export default upload;
