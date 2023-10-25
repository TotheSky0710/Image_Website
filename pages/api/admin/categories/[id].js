import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const user = await categoriesRepo.getById(req.query.id);

    if (!user) throw 'User Not Found';

    return res.status(200).json(user);
}

async function update(req, res) {
    await categoriesRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await categoriesRepo.delete(req.query.id);
    return res.status(200).json({});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}