import { db, base64ToFile } from 'helpers/api';
import mongoose from 'mongoose';

const Image = db.Image;

export const imagesRepo = {
    getAll,
    create,
    getById,
    download,
    delete: _delete
};

async function getAll(params) {
    const query = {};
    if (params.q !== '') {
        query.imageName = { $regex: params.q, $options: 'i' };
    }
    if (params.category_id) {
        query.category = params.category_id;
    }
    return await Image.find(query)
        .populate('category')
        .sort({ updatedAt: -1 });
}

async function getById(id) {
    return await Image.findById(id).populate('category');
}

async function download(id) {
    try {
        await Image.updateOne({ _id: id }, { $inc: { downloadCounts: 1 } });
    } catch (error) {
        console.log(error);
    }
}

async function create(params) {
    // validate
    if (await Image.findOne({ imageName: params.imageName })) {
        throw 'Image Name "' + params.imageName + '" is already taken';
    }
    
    const path = base64ToFile(params.imgContent);
    const image = new Image({
        imageName: params.imageName,
        imageAltTag: params.imageAltTag,
        imgContent: path,
        category: new mongoose.Types.ObjectId(params.category)
    });

    // save user
    await image.save();

    return await Image.findOne({ imageName: params.imageName });
}

async function _delete(id) {
    await Image.findByIdAndRemove(id);
 }
 