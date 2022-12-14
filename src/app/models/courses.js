const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//ADD global plugins
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Courses', course);
