const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SchemaModel = new Schema(
    {
        name: { type: String, required: true },
        active: { type: Boolean, default: false },
        books: {
            past:[ {
                type: Schema.Types.ObjectId,
                ref: "bookHistory", 
            }],
            present:[ {
              type: Schema.Types.ObjectId,
              ref: "book", 
          }]
        },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("user", SchemaModel);
