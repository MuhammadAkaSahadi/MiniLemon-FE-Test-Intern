const API_BASE_URL = "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1";

// Fitur: Fetch buku acak
// Logika: Mengambil 3 buku acak dari API dan memformat respons
export const fetchRandomBooks = async (count = 3) => {
  try {
    const books = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`${API_BASE_URL}/random_book`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
     
      const bookData = await response.json();
      
      // Format data buku
      const author = typeof bookData.author === 'string'
        ? bookData.author
        : bookData.author?.name || "Unknown Author";
     
      books.push({
        _id: bookData._id,
        title: bookData.title,
        author: author,
        description: bookData.summary || bookData.details?.summary || "Deskripsi tidak tersedia",
        genre: bookData.category?.name || "Uncategorized",
        coverImage: bookData.cover_image || bookData.coverings || "",
        buyLink: bookData.buy_links?.length > 0
          ? bookData.buy_links[0].url
          : null
      });
    }
    return books;
  } catch (error) {
    console.error("Error fetching random books:", error);
    return [];
  }
};

// Fitur: Fetch genre buku
// Logika: Mengambil daftar genre dari statistik API
export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/genre`);
    const data = await response.json();
    return Object.keys(data.data || {});
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Fitur: Fetch buku berdasarkan genre
// Logika: Mengambil buku per halaman berdasarkan genre tertentu
export const fetchBooksByGenre = async (genre, page = 1) => {
  try {
    const encodedGenre = encodeURIComponent(genre);
    const response = await fetch(
      `${API_BASE_URL}/book?genre=${encodedGenre}&page=${page}`
    );
   
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
   
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching books by genre:", error);
    return [];
  }
};

// Fitur: Pencarian buku
// Logika: Mencari buku berdasarkan keyword dan memformat respons
export const searchBooks = async (keyword) => {
  try {
    const url = new URL(`${API_BASE_URL}/book`);
    url.searchParams.append('keyword', keyword);
   
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
   
    const data = await response.json();

    // Ekstrak array buku dari respons
    let booksArray = [];
    if (Array.isArray(data)) booksArray = data;
    else if (data.data && Array.isArray(data.data)) booksArray = data.data;
    else if (data.books && Array.isArray(data.books)) booksArray = data.books;
    else return [];

    // Transformasi data buku
    return booksArray.map(bookData => {
      const author = typeof bookData.author === 'string'
        ? bookData.author
        : bookData.author?.name || "Unknown Author";

      return {
        _id: bookData._id,
        title: bookData.title,
        author: author,
        description: bookData.description || bookData.summary || "Deskripsi tidak tersedia",
        coverImage: bookData.cover_image || bookData.coverings || "",
        genre: bookData.category?.name || bookData.genre || "Uncategorized",
        buyLink: bookData.buy_links?.length > 0 ? bookData.buy_links[0].url : null
      };
    });
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

// Fitur: Fetch penulis acak
// Logika: Mengambil 6 penulis unik dari buku acak
export const fetchRandomAuthors = async (count = 6) => {
  try {
    const authorsSet = new Set();
    let attempts = 0;
   
    while (authorsSet.size < count && attempts < count * 2) {
      const response = await fetch(`${API_BASE_URL}/random_book`);
      const data = await response.json();
      const author = data.author?.name || data.author;
      if (author && typeof author === 'string') authorsSet.add(author);
      attempts++;
    }
    return Array.from(authorsSet).slice(0, count);
  } catch (error) {
    console.error("Error fetching random authors:", error);
    return [];
  }
};

// Fitur: Fetch buku berdasarkan ID
// Logika: Mengambil detail buku spesifik menggunakan ID
export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/book/${id}`);
    if (!response.ok) throw new Error('Buku tidak ditemukan');
    return await response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};