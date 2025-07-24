import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookSlide from './components/BookSlide';
import Content from './components/Content';
import BookDetail from './components/BookDetail';
import About from './components/About';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer'; // Tambahkan import Footer

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header: Menampilkan navigasi dan fungsi pencarian */}
        <Header />
       
        {/* Konten utama yang dapat berkembang */}
        <main className="flex-grow">
          <Routes>
            {/* Halaman utama: Menampilkan slider buku dan konten rekomendasi */}
            <Route path="/" element={
              <>
                <BookSlide />
                <Content />
              </>
            } />
         
            {/* Halaman detail buku berdasarkan ID */}
            <Route path="/book/:id" element={<BookDetail />} />
          
            {/* Halaman tentang aplikasi */}
            <Route path="/about" element={<About />} />
          
            {/* Halaman hasil pencarian */}
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        
        {/* Footer: Menampilkan navigasi sekunder dan informasi hak cipta */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;