const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Hubungkan Route API
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server Produk aktif di http://localhost:${PORT}`);
});
