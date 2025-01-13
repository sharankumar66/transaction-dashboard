const monthNames = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
};

const Transaction = require("../models/Transaction");

const listTransactions = async ({ searchTerm = '', month, page = 1, perPage = 10 }) => {
    const filter = {};

    const regex = searchTerm ? new RegExp(searchTerm, "i") : null;

    if (month) {
        const monthNumber = monthNames[month];
        if (!monthNumber) {
            throw new Error("Invalid month name");
        }

        filter.$expr = {
            $eq: [{ $month: "$dateOfSale" }, parseInt(monthNumber)],
        };
    }

    // If searchTerm is provided, build the filter for title, description, and price
    if (searchTerm) {
        const isPriceSearch = !isNaN(parseFloat(searchTerm)) && isFinite(searchTerm);
        
        if (isPriceSearch) {
            // If it's a valid number, search the price field
            filter.price = parseFloat(searchTerm); 
        } else if (searchTerm.includes('-')) {
            // If the searchTerm contains a hyphen, we assume it's a price range (e.g., "100-500")
            const [minPrice, maxPrice] = searchTerm.split('-').map(val => parseFloat(val.trim()));
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                filter.price = { $gte: minPrice, $lte: maxPrice }; 
            }
        } else {
            // Otherwise, search in productName and description
            filter.$or = [
                { title: regex },
                { description: regex }
            ];
        }
    }

    try {
        const transactions = await Transaction.find(filter)
            .skip((page - 1) * perPage) // Pagination skip the records for the previous pages
            .limit(parseInt(perPage))  
            .sort({ dateOfSale: -1 });  

        return transactions;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching transactions");
    }
};

module.exports = { listTransactions };
