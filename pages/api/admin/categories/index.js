import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const categories = await categoriesRepo.getAll();
    return res.status(200).json(categories);
}
