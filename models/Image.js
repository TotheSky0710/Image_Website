import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName       : { type: String, unique: true, required: true },
    imageAltTag     : { type: String, required: true },
    imgContent      : { type: String, required: true },
    category        : { type: Schema.ObjectId, ref: 'Category', required: true }
});

ImageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

export const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

