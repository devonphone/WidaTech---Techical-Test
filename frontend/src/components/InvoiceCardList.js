import React, { useState } from 'react';
import InvoiceCard from './InvoiceCard'; // Import the individual invoice card component
import { Box, Pagination, Grid, Typography } from '@mui/material';

const InvoiceCardList = ({ invoices = [] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const pageCount = Math.ceil(invoices.length / itemsPerPage);
  const displayedInvoices = invoices.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      {invoices.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          No invoices available
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {displayedInvoices.map((invoice) => (
              <Grid item xs={12} sm={6} key={invoice.invoice_no}>
                <InvoiceCard invoice={invoice} />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default InvoiceCardList;
