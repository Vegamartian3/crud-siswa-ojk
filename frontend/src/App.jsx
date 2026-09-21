import { useEffect, useState } from 'react';
import axios from 'axios';
import FormSiswa from './FormSiswa';
import DaftarSiswa from './DaftarSiswa';
import './App.css';
import Navbar from './Navbar';

function App() {
  const [siswa, setSiswa] = useState([]);
  const [siswaEdit, setSiswaEdit] = useState(null);
  
  // State baru untuk mengatur halaman yang sedang aktif ('home' atau 'tambah')
  const [halamanAktif, setHalamanAktif] = useState('home');

  const API_URL = 'http://localhost:3000/api/siswa';

  // Ambil semua data siswa
  const getSiswa = async () => {
    try {
      const response = await axios.get(API_URL);
      setSiswa(response.data);
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data siswa');
    }
  };

  useEffect(() => {
    getSiswa();
  }, []);

  // Setelah tambah / update sukses
  const handleSuccess = () => {
    getSiswa();
    setSiswaEdit(null);
    setHalamanAktif('home'); // Otomatis kembali ke halaman utama setelah simpan data
  };

  // Saat tombol Edit di tabel ditekan
  const handleEdit = (data) => {
    setSiswaEdit(data);
    setHalamanAktif('tambah'); // Otomatis pindah ke halaman form untuk mengedit
  };

  // Hapus siswa
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus siswa ini?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Siswa berhasil dihapus');
      getSiswa();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus siswa');
    }
  };

  return (
    <>
      {/* Kirim state navigasi ke dalam Navbar */}
      <Navbar halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} />

      <div className="container">
        <h1>TERDAFTAR</h1>

        {/* JIKA HALAMAN AKTIF ADALAH 'tambah', TAMPILKAN FORM SISWA */}
        {halamanAktif === 'tambah' && (
          <FormSiswa
            siswaEdit={siswaEdit}
            onSuccess={handleSuccess}
          />
        )}

        {/* JIKA HALAMAN AKTIF ADALAH 'home', TAMPILKAN DAFTAR TABEL SISWA */}
        {halamanAktif === 'home' && (
          <DaftarSiswa
            siswa={siswa}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default App;
