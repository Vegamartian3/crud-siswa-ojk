function DaftarSiswa({ siswa, onEdit, onDelete }) {

  return (
    <div className="container-produk">
      <h2>Daftar Siswa</h2>

      <table className="tabel-produk">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Siswa</th>
            <th>Nama Siswa</th>
            <th>Alamat</th>
            <th>Tanggal Lahir</th>
            <th>Jurusan</th>
            <th className="kolom-aksi">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {siswa.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.kode_siswa}</td>
              <td>{item.nama_siswa}</td>
              <td>{item.alamat_siswa}</td>
              <td>
                {item.tgl_siswa ? item.tgl_siswa.substring(0, 10) : '-'}
              </td>
              <td>{item.jurusan_siswa}</td>

              <td className="kolom-aksi">
                <div className="wrapper-aksi">
                  <button 
                    className="btn-aksi btn-edit" 
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button 
                    className="btn-aksi btn-hapus" 
                    onClick={() => onDelete(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {siswa.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                Belum ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DaftarSiswa;
