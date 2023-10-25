import { db } from 'helpers/api';
import mongoose from 'mongoose';

const Image = db.Image;

export const imagesRepo = {
    getAll,
    create,
};

async function getAll() {
    return await Image.find({})
        .populate('category');
}

async function create(params) {
    // validate
    if (await Image.findOne({ imageName: params.imageName })) {
        throw 'Image Name "' + params.imageName + '" is already taken';
    }
    const image = new Image({
        imageName: params.imageName,
        imageAltTag: params.imageAltTag,
        imgContent: params.imgContent,
        category: new mongoose.Types.ObjectId(params.category)
    });

    // save user
    await image.save();

    return await Image.findOne({ imageName: params.imageName });
}
