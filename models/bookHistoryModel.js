const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SchemaModel = new Schema(
    {
        userId:  { type: Schema.Types.ObjectId, ref: 'user',required: true  },
        bookId:  { type: Schema.Types.ObjectId, ref: 'book' ,required: true },
        score: { type: Number, default: 0 }
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("bookHistory", SchemaModel);
