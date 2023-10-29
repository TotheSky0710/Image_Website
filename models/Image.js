import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageName       : { type: String, unique: true, required: true },
    imageAltTag     : { type: String, required: true },
    imgContent      : { type: String, required: true },
    downloadCounts  : { type: Number, default: 0 },
    category        : { type: Schema.ObjectId, ref: 'Category', required: true }
}, {
    // add createdAt and updatedAt timestamps
    timestamps: true
});

ImageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

export const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

