const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi ke MySQL Workbench
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Sesuaikan username MySQL Anda
  password: 'vega160308', // <--- GANTI dengan password MySQL Workbench Anda!
  database: 'db_crud_prisma', // Tetap pakai nama DB ini agar tidak perlu ubah Workbench
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ubah pool menjadi format async/await agar codingannya gampang
const db = pool.promise();

module.exports = { db };
