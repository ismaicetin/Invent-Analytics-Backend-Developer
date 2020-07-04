var _ = require("lodash");
const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const bookHistoryModel = require("../models/bookHistoryModel");
const command = require("../command");
var validator = require("validator");
const { populate } = require("../models/userModel");
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

exports.list = async (req, res) => {
    let row = await userModel.find().select({ name: 1, _id: 1 });
    return req.returnTemplate(row, "", 200);
};

exports.create = async (req, res) => {
    let payload = req.body;
    if (validator.isEmpty(payload.name)) {
        return req.returnTemplate([], "name is Empty", 500);
    }
    var new_userModel = new userModel(payload);
    let row = await new_userModel.save();
    return req.returnTemplate(row, "Creating a user");
};

exports.getById = async (req, res) => {
    let row = await userModel.find({ _id: req.params.id }).populate([
        {
            path: "books.past",
            model: "bookHistory",

            populate: [
                {
                    path: "userId",
                    select: ["name"],
                },
                {
                    path: "bookId",
                    select: ["name"],
                },
            ],
            // select: ["userId.name", "score"],
        },
        { path: "books.present", model: "book", select: ["name"] },
    ]);
    return req.returnTemplate(row, "");
};

exports.update = async (req, res) => {
    userModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, row) => {
            if (err) {
                return req.returnTemplate([], err, 500);
            }
            return req.returnTemplate(row, "");
        }
    );
};

exports.delete = async (req, res) => {
    userModel.remove({ _id: req.params.id }, (err, Category) => {
        if (err) {
            return req.returnTemplate([], err, 404);
        }
        return req.returnTemplate([], "başarı ile silinmiştir");
    });
};

exports.borrow = async (req, res) => {
    // if (!checkForHexRegExp.test(req.params.bookId) || !checkForHexRegExp.test(req.params.id)) {
    //     return req.returnTemplate([], "id Error ", 500);
    // }
    var { id, bookId } = req.params;
    if (!validator.isMongoId(bookId) || !validator.isMongoId(id)) {
        return req.returnTemplate([], "id Error ", 500);
    }

    let row = await bookModel.findOne({ _id: bookId, active: true });

    if (!row) {
        return req.returnTemplate(null, "No Content", 204);
    }
    if (row.errors) {
        return req.returnTemplate([], responseUserUpdate.errors, 500);
    }
    var responseUserUpdate = await userModel.findOneAndUpdate(
        { _id: id },
        { $push: { "books.present": bookId } }
    );
    if (responseUserUpdate.errors) {
        return req.returnTemplate([], responseUserUpdate.errors, 500);
    }
    var responseBookUpdate = await bookModel.findOneAndUpdate(
        { _id: bookId },
        { active: false, $inc: { borrowCount: 1 } }
    );
    return req.returnTemplate([], "User borrowed a book succesfully");
    //    console.log("us")

    // userModel.findOneAndUpdate(
    //     { _id: req.params.id },
    //     req.body,
    //     { new: true },
    //     (err, row) => {
    //         if (err) {
    //             return req.returnTemplate([], err, 500);
    //         }
    //         return req.returnTemplate(row, "");
    //     }
    // );
};

exports.return = async (req, res) => {
    var { id, bookId } = req.params;
    var { score } = req.body;
    if (!Number.isInteger(score)) {
        return req.returnTemplate([], "score Error ", 500);
    }

    if (!validator.isMongoId(bookId) || !validator.isMongoId(id)) {
        return req.returnTemplate([], "id Error ", 500);
    }

    let rowBook = await bookModel.findOne({ _id: bookId, active: false });
    let rowUser = await userModel.findOne({ _id: id });

    if (!rowBook || !rowUser) {
        return req.returnTemplate(null, "No Content", 204);
    }
    if (rowBook.errors || rowUser.errors) {
        return req.returnTemplate([], rowBook.errors, 500);
    }

    var new_bookHistoryData = {
        userId: rowUser._id,
        bookId: rowBook._id,
        score: score,
    };

    var new_bookHistoryModel = new bookHistoryModel(new_bookHistoryData);
    let rowbookHistoryModel = await new_bookHistoryModel.save();
    // return req.returnTemplate(row, "Creating a user");

    var responseUserUpdate = await userModel.findOneAndUpdate(
        { _id: id },
        {
            $pull: { "books.present": bookId },
            $push: { "books.past": rowbookHistoryModel._id },
        }
    );

    if (responseUserUpdate.errors) {
        return req.returnTemplate([], responseUserUpdate.errors, 500);
    }

    var newBookscore =
        (rowBook.score * (rowBook.borrowCount - 1) + score) /
        rowBook.borrowCount;
    var responseBookUpdate = await bookModel.findOneAndUpdate(
        { _id: bookId },
        { active: true, score: newBookscore }
    );

    return req.returnTemplate([], "User return a book succesfully");
};
