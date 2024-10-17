import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Autocomplete, InputAdornment, Snackbar } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';

const InvoiceForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [salespersonName, setSalespersonName] = useState('');
  const [notes, setNotes] = useState('');
  const [productInput, setProductInput] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch product data from the database when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Replace with your actual API endpoint
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductInputChange = (e) => {
    const value = e.target.value;
    setProductInput(value);

    if (value) {
      const filteredProducts = productsData.filter((product) =>
        product.product_name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((p) => p.product_id === product.product_id);

    if (!existingProduct) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    setProductInput('');
    setSuggestions([]);
  };

  const handleQuantityChange = (product_id, quantity) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.product_id === product_id ? { ...p, quantity: parseInt(quantity) } : p
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !customerName || !salespersonName || selectedProducts.length === 0) {
      setError('Please fill in all required fields and select at least one product.');
      return;
    }

    setError('');

    // Calculate total amount
    const totalAmount = selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const items = selectedProducts.map((product) => ({
      product_id: product.product_id,
      quantity: product.quantity || 1,
    }));

    const invoiceData = {
      date,
      customer_name: customerName,
      salesperson_name: salespersonName,
      notes,
      total_amount: totalAmount.toFixed(2),
      items,
    };

    try {
      await axios.post('/invoices', invoiceData);
      onSubmit(invoiceData);
      setOpenSnackbar(true); // Show Snackbar on successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  const resetForm = () => {
    setDate('');
    setCustomerName('');
    setSalespersonName('');
    setNotes('');
    setProductInput('');
    setSelectedProducts([]);
    setSuggestions([]);
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}> {/* Add margin top */}
      <Typography variant="h5" gutterBottom>New Invoice</Typography>
      <Box display="flex" flexDirection="column" spacing={2} sx={{ gap: 2 }}> {/* Add gap for spacing */}
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          fullWidth
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Salesperson Name"
          value={salespersonName}
          onChange={(e) => setSalespersonName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={3}
        />
        <Autocomplete
          freeSolo
          inputValue={productInput}
          onInputChange={(_, value) => handleProductInputChange({ target: { value } })}
          options={suggestions} // Update to show filtered suggestions
          getOptionLabel={(option) => `${option.product_name} - $${option.price} (Stock: ${option.stock})`}
          onChange={(_, product) => product && handleProductSelect(product)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Products"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <AddShoppingCartIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <img src={option.product_picture} alt={option.product_name} style={{ width: 40, height: 40, marginRight: 8 }} />
              {option.product_name} - ${option.price} (Stock: {option.stock})
            </li>
          )}
        />

        {selectedProducts.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Selected Products:</Typography>
            <ul>
              {selectedProducts.map((product) => (
                <li key={product.product_id}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{product.product_name} - ${product.price}</Typography>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.product_id, e.target.value)}
                      InputProps={{ inputProps: { min: 1, max: product.stock } }}
                    />
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {error && (
          <Typography color="error">{error}</Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Invoice
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Invoice submitted successfully!"
        autoHideDuration={3000} // Snackbar will auto hide after 3 seconds
      />
    </Box>
  );
};

export default InvoiceForm;
