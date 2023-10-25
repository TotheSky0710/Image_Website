import { db } from 'helpers/api';

const Category = db.Category;

export const categoriesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Category.find();
}

async function getById(id) {
    return await Category.findById(id);
}

async function create(params) {
    // validate
    if (await Category.findOne({ categoryName: params.categoryName })) {
        throw 'Username "' + params.categoryName + '" is already taken';
    }

    const category = new Category(params);

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
    Object.assign(category, params);
    await category.save();
}

async function _delete(id) {
   await Category.findByIdAndRemove(id);
}
