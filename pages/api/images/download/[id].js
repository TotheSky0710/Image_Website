import { apiHandler, imagesRepo } from 'helpers/api';

export default apiHandler({
    get: download
});

async function download(req, res) {
    await imagesRepo.download(req.query.id);

    return res.status(200).json({});
}
