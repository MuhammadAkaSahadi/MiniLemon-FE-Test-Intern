import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchBooks } from '../service/Api';

// Komponen: Hasil pencarian
// Fitur: Menampilkan hasil pencarian berdasarkan query parameter
const SearchResults = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Logika: Ekstrak keyword dari URL dan fetch hasil
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('q');
   
    if (keyword) {
      const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const results = await searchBooks(keyword);
          setBooks(results);
        } catch (err) {
          setError(`Gagal memuat hasil pencarian: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setBooks([]);
      setLoading(false);
    }
  }, [location.search]);

  const searchKeyword = new URLSearchParams(location.search).get('q') || '';

  // Tampilan loading
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 pt-32 md:pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center py-12">Memuat hasil pencarian...</p>
        </div>
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-50 pt-32 md:pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500 text-center py-12">{error}</p>
          <div className="text-center">
            <Link to="/" className="text-blue-500 hover:underline">
              Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-32 md:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {books.length > 0
            ? `Hasil Pencarian: "${searchKeyword}"`
            : `Tidak ditemukan hasil untuk "${searchKeyword}"`}
        </h1>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => {
            const authorName = book.author?.name || book.author || 'Penulis Tidak Diketahui';
            const bookTitle = book.title || 'Judul Tidak Diketahui';
            const bookDesc = book.description || 'Deskripsi tidak tersedia';
           
            return (
              <Link to={`/book/${book._id}`} key={book._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Book cover */}
                  <div className="flex-shrink-0 w-32 h-40 relative overflow-hidden">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        className="w-full h-full object-cover"
                        alt={book.title || 'Buku'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span class="text-gray-500">No Cover</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Cover</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Book info */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1 text-sm leading-tight">
                        {bookTitle}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3">
                        by {authorName}
                      </p>
                      <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
                        {bookDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Silakan coba kata kunci lain</p>
            <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
              Kembali ke beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;