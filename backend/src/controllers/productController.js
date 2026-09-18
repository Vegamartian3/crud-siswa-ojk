const { db } = require('../config/utils');

// 1. CREATE (Tambah Produk)
const createProduct = async (req, res) => {
  const data = req.body;

  try {
    // JIKA YANG DIKIRIM BANYAK DATA (ARRAY)
    if (Array.isArray(data)) {
      const values = [];
      const placeholders = [];

      for (const item of data) {
        // PENGAMAN: Jika ada item yang nama atau harganya kosong, langsung batalkan request
        if (!item.name || !item.price) {
          return res.status(400).json({ 
            error: "Ada data yang formatnya salah! Pastikan setiap item memiliki 'name' dan 'price'." 
          });
        }
        
        // Memasukkan name, price, dan stock (default 0 jika tidak diisi)
        values.push(item.name, parseInt(item.price), parseInt(item.stock) || 0);
        placeholders.push('(?, ?, ?)');
      }

      // Menambahkan kolom stock ke dalam query bulk insert
      const query = `INSERT INTO Product (name, price, stock) VALUES ${placeholders.join(', ')}`;
      const [result] = await db.execute(query, values);

      return res.status(201).json({
        message: `${result.affectedRows} produk berhasil ditambahkan sekaligus!`,
        insertedCount: result.affectedRows
      });
    }

    // 2. JIKA YANG DIKIRIM HANYA 1 DATA (OBJEK BIASA)
    const { name, price, stock } = data;
    if (!name || !price) {
      return res.status(400).json({ error: "Nama dan harga produk tidak boleh kosong!" });
    }

    // Menambahkan kolom stock dan parameternya (?, ?, ?)
    const [result] = await db.execute(
      'INSERT INTO Product (name, price, stock) VALUES (?, ?, ?)',
      [name, parseInt(price), parseInt(stock) || 0]
    );
    res.status(201).json({ id: result.insertId, name, price, stock: parseInt(stock) || 0 });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. READ (Ambil Semua Produk)
const getAllProducts = async (req, res) => {
  try {
    // Query ini otomatis mengambil kolom 'stock' yang baru karena menggunakan SELECT *
    const [rows] = await db.execute('SELECT * FROM Product ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. UPDATE (Ubah Produk)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    // Menambahkan stock = ? ke dalam query UPDATE agar nilai stok bisa diperbarui saat edit
    await db.execute(
      'UPDATE Product SET name = ?, price = ?, stock = ? WHERE id = ?',
      [name, parseInt(price), parseInt(stock) || 0, id]
    );
    res.json({ id, name, price, stock: parseInt(stock) || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. DELETE (Hapus Produk)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM Product WHERE id = ?', [id]);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };
