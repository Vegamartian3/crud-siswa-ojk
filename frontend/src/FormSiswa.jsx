import { useEffect, useState } from 'react';
import axios from 'axios';

function FormSiswa({ siswaEdit, onSuccess }) {

  const [form, setForm] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: ''
  });

  const API_URL = 'http://localhost:3000/api/siswa';

  // Isi form ketika tombol Edit ditekan
  useEffect(() => {
    if (siswaEdit) {
      setForm({
        kode_siswa: siswaEdit.kode_siswa,
        nama_siswa: siswaEdit.nama_siswa,
        alamat_siswa: siswaEdit.alamat_siswa,
        tgl_siswa: siswaEdit.tgl_siswa
          ? siswaEdit.tgl_siswa.substring(0, 10)
          : '',
        jurusan_siswa: siswaEdit.jurusan_siswa
      });
    }
  }, [siswaEdit]);

  // Mengubah isi input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (siswaEdit) {
        // UPDATE
        await axios.put(`${API_URL}/${siswaEdit.id}`, form);
        alert('Siswa berhasil diupdate');
      } else {
        // CREATE
        await axios.post(API_URL, form);
        alert('Siswa berhasil ditambahkan');
      }

      setForm({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: ''
      });

      onSuccess();

    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data siswa');
    }
  };

  return (
    <div className="container-form">
      <h2>{siswaEdit ? 'Edit Data Siswa' : 'Tambah Siswa'}</h2>

      <form onSubmit={handleSubmit} className="form-produk">
        
        <div className="form-grup">
          <label>Kode Siswa</label>
          <input
            type="text"
            name="kode_siswa"
            placeholder="Masukkan kode siswa..."
            value={form.kode_siswa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-grup">
          <label>Nama Siswa</label>
          <input
            type="text"
            name="nama_siswa"
            placeholder="Masukkan nama lengkap..."
            value={form.nama_siswa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-grup">
          <label>Alamat Siswa</label>
          <textarea
            name="alamat_siswa"
            placeholder="Masukkan alamat rumah..."
            value={form.alamat_siswa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-grup">
          <label>Tanggal Lahir</label>
          <input
            type="date"
            name="tgl_siswa"
            value={form.tgl_siswa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-grup">
          <label>Jurusan</label>
          <select
            name="jurusan_siswa"
            value={form.jurusan_siswa}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Jurusan --</option>
            <option value="RPL">RPL</option>
            <option value="TKJ">TKJ</option>
            <option value="DKV">DKV</option>
            <option value="AKL">AKL</option>
          </select>
        </div>

        <button type="submit" className="btn-tambah">
          {siswaEdit ? 'Simpan Perubahan' : 'Tambah Data'}
        </button>

      </form>
    </div>
  );
}

export default FormSiswa;
