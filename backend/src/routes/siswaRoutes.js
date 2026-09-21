const express = require('express');
const router = express.Router();

// Mengimpor fungsi secara langsung (destructuring)
const {
  createSiswa,
  getAllSiswa,
  getSiswaById,
  updateSiswa,
  deleteSiswa
} = require('../controllers/siswaController');

const { validateSiswa } = require('../middlewares/validation');

// Susunan rute API yang sudah diperbaiki
router.get('/', getAllSiswa);
router.get('/:id', getSiswaById); // <--- BENAR: Hapus kata "siswaController." karena fungsinya sudah diimpor langsung di atas!
router.post('/', createSiswa);
router.put('/:id', validateSiswa, updateSiswa);
router.delete('/:id', deleteSiswa);

module.exports = router;
