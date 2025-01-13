const express = require("express");
const router = express.Router();
const { listTransactions } = require("../controllers/transactionController");
const { initializeDatabase } = require("../controllers/initializeController");
const { getStatistics } = require("../controllers/statisticsController");
const { getBarChart, getPieChart } = require("../controllers/chartController");


router.get("/initialize", initializeDatabase);


router.get("/transactions", async (req, res) => {
    const { searchTerm, month, page, perPage } = req.query;

    try {
        const transactions = await listTransactions({
            searchTerm,
            month,
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10
        });

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        res.status(400).json({ error: error.message });
    }
});


router.get("/statistics", async (req, res) => {
    const { month } = req.query;
    const statistics = await getStatistics(month);
    res.json(statistics);
});


router.get("/bar-chart", async (req, res) => {
    const { month } = req.query;
    const barChart = await getBarChart(month);
    res.json(barChart);
});


router.get("/pie-chart", async (req, res) => {
    const { month } = req.query;
    const pieChart = await getPieChart(month);
    res.json(pieChart);
});

router.get("/combined", async (req, res) => {
    const { month, searchTerm, page } = req.query;

    try {
        const statistics = await getStatistics(month);
        const barChart = await getBarChart(month);
        const pieChart = await getPieChart(month);

        const transactions = await listTransactions({ month, searchTerm, page });

        res.json({
            transactions,
            statistics,
            barChartData: barChart,
            pieChartData: pieChart,
        });
    } catch (error) {
        console.error("Error fetching combined data:", error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
