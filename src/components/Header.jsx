import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Komponen: Header aplikasi
// Fitur: Navigasi dan fungsi pencarian global
const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Logika: Navigasi ke halaman pencarian
  const handleSearch = () => {
    if (searchInput.trim() === '') {
      navigate('/');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
  };

  // Logika: Trigger pencarian saat tekan Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-white bg-opacity-95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Tampilan mobile */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="text-xl font-bold text-gray-800">
            lite<span>Random</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/about" className="p-2 text-sm font-medium">
              About
            </Link>
          </div>
        </div>

        {/* Tampilan desktop */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari buku berdasarkan judul, penulis, kata kunci"
                className="border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm w-64 lg:w-96"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={handleSearch}
              >
                {/* Icon pencarian */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">lite<span>Random</span></Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/about" className="p-2 text-sm font-medium">
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Input pencarian versi mobile */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari buku berdasarkan judul, penulis, atau kata kunci..."
            className="border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleSearch}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;