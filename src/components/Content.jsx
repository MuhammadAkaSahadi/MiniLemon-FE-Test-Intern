import { useState, useEffect, useCallback } from 'react';
import { fetchRandomAuthors, fetchRandomBooks } from '../service/Api';
import { Link } from 'react-router-dom';

// Komponen: Konten utama beranda
// Fitur: Menampilkan rekomendasi buku dan penulis
const Content = () => {
  const [authors, setAuthors] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logika: Memuat buku acak untuk rekomendasi
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const randomBooks = await fetchRandomBooks(10);
      setPopularBooks(randomBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logika: Memuat penulis dan buku terkait
  useEffect(() => {
    const loadAuthorsAndBooks = async () => {
      const authorsData = await fetchRandomAuthors(6);
      const formattedAuthors = authorsData.map((author, index) => ({
        id: index + 1,
        name: author
      }));
     
      setAuthors(formattedAuthors);
     
      // Ambil satu buku acak per penulis
      const booksData = await Promise.all(
        formattedAuthors.map(async author => {
          const randomBook = await fetchRandomBooks(1);
          return randomBook[0] ? {
            title: randomBook[0].title,
            author: author.name,
            id: `book-${author.id}`
          } : null;
        })
      );
     
      setAuthorBooks(booksData.filter(book => book !== null));
    };
   
    loadAuthorsAndBooks();
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-32 md:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-8">
            {/* Author section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Author of the week</h2>
              <div className="space-y-4">
                {authors.map((author) => (
                  <div key={author.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{author.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Books of the year</h2>
              <div className="space-y-4">
                {authorBooks.map((book) => (
                  <div key={book.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                      <span className="text-teal-600 text-sm">📚</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium">{book.title}</p>
                      <p className="text-gray-500 text-xs">by {book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Ini Saran Buku Buat Kamu</h1>
            </div>

            {/* Book grid */}
            {loading ? (
              <div className="text-center py-12">
                <p>Memuat buku...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularBooks.map((book) => (
                  <Link to={`/book/${book._id}`} key={book._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      {/* Book cover */}
                      <div className="flex-shrink-0 w-32 h-40 relative overflow-hidden">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            className="w-full h-full object-cover"
                            alt={book.title}
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
                            {book.title || 'Judul Tidak Diketahui'}
                          </h3>
                          <p className="text-gray-600 text-xs mb-3">
                            by {book.author || 'Penulis Tidak Diketahui'}
                          </p>
                          <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
                            {book.description || 'Deskripsi tidak tersedia'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;