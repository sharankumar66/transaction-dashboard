const axios = require("axios");
const Transaction = require("../models/Transaction");

const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get(
            "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        );
        response.data.forEach(transaction => {
            if (isNaN(new Date(transaction.dateOfSale).getTime())) {
                console.log(`Invalid date found: ${transaction.dateOfSale}`);
            }
        });
        await Transaction.insertMany(response.data);
        res.send("Database initialized with seed data");
    } catch (error) {
        res.status(500).send("Error initializing database");
    }
};
    

module.exports = { initializeDatabase };
