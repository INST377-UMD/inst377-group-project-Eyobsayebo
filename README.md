# Project Title: Stock Notification System

**Developed by:** Eyob Sayebo, Uchenna Ekwunife, and Ethan Weber

**Description:**

The Stock Notification System is a web application that allows users to search for stock information, view popular stocks, and register for stock alerts. The system provides real-time stock data and charts to help users make informed investment decisions.

## Target Browsers

The Stock Notification System is designed to be compatible with modern web browsers, including but not limited to Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.

## User Manual

For detailed instructions on how to use the Stock Notification System, please refer to the [User Manual](./docs/userManual.md).

## Developer Manual

### Setup and Installation

1. Clone the repository to your local machine:
   git clone https://github.com/INST377-UMD/inst377-group-project-Eyobsayebo.git
2. Navigate to project directory:
   cd inst377_group_final
3. Install dependencies using npm
   npm start

 **Running the Application**
To run the application on a server, follow these steps:
Navigate to your terminal and execute:
npm start
This project will then be accessible at http://localhost:4000/index.html.

### API Documentation
The server application interacts with the Finnhub API to fetch stock-related information. Finnhub provides a comprehensive financial data API, allowing us to access stock symbols and quote details.

**Endpoints**

**GET `/`**: Serve the main HTML file.
**GET `/about`**: Serve the about HTML file.
**GET `/help`**: Serve the help HTML file.
**GET `/api/stock-symbols`**: Fetch stock symbols from the Finnhub API.

### Known Bugs
No known bugs at the moment.

### RoadMap for Future Development
Future development should focus on the following areas:

Enhancements to User Interface:
Implement a more user-friendly interface.
Add additional features for a better user experience.

Performance Optimization:
Optimize server performance for handling larger datasets.

Security Improvements:
Implement security best practices to protect against potential vulnerabilities.

Additional API Endpoints:
Introduce new API endpoints to provide additional functionalities.






   
