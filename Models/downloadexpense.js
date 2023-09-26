const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloadexpenseSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Downloadexpense", downloadexpenseSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../Util/database");

// const Expensedownload = sequelize.define('expensesdownload', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     url: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }

// });

// module.exports = Expensedownload;