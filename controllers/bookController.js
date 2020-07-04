var _ = require("lodash");
const bookModel = require("../models/bookModel");
const command = require("../command");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.list = async (req, res) => {
    if (req.query.userId) {
        let row = await bookModel.findOne({ _id: req.query.userId });
        return req.returnTemplate(row, "", 200);
    } else {
        let row = await bookModel.find().select({ name: 1, _id: 1 });
        return req.returnTemplate(row, "", 200);
    }
};

exports.create = async (req, res) => {
    let payload = req.body;
    var new_bookModel = new bookModel(payload);
    let row = await new_bookModel.save();
    return req.returnTemplate(row, "Creating a book");
};

exports.getById = async (req, res) => {
    let row = await bookModel.find({ _id: req.params.id });
    // bookModel.find({ _id: req.params.id }, (err, row) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   }
    //   res.status(200).json(row);
    // });
    return req.returnTemplate(row, "");
};

exports.update = async (req, res) => {
    bookModel.findOneAndUpdate(
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
    bookModel.remove({ _id: req.params.id }, (err, Category) => {
        if (err) {
            return req.returnTemplate([], err, 404);
        }
        return req.returnTemplate([], "başarı ile silinmiştir");
    });
};

// async function getAltUserId(array, id) {
//     let row = await bookModel.find({ _id: id })
//     for (let index = 0; index < row[0].Ast.length; index++) {
//         const AstElement = row[0].Ast[index];
//       //  //console.log(AstElement.toString())
//         array.push(AstElement.toString())
//         await getAltUserId(array, AstElement)
//     }
// }

async function getAltUserId(array, id) {
    let row = await bookModel.find({ Ust: id });

    for (let index = 0; index < row.length; index++) {
        const AstElement = row[index]._id;
        //  //console.log(AstElement.toString())
        array.push(AstElement.toString());
        await getAltUserId(array, AstElement);
    }
}
exports.getAltUserId = getAltUserId;

exports.getAllAstUserList = async (req, res) => {
    ////console.log(req.TokenUser);
    var array = [];
    //array.push(req.TokenUser.id)
    await getAltUserId(array, req.TokenUser.id);
    //console.log(array)
    return req.returnTemplate(array, "", 200);
};

/**
 * Admin kullanicinin su bilgilerini degistirebilir:
 *      - active
 *      - role
 *
 */
exports.updateUserByAdmin = async (req, res) => {
    var updateValues = {};

    if (req.body.user.active) {
        updateValues["active"] = req.body.user.active;
    }
    if (req.body.user.role) {
        updateValues["role"] = req.body.user.role;
    }
    var user = await bookModel.findById(req.body.user.id);
    if (user) {
        user.role = req.body.user.role;
        user.active = req.body.user.active;
    }
    user.save((err, u) => {
        if (err) {
            return req.returnTemplate([], err, 500);
        }
        return req.returnTemplate(u, "");
    });
};
