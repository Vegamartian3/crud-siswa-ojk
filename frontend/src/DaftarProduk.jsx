import React from 'react';

function DaftarProduk({ products, onTambahKlik, onEditKlik, onHapusKlik }) {
  return (
    <div className="container-produk">
      <h2>Data Produk Toko</h2>

      {/* Tombol Tambah menggunakan kelas dari index.css */}
      <button onClick={onTambahKlik} className="btn-tambah">
        Tambah
      </button>

      {/* Tabel Data kotak menggunakan gabungan border HTML dan kelas CSS */}
      {products.length === 0 ? (
        <p>Tidak ada data produk.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" className="tabel-produk">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stok</th>
              <th className="kolom-aksi">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id || index}>
                <td>{product.id || index + 1}</td>
                <td>{product.name || product.nama || 'Tanpa Nama'}</td>
                <td>Rp {product.harga || product.price || 0}</td>
                <td>{product.stok || product.stock || 0} Pcs</td>
                <td className="kolom-aksi">
                  <div className="wrapper-aksi">
                    {/* Tombol Hapus Merah */}
                    <button 
                      onClick={() => onHapusKlik(product.id)} 
                      className="btn-aksi btn-hapus"
                    >
                      Hapus
                    </button>
                    {/* Tombol Edit Kuning */}
                    <button 
                      onClick={() => onEditKlik(product)} 
                      className="btn-aksi btn-edit"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DaftarProduk;
