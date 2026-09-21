const validateSiswa = (req, res, next) => {

  const {
    kode_siswa,
    nama_siswa,
    alamat_siswa,
    tgl_siswa,
    jurusan_siswa
  } = req.body;

  if (
    !kode_siswa ||
    !nama_siswa ||
    !alamat_siswa ||
    !tgl_siswa ||
    !jurusan_siswa
  ) {

    return res.status(400).json({
      error: "Kode, Nama, Alamat, Tanggal, dan Jurusan siswa tidak boleh kosong!"
    });

  }

  next();

};

module.exports = { validateSiswa };
