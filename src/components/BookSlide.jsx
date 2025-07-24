/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRandomBooks } from '../service/Api';

// Komponen: Slider buku hero section
// Fitur: Menampilkan buku acak dengan efek slider otomatis
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColors = ["#DC4C3E", "#4A90E2", "#F4A261"];

  // Logika: Memuat buku acak untuk slider
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const randomBooks = await fetchRandomBooks(3);
        setBooks(randomBooks);
      } catch (error) {
        // Fallback data jika API error
        setBooks([
          {
            _id: "fallback1",
            title: "Judul",
            author: "Author",
            description: "Lorem Ipsum dolor si amet",
            genre: "Genre",
            coverImage: "images"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  // Logika: Auto-rotate slider setiap 5 detik
  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % books.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [books.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % books.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + books.length) % books.length);

  // Fungsi utilitas
  const truncateDescription = (text = '', maxLength = 200) => 
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const getTitleFontSize = (title = '') => 
    title.trim().split(/\s+/).length > 4
      ? "text-3xl md:text-4xl lg:text-5xl"
      : "text-4xl md:text-5xl lg:text-6xl";

  // Tampilan loading
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-zinc-400 to-zinc-300">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-xl w-48 h-64 md:w-64 md:h-80 mx-auto"></div>
          <div className="mt-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (books.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-zinc-400 to-zinc-300">
        <p className="text-white text-xl">Tidak ada buku yang tersedia</p>
      </div>
    );
  }

  const currentBook = books[currentSlide];
  const bgColor = bgColors[currentSlide % bgColors.length];
 
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${bgColor} 0%, ${darkenColor(bgColor, 30)} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)"
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Book image */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative transform transition-all duration-500 hover:scale-105">
                <div className="w-64 h-80 md:w-80 md:h-96 bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white border-opacity-30">
                  {currentBook.coverImage ? (
                    <img
                      src={currentBook.coverImage}
                      className="w-full h-full object-cover"
                      alt={currentBook.title}
                      onError={(e) => e.target.parentElement.innerHTML = fallbackContent(currentBook)}
                    />
                  ) : (
                    fallbackContent(currentBook)
                  )}
                </div>
                <div className="absolute -inset-4 rounded-2xl border-2 border-white border-opacity-20 transform rotate-3"></div>
                <div className="absolute -inset-6 rounded-2xl border border-white border-opacity-10 transform -rotate-2"></div>
              </div>
            </div>

            {/* Book details */}
            <div className="w-full md:w-3/5 text-center md:text-left mt-10 md:mt-0">
              <h1 className={`${getTitleFontSize(currentBook.title)} font-bold text-white leading-tight mb-6`}>
                {currentBook.title || 'Judul Buku'}
              </h1>
              <span className="inline-block bg-white text-black bg-opacity-25 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {currentBook.genre || 'Tanpa Kategori'}
              </span>
             
              <p className="text-xl font-light text-white opacity-90 mb-8">
                oleh {currentBook.author || 'Penulis Tidak Diketahui'}
              </p>
             
              <p className="text-white opacity-90 mb-10 max-w-2xl mx-auto md:mx-0">
                {truncateDescription(currentBook.description || 'Deskripsi tidak tersedia')}
              </p>
             
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to={`/book/${currentBook._id}`}
                  className="px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Baca Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-30 hover:bg-opacity-70'
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-2xl items-center justify-center hover:bg-opacity-30 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white bg-opacity-20 backdrop-blur-md rounded-full shadow-2xl items-center justify-center hover:bg-opacity-30 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black opacity-30 to-transparent z-10"></div>
    </section>
  );
};

// Utility: Darken color for gradient
const darkenColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor(R * (100 - percent) / 100);
  G = Math.floor(G * (100 - percent) / 100);
  B = Math.floor(B * (100 - percent) / 100);

  return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
};

// Fallback content for book cover
const fallbackContent = (book) => (
  `<div class="w-full h-full flex items-center justify-center bg-gray-100 p-4">
    <div class="text-center">
      <span class="text-lg font-bold text-gray-800">${book.title || 'Buku'}</span>
      <p class="text-gray-600 mt-2">by ${book.author || 'Unknown Author'}</p>
    </div>
  </div>`
);

export default HeroSection;