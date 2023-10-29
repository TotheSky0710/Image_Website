import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    get: getAllWithImageCounts
});

async function getAllWithImageCounts(req, res) {
    const categories = await categoriesRepo.getAllWithImageCounts();
    return res.status(200).json(categories);
}
