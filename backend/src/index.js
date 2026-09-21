const express = require('express');
const cors = require('cors');
require('dotenv').config();

const siswaRoutes = require('./routes/siswaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Hubungkan Route API
app.use('/api/siswa', siswaRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server Siswa aktif di http://localhost:${PORT}`);
});
