const Expense = require("../Models/expense");
const S3services = require("../Services/s3services");
const Expensedownload = require("../Models/downloadexpense");
const mongodb = require("mongodb");

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

exports.postExpense = async (req, res, next) => {
    const { quantity, description, category } = req.body;


    const postData = async () => {
        try {
            const date = new Date();
            const formattedDate = formatDate(date);
            const totalAmount = req.user.totalExpense += +quantity;
            const expense = new Expense({ amount: quantity, description, category, userId: req.user, createdAt: formattedDate });
            await expense.save();
            req.user.totalExpense = totalAmount;
            await req.user.save();

            res.status(200).json({ message: "Expense Created" });
        } catch (err) {

            res.status(500).json({ err: err })
            console.log(err);
        }
    }
    postData();
};
exports.getExpensesCount = async (req, res) => {
    const count = req.params.count;
    const expenses = await Expense.find({ userId: req.user._id });
    const length = Math.ceil(+expenses.length / count);

    res.status(200).json({ pages: length });
}
exports.getExpenses = (req, res) => {

    const limit = +req.query.e;
    const row = +req.query.row;

    const getData = async () => {
        const arr = [];
        let endingValue;
        let initialValue;
        const expenses = await Expense.find({ userId: req.user._id });
        initialValue = (limit - 1) * row;;
        endingValue = limit * row;
        for (let i = initialValue; i < endingValue; i++) {
            if (expenses[i] !== undefined) {
                arr.push(expenses[i]);
            }
        }
        res.status(201).json(arr);
    }
    getData();
}

exports.getAllExpenses = async (req, res) => {
    const expenses = await Expense.find({ userId: req.user._id });
    res.status(200).json(expenses)
}
exports.deleteExpense = (req, res) => {
    const expenseId = req.params.expenseId;
    const deleteExpense = async () => {

        try {
            const toBeDeletedExpense = await Expense.findByIdAndRemove({ _id: expenseId });
            const amount = req.user.totalExpense - +toBeDeletedExpense.amount;
            req.user.totalExpense = amount;
            await req.user.save();
            res.status(200).json({ message: "Expense deleted" });
        } catch (err) {
            res.status(500).json({ err: err });
            console.log(err)
        }
    }
    deleteExpense();
}

exports.downloadExpense = async (req, res) => {
    try {
        const date = new Date();
        const formattedDate = formatDate(date);
        const expenses = await Expense.find({ userId: req.user._id });
        const stringifiedExpenses = JSON.stringify(expenses);
        const userId = req.user._id;
        const fileName = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3services.uploadToS3(stringifiedExpenses, fileName);
        const expense = new Expensedownload({ url: fileURL, userId: req.user, createdAt: formattedDate });
        await expense.save();
        res.status(200).json({ fileURL: fileURL, success: true })
    } catch (err) {
        res.status(401).json({ success: false })
    }
}
exports.allDownloadedExpenses = async (req, res) => {
    try {
        const allDownloadedExpenses = await Expensedownload.find({ userId: req.user._id });
        res.status(200).json({ data: allDownloadedExpenses, success: true });
    } catch (err) {
        console.log(err);
    }
}