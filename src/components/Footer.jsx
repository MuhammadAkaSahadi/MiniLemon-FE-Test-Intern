import React from 'react';
import { Link } from 'react-router-dom';

// Komponen: Footer aplikasi
// Fitur: Menampilkan navigasi sekunder dan informasi hak cipta
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              liteRandom
            </Link>
            <p className="text-gray-600 text-sm mt-2">
              &copy; {new Date().getFullYear()} liteRandom. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Made with ❤️ for book lovers everywhere. Discover your next favorite read with liteRandom.
          </p>
          <p className="mt-2">
            Buku adalah jendela dunia, mari bersama kita buka jendela tersebut.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;