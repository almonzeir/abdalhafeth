// This is the main server file using Node.js and Express.
const express = require('express');
const cors = require('cors');
const { books } = require('./data.json');

console.log('Loaded books:', books ? books.length : 'undefined');
console.log('First book:', books ? books[0] : 'no books');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// GET /api/books - List all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET /api/books/:id - Book details + reviews
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, rating } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author,
        rating,
        reviews: []
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// POST /api/books/:id/reviews - Add a new review
app.post('/api/books/:id/reviews', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { name, comment, rating } = req.body;
  const book = books.find(b => b.id === bookId);

  if (book) {
    const newReview = {
      id: Date.now(), // Simple unique ID
      name,
      comment,
      rating,
    };
    book.reviews.push(newReview);
    res.status(201).json(newReview);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// PUT /api/books/:id/reviews/:reviewId - Edit a review
app.put('/api/books/:id/reviews/:reviewId', (req, res) => {
  const bookId = parseInt(req.params.id);
  const reviewId = parseInt(req.params.reviewId);
  const { name, comment, rating } = req.body;
  const book = books.find(b => b.id === bookId);

  if (book) {
    const reviewIndex = book.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
      book.reviews[reviewIndex] = { ...book.reviews[reviewIndex], name, comment, rating };
      res.json(book.reviews[reviewIndex]);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE /api/books/:id/reviews/:reviewId - Delete a review
app.delete('/api/books/:id/reviews/:reviewId', (req, res) => {
  const bookId = parseInt(req.params.id);
  const reviewId = parseInt(req.params.reviewId);
  const book = books.find(b => b.id === bookId);

  if (book) {
    const initialLength = book.reviews.length;
    book.reviews = book.reviews.filter(r => r.id !== reviewId);
    if (book.reviews.length < initialLength) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});