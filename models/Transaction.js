const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    sold: { type: Boolean, required: true },
    dateOfSale: { 
        type: Date, 
        required: true,
        set: (val) => {
            const date = new Date(val);
            if (isNaN(date.getTime())) {
                throw new Error(`Invalid date: ${val}`);
            }
            return date;
        }
    }
    });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
