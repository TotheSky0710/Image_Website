import { db, base64ToFile } from 'helpers/api';

const Category = db.Category;

export const categoriesRepo = {
    getAll,
    getAllWithImageCounts,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Category.find();
}

async function getAllWithImageCounts() {
    const response = await Category.aggregate([
        {
            $lookup: {
                from: 'images', // The name of the image collection
                localField: '_id',
                foreignField: 'category',
                as: 'imageCount'
            }
        },
        {
            $project: {
                _id: 1,
                categoryName: 1,
                categorySlug: 1,
                imgContent: 1,
                imageCount: { $size: '$imageCount' }
            }
        }
    ]);
    return response;
}

async function getById(id) {
    return await Category.findById(id);
}

async function create(params) {
    // validate
    if (await Category.findOne({ categoryName: params.categoryName })) {
        throw 'Category Name "' + params.categoryName + '" is already taken';
    }

    const path = base64ToFile(params.imgContent);
    const category = new Category({
        categoryName: params.categoryName,
        categorySlug: params.categorySlug,
        imgContent: path
    });

    // save user
    await category.save();
}

async function update(id, params) {
    const category = await Category.findById(id);

    // validate
    if (!category) throw 'Category not found';
    if (category.categoryName !== params.categoryName && await Category.findOne({ categoryName: params.categoryName })) {
        throw 'Categoryname "' + params.categoryName + '" is already taken';
    }

    // copy params properties to user
    const path = base64ToFile(params.imgContent);
    const updatedCategory = {
        categoryName: params.categoryName,
        categorySlug: params.categorySlug,
        imgContent: path
    }
    Object.assign(category, updatedCategory);
    await category.save();
}

async function _delete(id) {
   await Category.findByIdAndRemove(id);
}
