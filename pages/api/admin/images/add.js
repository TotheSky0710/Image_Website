import { apiHandler, imagesRepo } from 'helpers/api';

export default apiHandler({
    post: add
});

async function add(req, res) {
    const addedImage = await imagesRepo.create(req.body);
    return res.status(200).json(addedImage);
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}