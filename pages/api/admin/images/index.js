import { apiHandler, imagesRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const images = await imagesRepo.getAll();
    return res.status(200).json(images);
}
