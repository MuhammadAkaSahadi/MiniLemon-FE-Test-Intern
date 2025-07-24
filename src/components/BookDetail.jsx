/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById } from '../service/Api';

// Komponen: Detail buku
// Fitur: Menampilkan informasi lengkap buku berdasarkan ID
const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // Logika: Memuat detail buku berdasarkan ID
    useEffect(() => {
        const loadBook = async () => {
        try {
            setLoading(true);
            const bookData = await fetchBookById(id);
            setBook(bookData);
        } catch (err) {
            setError('Gagal memuat detail buku');
        } finally {
            setLoading(false);
        }
        };
        loadBook();
    }, [id]);

    // Tampilan loading
    if (loading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-gray-600">Memuat detail buku...</p>
        </div>
        );
    }

    // Tampilan error
    if (error) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Link to="/" className="text-blue-500 hover:underline">
                Kembali ke beranda
            </Link>
            </div>
        </div>
        );
    }

    // Tampilan buku tidak ditemukan
    if (!book) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
            <p className="text-gray-600 mb-4">Buku tidak ditemukan</p>
            <Link to="/" className="text-blue-500 hover:underline">
                Kembali ke beranda
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
                <Link to="/" className="inline-block mb-6 text-blue-500 hover:underline">
                &larr; Kembali
                </Link>
            
                <div className="flex flex-col md:flex-row gap-8">
                {/* Book cover */}
                <div className="flex-shrink-0">
                    {book.cover_image ? (
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-64 h-auto rounded-lg shadow-md"
                        onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `
                            <div class="w-64 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span class="text-gray-500">No Cover</span>
                            </div>
                        `;
                        }}
                    />
                    ) : (
                    <div className="w-64 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No Cover</span>
                    </div>
                    )}
                </div>
                
                {/* Book details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                
                    <div className="flex items-center mb-4">
                    <span className="text-gray-600 mr-2">Oleh:</span>
                    <span className="font-medium">
                        {book.author?.name || 'Penulis tidak diketahui'}
                    </span>
                    </div>
                
                    <div className="mb-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {book.category?.name || 'Tanpa kategori'}
                    </span>
                    </div>
                
                    <div className="prose max-w-none mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Ringkasan</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                        {book.summary || 'Tidak ada ringkasan tersedia'}
                    </p>
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Book details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Detail Buku</h3>
                        <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Harga:</span>
                            <span className="font-medium">{book.details?.price || '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Jumlah Halaman:</span>
                            <span className="font-medium">{book.details?.total_pages || '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Tanggal Terbit:</span>
                            <span className="font-medium">{book.details?.published_date || '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Format:</span>
                            <span className="font-medium">{book.details?.format || '-'}</span>
                        </li>
                        </ul>
                    </div>
                    
                    {/* Additional info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Lain</h3>
                        <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Penerbit:</span>
                            <span className="font-medium">{book.publisher || '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">ISBN:</span>
                            <span className="font-medium">{book.details?.isbn || '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Ukuran:</span>
                            <span className="font-medium">{book.details?.size || '-'}</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                
                    {/* Buy links */}
                    {book.buy_links && book.buy_links.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Beli Buku</h3>
                        <div className="flex flex-wrap gap-3">
                        {book.buy_links.map((link, index) => (
                            <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                            {link.store}
                            </a>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default BookDetail;