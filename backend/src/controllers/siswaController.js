const { db } = require('../config/utils');

// 1. CREATE (Tambah Siswa)
const createSiswa = async (req, res) => {
  const data = req.body;

  try {
    // JIKA YANG DIKIRIM BANYAK DATA (ARRAY)
    if (Array.isArray(data)) {
      const values = [];
      const placeholders = [];

      for (const item of data) {
        // PENGAMAN
        if (
          !item.kode_siswa ||
          !item.nama_siswa ||
          !item.alamat_siswa ||
          !item.tgl_siswa ||
          !item.jurusan_siswa
        ) {
          return res.status(400).json({
            error: "Ada data yang formatnya salah! Pastikan semua data siswa terisi."
          });
        }

        values.push(
          item.kode_siswa,
          item.nama_siswa,
          item.alamat_siswa,
          item.tgl_siswa,
          item.jurusan_siswa
        );

        placeholders.push('(?, ?, ?, ?, ?)');
      }

      const query = `
        INSERT INTO siswa
        (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
        VALUES ${placeholders.join(', ')}
      `;

      const [result] = await db.execute(query, values);

      return res.status(201).json({
        message: `${result.affectedRows} siswa berhasil ditambahkan sekaligus!`,
        insertedCount: result.affectedRows
      });
    }

    // JIKA YANG DIKIRIM HANYA 1 DATA
    const {
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa
    } = data;

    if (
      !kode_siswa ||
      !nama_siswa ||
      !alamat_siswa ||
      !tgl_siswa ||
      !jurusan_siswa
    ) {
      return res.status(400).json({
        error: "Semua data siswa wajib diisi!"
      });
    }

    const [result] = await db.execute(
      `INSERT INTO siswa
      (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES (?, ?, ?, ?, ?)`,
      [
        kode_siswa,
        nama_siswa,
        alamat_siswa,
        tgl_siswa,
        jurusan_siswa
      ]
    );

    res.status(201).json({
      id: result.insertId,
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// 2. READ (Ambil Semua Siswa)
const getAllSiswa = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM siswa ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// === 🔍 TAMBAHKAN FUNGSI BARU INI DI SINI ===
// 2.5 READ (Ambil 1 Siswa Berdasarkan ID)
const getSiswaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM siswa WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Siswa tidak ditemukan'
      });
    }

    // Mengembalikan data siswa berupa objek tunggal
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// 3. UPDATE (Ubah Siswa)
const updateSiswa = async (req, res) => {
  const { id } = req.params;
  const {
    kode_siswa,
    nama_siswa,
    alamat_siswa,
    tgl_siswa,
    jurusan_siswa
  } = req.body;

  try {
    await db.execute(
      `UPDATE siswa
       SET kode_siswa = ?,
           nama_siswa = ?,
           alamat_siswa = ?,
           tgl_siswa = ?,
           jurusan_siswa = ?
       WHERE id = ?`,
      [
        kode_siswa,
        nama_siswa,
        alamat_siswa,
        tgl_siswa,
        jurusan_siswa,
        id
      ]
    );

    res.json({
      id,
      kode_siswa,
      nama_siswa,
      alamat_siswa,
      tgl_siswa,
      jurusan_siswa
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// 4. DELETE (Hapus Siswa)
const deleteSiswa = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute(
      'DELETE FROM siswa WHERE id = ?',
      [id]
    );
    res.json({
      message: "Siswa berhasil dihapus"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// DAFTARKAN NAMA FUNGSI BARU DI DALAM EXPORTS
module.exports = {
  createSiswa,
  getAllSiswa,
  getSiswaById,
  updateSiswa,
  deleteSiswa
};
