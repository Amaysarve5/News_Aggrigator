require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

// Generic fetch function
async function fetchNews(url, res) {
  try {
    const response = await axios.get(url);

    const articles = response.data?.articles || [];
    const totalResults = response.data?.totalResults || 0;

    console.log(`Fetched URL: ${url}`);
    console.log(`Results: ${articles.length}`);

    return res.status(200).json({
      success: true,
      total: totalResults,
      data: articles,
    });
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch from API",
      error: error.response?.data || error.message,
    });
  }
}


// ALL NEWS (search)
app.get("/all-news", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 40;
  const page = parseInt(req.query.page) || 1;
  const query = req.query.q || "india";

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

// TOP HEADLINES
app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 40;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "business";
  const country = req.query.country || "us";

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

// COUNTRY NEWS
app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.page) || 1;
  const country = req.params.iso;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
