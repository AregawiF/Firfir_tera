import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: '/home/anatoli/Web Dev Course/webv3/firfir_tera-auth-and-feature/uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    },
  }),
};
