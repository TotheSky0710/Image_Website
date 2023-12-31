import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: { type: String, unique: true, required: true },
    categorySlug: { type: String, required: true },
    imgContent  : { type: String, required: true },
    images      : [{ type: Schema.ObjectId, ref: 'Category', required: true }]
}, {
    // add createdAt and updatedAt timestamps
    timestamps: true
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
