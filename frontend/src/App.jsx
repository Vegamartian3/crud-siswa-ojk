import { useState, useEffect } from 'react';
import axios from 'axios';
import DaftarProduk from './DaftarProduk';
import FormProduk from './FormProduk';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State navigasi halaman: 'tabel' atau 'form'
  const [viewMode, setViewMode] = useState('tabel'); 
  // State penampung data saat ingin melakukan proses edit
  const [currentEditData, setCurrentEditData] = useState(null);

  const API_URL = 'http://localhost:3000/api/products';

  // --- FUNGSI GET (Ambil Data) ---
    const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      
      // TAMBAHKAN BARIS INI UNTUK MENGECEK STRUKTUR DATA:
      console.log("Struktur Data Asli Backend:", response.data);
      
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  // --- FUNGSI DELETE (Hapus Data) ---
  const handleHapusProduk = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Produk berhasil dihapus!");
        fetchProducts(); // Refresh tabel setelah dihapus
      } catch (error) {
        console.error("Gagal menghapus data:", error);
        alert("Gagal menghapus produk.");
      }
    }
  };

  // Pemicu perpindahan ke Halaman Tambah
  const triggerHalamanTambah = () => {
    setCurrentEditData(null); // Bersihkan data edit karena ini buat data baru
    setViewMode('form');
  };

  // Pemicu perpindahan ke Halaman Edit
  const triggerHalamanEdit = (product) => {
    setCurrentEditData(product); // Simpan data item yang mau diedit
    setViewMode('form');
  };

  const handleSelesaiSimpan = () => {
    fetchProducts();     // Muat ulang data terbaru
    setViewMode('tabel'); // Kembali ke halaman utama tabel
  };

  if (loading) return <p style={{ padding: '20px' }}>Sedang memuat data produk...</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {viewMode === 'tabel' ? (
        <DaftarProduk 
          products={products} 
          onTambahKlik={triggerHalamanTambah}
          onEditKlik={triggerHalamanEdit}
          onHapusKlik={handleHapusProduk}
        />
      ) : (
        <FormProduk 
          apiUrl={API_URL}
          editData={currentEditData}
          onKembali={() => setViewMode('tabel')}
          onSaveSuccess={handleSelesaiSimpan}
        />
      )}
    </div>
  );
}

export default App;
