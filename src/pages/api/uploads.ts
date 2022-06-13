import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { ApiResponse } from '../../types/apiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<string[], string>;

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 6 },
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  /*fileFilter: (req, file, cb) => {
    const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
    cb(null, acceptFile);
  },*/
});

const apiRoute = nextConnect({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  console.log(req.body.email);
  console.log(req.files[0].filename);
  const uploadedFileName = req.files[0].filename;
  const filenames = fs.readdirSync(outputFolderName);
  const images = filenames.map((name) => {
    if (name === uploadedFileName) {
      fs.rename(
        './public/uploads/' + name,
        `./public/uploads/${req.body.email}.${uploadedFileName.split('.')[1].toLowerCase()}`,
        (error) => {
          if (error) console.log(error);
        }
      );
    }
    if (name.slice(0, -3) === req.body.email) {
      fs.unlinkSync('./public/uploads/' + name);
      fs.rename(
        './public/uploads/' + uploadedFileName,
        `./public/uploads/${req.body.email}.${uploadedFileName.split('.')[1].toLowerCase()}`,
        (error) => {
          if (error) console.log(error);
        }
      );
    }
    return name;
  });
  const email: string[] = [req.body.email];
  const data = { ...images, ...email };
  res.status(200).json({
    data: data,
  });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
