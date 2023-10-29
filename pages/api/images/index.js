import { apiHandler, imagesRepo } from 'helpers/api';

export default apiHandler({
    post: getAll
});

async function getAll(req, res) {
    const images = await imagesRepo.getAll(req.body);
    return res.status(200).json(images);
}
