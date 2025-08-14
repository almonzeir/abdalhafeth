import React from 'react';

function BookList({ books, onBookSelect, onShowAddForm }) {
  const totalBooks = books.length;
  const averageRating = books.length > 0 
    ? (books.reduce((sum, book) => sum + (book.averageRating || 0), 0) / books.length).toFixed(1)
    : 0;
  const totalReviews = books.reduce((sum, book) => sum + (book.reviews?.length || 0), 0);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-4 animate-fade-in">
        <div className="card p-8 max-w-md mx-auto">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Books Yet</h2>
          <p className="text-gray-600 mb-6">
            Start building your library by adding your first book!
          </p>
          <button
            onClick={onShowAddForm}
            className="btn btn-primary btn-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Your First Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          My Book Library
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover, review, and organize your favorite books
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center animate-fade-in-up">
          <div className="text-3xl font-bold text-blue-600 mb-2">{totalBooks}</div>
          <div className="text-gray-600">Total Books</div>
        </div>
        <div className="card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="text-3xl font-bold text-green-600 mb-2">{averageRating}</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="text-3xl font-bold text-yellow-500 mb-2">{totalReviews}</div>
          <div className="text-gray-600">Total Reviews</div>
        </div>
      </div>

      {/* Add Book Button */}
      <div className="text-center mb-8">
        <button
          onClick={onShowAddForm}
          className="btn btn-primary btn-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Book
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={book._id}
            className="card hover:shadow-lg cursor-pointer animate-fade-in-up"
            style={{animationDelay: `${index * 0.1}s`}}
            onClick={() => onBookSelect(book)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-3">
                by {book.author}
              </p>
              
              {book.description && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(book.averageRating || 0)}
                  <span className="text-sm text-gray-500 ml-2">
                    ({book.reviews?.length || 0} reviews)
                  </span>
                </div>
                
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;