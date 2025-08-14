import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookDetails from './BookDetails';
import AddBookForm from './AddBookForm';
import './index.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowAddForm(false);
  };

  const handleBackToList = () => {
    setSelectedBook(null);
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setSelectedBook(null);
  };

  const handleBookAdded = async (bookData) => {
    try {
      const response = await fetch('http://localhost:3002/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      await fetchBooks();
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  const handleBookUpdated = () => {
    fetchBooks();
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center card p-8 max-w-md animate-fade-in-up">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-gray-900 text-2xl font-bold mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchBooks}
            className="btn btn-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container">
        {selectedBook ? (
          <BookDetails 
            book={selectedBook} 
            onBack={handleBackToList}
            onBookUpdated={handleBookUpdated}
          />
        ) : showAddForm ? (
          <AddBookForm 
            onBack={handleBackToList}
            onBookAdded={handleBookAdded}
          />
        ) : (
          <BookList 
            books={books} 
            onBookSelect={handleBookSelect}
            onShowAddForm={handleShowAddForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;