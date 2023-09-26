const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgotpasswordSchema = new Schema({
    isActive: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

});

module.exports = mongoose.model("Forgotpassword", forgotpasswordSchema);


// const Sequelize = require("sequelize");
// const sequelize = require("../Util/database");
// const { v4: uuidv4 } = require('uuid');


// const Forgotpassword = sequelize.define('forgotpasswordrequests', {
//     id: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         defaultValue: uuidv4,
//     },

//     userId: Sequelize.INTEGER,
//     isActive: Sequelize.BOOLEAN
// });

// module.exports = Forgotpassword;