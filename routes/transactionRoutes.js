const express = require("express");
const router = express.Router();
const { listTransactions } = require("../controllers/transactionController");
const { initializeDatabase } = require("../controllers/initializeController");
const { getStatistics } = require("../controllers/statisticsController");
const { getBarChart, getPieChart } = require("../controllers/chartController");

/**
 * @swagger
 * /initialize:
 *   get:
 *     summary: Initialize the database with seed data
 *     responses:
 *       200:
 *         description: Database initialized successfully
 */
router.get("/initialize", initializeDatabase);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: List transactions with pagination and search
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         description: The term to search for in product name, description, or price
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         description: The month to filter transactions by (optional)
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: The page number for pagination (optional, default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         description: The number of records per page (optional, default is 10)
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of transactions based on search and pagination
 */
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

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Get statistics for a given month
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: The month to fetch statistics for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The statistics for the given month
 */
router.get("/statistics", async (req, res) => {
    const { month } = req.query;
    const statistics = await getStatistics(month);
    res.json(statistics);
});

/**
 * @swagger
 * /bar-chart:
 *   get:
 *     summary: Get bar chart data for a given month
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: The month to fetch bar chart data for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The bar chart data for the given month
 */
router.get("/bar-chart", async (req, res) => {
    const { month } = req.query;
    const barChart = await getBarChart(month);
    res.json(barChart);
});

/**
 * @swagger
 * /pie-chart:
 *   get:
 *     summary: Get pie chart data for a given month
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: The month to fetch pie chart data for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The pie chart data for the given month
 */
router.get("/pie-chart", async (req, res) => {
    const { month } = req.query;
    const pieChart = await getPieChart(month);
    res.json(pieChart);
});

/**
 * @swagger
 * /combined:
 *   get:
 *     summary: Get combined statistics, bar chart, and pie chart data
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: The month to fetch combined data for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Combined data (statistics, bar chart, pie chart)
 */
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
