import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceCard from './components/InvoiceCard';
import RevenueGraph from './components/RevenueGraph';
import axios from 'axios';
import { Grid, Pagination, Box, Divider } from '@mui/material';
import './App.css';

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(6);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await axios.get('/invoices');
      setInvoices(response.data);
      calculateRevenueData(response.data);
    };
    fetchInvoices();
  }, []);

  const calculateRevenueData = (invoices) => {
    const revenueMap = {};
  
    invoices.forEach((invoice) => {
      const date = new Date(invoice.date).toLocaleDateString();
      const total = invoice.total_amount;
  
      if (!revenueMap[date]) {
        revenueMap[date] = { date: date, total: 0 };
      }
      revenueMap[date].total += parseFloat(total);
    });
  
    const revenueArray = Object.values(revenueMap);
    setRevenueData(revenueArray);
  };
  

  const handleAddInvoice = async (invoice) => {
    const response = await axios.post('/invoices', invoice);
    setInvoices([...invoices, response.data]);
    calculateRevenueData([...invoices, response.data]);
  };

  // Pagination logic
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className='app-container'>
      <h1>Invoice Management</h1>
      <InvoiceForm onSubmit={handleAddInvoice} />

      <br></br>
      <Divider />

      <Grid container spacing={2}>
        {currentInvoices.map((invoice) => (
          <Grid item xs={12} sm={6} md={4} key={invoice.invoice_no}>
            <InvoiceCard invoice={invoice} />
          </Grid>
        ))}
      </Grid>
      
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(invoices.length / invoicesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      
      <br></br>
      <Divider />

      <RevenueGraph data={revenueData} />
    </div>
  );
};

export default App;
