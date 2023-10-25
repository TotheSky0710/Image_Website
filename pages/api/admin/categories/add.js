import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    post: add
});

async function add(req, res) {
    await categoriesRepo.create(req.body);
    
    return res.status(200).json({});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}