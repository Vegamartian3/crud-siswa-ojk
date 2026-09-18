import { useState, useEffect } from 'react';

function FormProduk({ onKembali, onSaveSuccess, apiUrl, editData }) {
  const [namaInput, setNamaInput] = useState('');
  const [hargaInput, setHargaInput] = useState('');
  const [stokInput, setStokInput] = useState('');

  // Jika tombol edit diklik, otomatis isi form dengan data lama yang mau diedit
  useEffect(() => {
    if (editData) {
      setNamaInput(editData.name || editData.nama || '');
      setHargaInput(editData.price || editData.harga || '');
      setStokInput(editData.stock || editData.stok || '');
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaInput || !hargaInput || !stokInput) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const payload = {
      name: namaInput,
      price: Number(hargaInput),
      stock: Number(stokInput)
    };

    try {
      let response;
      if (editData) {
        // JIKA EDIT: Gunakan method PUT ke endpoint id spesifik
        response = await fetch(`${apiUrl}/${editData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // JIKA TAMBAH BARU: Gunakan method POST
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        alert(editData ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!");
        onSaveSuccess(); // Panggil fungsi refresh data dan kembali ke tabel
      } else {
        alert("Gagal menyimpan data ke backend.");
      }
    } catch (error) {
      console.error("Sistem eror saat submit:", error);
    }
  };

  return (
    <div className="container-form">
      <h2>{editData ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
      <form onSubmit={handleSubmit} className="form-produk">
        <div className="form-grup">
          <label>Nama Produk:</label>
          <input 
            type="text" 
            value={namaInput} 
            onChange={(e) => setNamaInput(e.target.value)} 
          />
        </div>
        <div className="form-grup">
          <label>Harga Produk:</label>
          <input 
            type="number" 
            value={hargaInput} 
            onChange={(e) => setHargaInput(e.target.value)} 
          />
        </div>
        <div className="form-grup">
          <label>Stok Produk:</label>
          <input 
            type="number" 
            value={stokInput} 
            onChange={(e) => setStokInput(e.target.value)} 
          />
        </div>
        
        <div className="wrapper-tombol-form">
          <button type="submit" className="btn-form btn-simpan">
            Simpan
          </button>
          <button type="button" onClick={onKembali} className="btn-form btn-batal">
            Batal / Kembali
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduk;
