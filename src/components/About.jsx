// Komponen: Halaman tentang aplikasi
// Fitur: Menampilkan informasi tentang aplikasi dan kontak
const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tentang liteRandom</h1>
           
            <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                liteRandom adalah platform pencarian dan penemuan buku yang dirancang untuk membantu kamu menemukan buku-buku menarik dari berbagai genre.
                Nggak perlu bingung pilih buku, tinggal klik, dan... tadaa! Muncul buku dengan judul dan genre yang mungkin belum pernah kamu coba sebelumnya.
                </p>
               
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Fitur</h2>
                <ul className="list-disc pl-5 mb-6">
                <li className="mb-2">Pencarian buku berdasarkan judul, penulis, atau kata kunci</li>
                <li className="mb-2">Rekomendasi buku acak setiap hari</li>
                <li className="mb-2">Detail buku lengkap dengan ringkasan dan informasi penerbit</li>
                <li className="mb-2">Tautan pembelian untuk mendapatkan buku fisik/digital</li>
                </ul>
               
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Kontak</h2>
                <p className="text-gray-700">
                Untuk pertanyaan, saran, atau kerja sama, silakan hubungi:
                </p>
                <p>
                <a href="mailto:makasahadi14@gmail.com">makasahadi14@gmail.com</a>
                <br/>
                +62895368413511
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default About;