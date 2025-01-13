const Transaction = require("../models/Transaction");

const monthNames = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
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

const validateMonth = (month) => {
    const correctedMonth = correctMonthName(month);
    const validMonth = monthNames[correctedMonth];
    if (!validMonth) {
        throw new Error("Invalid month. Please provide a valid month name.");
    }
    return validMonth;
};

// BarChart API
const getBarChart = async (month) => {
    const validMonth = validateMonth(month);

    const ranges = [
        { range: "0-100", min: 0, max: 100 },
        { range: "101-200", min: 101, max: 200 },
        { range: "201-300", min: 201, max: 300 },
        { range: "301-400", min: 301, max: 400 },
        { range: "401-500", min: 401, max: 500 },
        { range: "501-600", min: 501, max: 600 },
        { range: "601-700", min: 601, max: 700 },
        { range: "701-800", min: 701, max: 800 },
        { range: "801-900", min: 801, max: 900 },
        { range: "901-above", min: 901, max: Infinity },
    ];

    const result = [];

    for (const range of ranges) {
        const count = await Transaction.countDocuments({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, validMonth],
            },
            price: { $gte: range.min, ...(range.max !== Infinity && { $lte: range.max }) },
        });
        result.push({ range: range.range, count });
    }

    return result;
};

// PieChart API
const getPieChart = async (month) => {
    const validMonth = validateMonth(month);

    const categories = await Transaction.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, validMonth],
                },
            },
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            },
        },
    ]);

    return categories.map((cat) => ({
        category: cat._id,
        count: cat.count,
    }));
};

module.exports = { getBarChart, getPieChart };
