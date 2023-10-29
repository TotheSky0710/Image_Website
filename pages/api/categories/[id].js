import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
});

async function getById(req, res) {
    const category = await categoriesRepo.getById(req.query.id);
    
    if (!category) throw 'Category Not Found';

    return res.status(200).json(category);
}
