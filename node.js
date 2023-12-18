const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  //res.sendFile("index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
  //res.sendFile("about.html", { root: __dirname });
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "help.html"));
  //res.sendFile("help.html", { root: __dirname });
});

// Endpoint to fetch stock symbols
app.get("/api/stock-symbols", async (req, res) => {
  try {
    const apiKey = "clse4b1r01qoidjepctgclse4b1r01qoidjepcu0";
    const apiUrl = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=clse5fpr01qoidjepeg0clse5fpr01qoidjepegg`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

