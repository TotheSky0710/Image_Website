import { apiHandler } from 'helpers/api';
import fs, { createReadStream } from 'fs';
import {pipeline} from 'stream';

export default apiHandler({
    get: getById
});

async function getById(req, res) {
    const imgName = req.query.id;
    const imageFilePath = `public/uploads/${imgName}`;

    res.setHeader('Content-Type', 'image/jpg');
    const imageStream = createReadStream(imageFilePath);
    pipeline(imageStream, res, (error) => {
        if(error) console.log(error);
    });

}