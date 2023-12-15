// Function for fetching data from the Finnhub API
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      console.log("API Response:", data);

      // Check if first or second API
      if (apiUrl.includes("quote")) {
        console.log("Quote API Response Structure:", data);

        // Use the symbol from the API call URL
        const symbolFromUrl = extractSymbolFromUrl(apiUrl);

        if (symbolFromUrl) {
          apiData1 = { ...data, symbol: symbolFromUrl };
        } else {
          console.error("Symbol not found in the quote API URL:", apiUrl);
        }
      } else if (apiUrl.includes("search")) {
        console.log("Symbol Search API Response Structure:", data);

        apiData2 = data.result;

        // Update the results
        if (apiData1 !== null && apiData2 !== null) {
          updateResults(apiData1, apiData2);
        }
      }
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Function to extract the symbol from the API call URL
function extractSymbolFromUrl(apiUrl) {
  const url = new URL(apiUrl);
  const symbol = url.searchParams.get("symbol");
  return symbol;
}

function updateResults(data1, data2) {
  console.log("Data from API 1:", data1);
  console.log("Data from API 2:", data2);

  const resultSection = document.getElementById("results-section");
  resultSection.innerHTML = "";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  // Extract the symbol from API 1 response (quote)
  const symbolFromQuoteAPI = data1.symbol || "N/A";

  // Display information from API 1 (quote)
  const symbolParagraph = document.createElement("p");
  symbolParagraph.textContent = `Symbol: ${symbolFromQuoteAPI}`;
  resultContainer.appendChild(symbolParagraph);

  const priceParagraph = document.createElement("p");
  priceParagraph.textContent = `Current Price: $${data1.c || "N/A"}`;
  resultContainer.appendChild(priceParagraph);

  const highPriceParagraph = document.createElement("p");
  highPriceParagraph.textContent = `High Price of the Day: $${
    data1.h || "N/A"
  }`;
  resultContainer.appendChild(highPriceParagraph);

  const lowPriceParagraph = document.createElement("p");
  lowPriceParagraph.textContent = `Low Price of the Day: $${data1.l || "N/A"}`;
  resultContainer.appendChild(lowPriceParagraph);

  // Check if array
  if (Array.isArray(data2)) {
    // Find matching symbol
    const matchingSymbolInfo = data2.find(
      (symbolInfo) => symbolInfo.symbol === symbolFromQuoteAPI
    );

    if (matchingSymbolInfo) {
      // Display information from API 2 (symbolSearch)
      const descriptionParagraph = document.createElement("p");
      descriptionParagraph.textContent = `Description: ${
        matchingSymbolInfo.description || "N/A"
      }`;
      resultContainer.appendChild(descriptionParagraph);

      const typeParagraph = document.createElement("p");
      typeParagraph.textContent = `Type: ${matchingSymbolInfo.type || "N/A"}`;
      resultContainer.appendChild(typeParagraph);
    } else {
      console.error(`Symbol info not found for: ${symbolFromQuoteAPI}`);
    }
  } else {
    console.warn(
      "Symbol Search API response does not have the expected structure."
    );
  }

  resultSection.appendChild(resultContainer);
}

// Function to search for a stock
function searchStock() {
  const symbol = document.getElementById("stock-search").value;
  const apiUrl1 = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=clse5fpr01qoidjepeg0clse5fpr01qoidjepegg`;
  const apiUrl2 = `https://finnhub.io/api/v1/search?q=${symbol}&token=clse5fpr01qoidjepeg0clse5fpr01qoidjepegg`;

  apiData1 = null;
  apiData2 = null;

  // Make API calls
  fetchData(apiUrl1);
  fetchData(apiUrl2);
}

// Function to search for a popular stock
function searchPopularStock(symbol) {
  const apiUrl1 = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=clse5fpr01qoidjepeg0clse5fpr01qoidjepegg`;
  const apiUrl2 = `https://finnhub.io/api/v1/search?q=${symbol}&token=clse5fpr01qoidjepeg0clse5fpr01qoidjepegg`;

  apiData1 = null;
  apiData2 = null;

  // Make API calls
  fetchData(apiUrl1);
  fetchData(apiUrl2);
}

// Function to apply filters
function applyFilters() {
  console.log("Filters applied");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", searchStock);

  document
    .getElementById("filter-button")
    .addEventListener("click", applyFilters);

  document
    .getElementById("stock-icon-AAPL")
    .addEventListener("click", () => searchPopularStock("AAPL"));
  document
    .getElementById("stock-icon-GOOGL")
    .addEventListener("click", () => searchPopularStock("GOOGL"));
  document
    .getElementById("stock-icon-MSFT")
    .addEventListener("click", () => searchPopularStock("MSFT"));
  document
    .getElementById("stock-icon-AMZN")
    .addEventListener("click", () => searchPopularStock("AMZN"));

  fetchStockSymbols();
});

// Function to fetch stock symbols using Finnhub API
async function fetchStockSymbols() {
  try {
    const response = await fetch("/api/stock-symbols");
    const data = await response.json();

    const stockDropdown = document.getElementById("stock-search");

    stockDropdown.innerHTML = "";

    // Create an option for each stock symbol
    data.forEach((symbol) => {
      const option = document.createElement("option");
      option.value = symbol.symbol;
      option.textContent = symbol.description;
      stockDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
