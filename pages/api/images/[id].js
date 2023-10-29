import { apiHandler, imagesRepo } from 'helpers/api';


export default apiHandler({
    get: getById
});



async function getById(req, res) {
    const images = await imagesRepo.getById(req.query.id);

    if (!images) throw 'Image Not Found';

    return res.status(200).json(images);
}
