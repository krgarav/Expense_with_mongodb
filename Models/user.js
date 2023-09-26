const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ispremiumuser: {
        type: Boolean
    },
    totalExpense: {
        type: Number
    },
    forgotpasswordrequestId: {
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);
// const Sequelize = require("sequelize");
// const sequelize = require("../Util/database");

// const User = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     ispremiumuser: {
//         type: Sequelize.BOOLEAN,
//     },
//     totalExpense: Sequelize.INTEGER,

// });

// module.exports = User;