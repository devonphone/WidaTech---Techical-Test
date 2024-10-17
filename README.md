# Invoice Module Application

This project is a React-based application for managing invoices. The application allows users to input invoice details, search for products, select them, and submit an invoice. It integrates with a backend API to fetch product data and submit invoices. The project also includes basic UI notifications using a Snackbar and product suggestions with images in the Autocomplete feature.

## Features

- **Create Invoice**: Fill out the form with details like date, customer name, salesperson name, and notes.
- **Product Autocomplete with Images**: Search for products with a suggestion dropdown that displays product images, prices, and stock information.
- **Add Products to Invoice**: Select products from the suggestions and specify quantities.
- **Form Validation**: Ensure all required fields are filled before submitting.
- **Snackbar Notification**: Display success messages using a Snackbar instead of alerts.
- **Responsive Layout**: The app is built using Material-UI (MUI) for responsive design and layout.

## Technologies Used

- **React**: Frontend framework for building the UI.
- **Material-UI (MUI)**: Component library for styling and layout.
- **Axios**: HTTP client for API calls.
- **Node.js / Express (Backend API)**: For handling product data and invoice submissions.
- **PostgreSQL**: Database to store products and invoices (replace with actual backend setup).
- **ES Modules**: Used in the project setup for module handling.


## Getting Started
### Prerequisites

To run this project, you'll need the following installed:

- Node.js (v18.16.0 or later)
- PostgreSQL (for backend)
- A backend API for handling product data and invoice submissions

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devo/invoice-module-app.git
2. cd invoice-module-app
3. npm install
4. npm start