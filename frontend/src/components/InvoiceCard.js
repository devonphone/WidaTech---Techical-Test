import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InvoiceCard = ({ invoice }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400, margin: '16px auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Customer: {invoice.customer_name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Invoice No: {invoice.invoice_no}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Date: {new Date(invoice.date).toLocaleDateString()}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" component="div">
            Total Amount Paid: ${invoice.total_amount}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Notes: {invoice.notes ? invoice.notes : 'No notes'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
