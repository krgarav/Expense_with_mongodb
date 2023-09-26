const Razorpay = require("razorpay");
const Order = require("../Models/order");
const User = require("../Models/user");

const purchasePremium = async (req, res) => {
    try {
        let rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            const sendResponse = async () => {

                const newOrder = new Order({ orderid: order.id, status: "PENDING", userId: req.user });
                await newOrder.save();
                return res.status(201).json({ order, key_id: rzp.key_id })
            }
            sendResponse();
        })
    } catch (err) {
        console.log(err)
    }
}

const updateStatus = async (req, res) => {

    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ orderid: order_id });
        order.paymentid = payment_id;
        order.status = "SUCCESSFULL";
        req.user.ispremiumuser = true;
        await order.save();
        await req.user.save();
        return res.status(201).json({ success: true, message: "Transaction Successfull" });

    } catch (err) {
        console.log(err);
    }
}

const showLeaderBoard = async (req, res) => {
    try {
        const leaderBoardOfUsers = await User.find()
        res.json(leaderBoardOfUsers)
    } catch (err) {
        console.log(err)
    }
}
module.exports = { purchasePremium, updateStatus, showLeaderBoard };