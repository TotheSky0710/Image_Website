import { apiHandler, imagesRepo } from 'helpers/api';

export default apiHandler({
    delete: _delete
});

async function _delete(req, res) {
    await imagesRepo.delete(req.query.id);
    return res.status(200).json({});
}
