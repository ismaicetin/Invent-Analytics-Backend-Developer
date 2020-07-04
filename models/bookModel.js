const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SchemaModel = new Schema(
    {
        name: { type: String, required: true },
        active: { type: Boolean, default: true },
        score: { type: Number, default: 10 },
        borrowCount: { type: Number, default: 1 },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("book", SchemaModel);
