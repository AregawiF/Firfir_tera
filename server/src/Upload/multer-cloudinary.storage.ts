import { diskStorage } from 'multer';
import { extname } from 'path';

export default diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/uploads/'); // Temporary directory for Multer to store the uploaded file
  },
  filename: (req, file, cb) => {
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${randomName}${extname(file.originalname)}`); 
  },
});