const Transaction = require("../models/Transaction");

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

const correctMonthName = (month) => {
    const typos = {
        Janauary: "January",
        Februay: "February",
        Martch: "March",
        Apriil: "April",
        Mai: "May",
        Jun: "June",
        Jully: "July",
        Augest: "August",
        Septembar: "September",
        Octuber: "October",
        Novembar: "November",
        Decembar: "December"
    };
    return typos[month] || month;
};

const getStatistics = async (month) => {
    const correctedMonth = correctMonthName(month);

    const validMonth = monthNames[correctedMonth];

    if (!validMonth) {
        throw new Error("Invalid month name");
    }

    try {
        // Calculate total sales amount for sold items in the given month
        const totalSale = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, parseInt(validMonth)]
                    },
                    sold: true 
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$price" } 
                }
            }
        ]);

        // Count total number of sold items for the given month
        const soldItems = await Transaction.countDocuments({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(validMonth)]
            },
            sold: true
        });

        // Count total number of not sold items for the given month
        const notSoldItems = await Transaction.countDocuments({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(validMonth)]
            },
            sold: false
        });

        return {
            totalSaleAmount: totalSale[0]?.totalAmount || 0, 
            totalSoldItems: soldItems,
            totalNotSoldItems: notSoldItems
        };
    } catch (error) {
        console.error("Error fetching statistics:", error);
        throw new Error("Could not fetch statistics");
    }
};

module.exports = { getStatistics };
