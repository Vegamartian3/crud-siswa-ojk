function Navbar({ halamanAktif, setHalamanAktif }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SISWA</div>
      <div className="navbar-menu">
        <a 
          href="#home" 
          onClick={() => setHalamanAktif('home')}
          style={{ textDecoration: halamanAktif === 'home' ? 'underline' : 'none' }}
        >
          Home
        </a>
        <a 
          href="#tambah" 
          onClick={() => setHalamanAktif('tambah')}
          style={{ textDecoration: halamanAktif === 'tambah' ? 'underline' : 'none' }}
        >
          Tambah Siswa
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
