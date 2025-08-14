import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import Review from './Review';

function BookDetails({ book, onBack, onBookUpdated }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const handleAddReview = async (reviewData) => {
    try {
      const response = await fetch(`http://localhost:3002/api/books/${book._id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      
      setShowReviewForm(false);
      onBookUpdated();
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleUpdateReview = async (reviewId, reviewData) => {
    try {
      const response = await fetch(`http://localhost:3002/api/books/${book._id}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      
      setEditingReview(null);
      onBookUpdated();
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/books/${book._id}/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      
      onBookUpdated();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="animate-fade-in">
      {/* Navigation */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="btn btn-secondary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </button>
      </div>

      {/* Book Header */}
      <div className="card p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {book.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            by {book.author}
          </p>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {renderStars(book.averageRating || 0)}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {(book.averageRating || 0).toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({book.reviews?.length || 0} reviews)
            </span>
          </div>
          
          {/* Description */}
          {book.description && (
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {book.description}
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews ({book.reviews?.length || 0})
          </h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn btn-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-6">
            <ReviewForm
              onSubmit={handleAddReview}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {/* Reviews List */}
        {book.reviews && book.reviews.length > 0 ? (
          <div className="space-y-6">
            {book.reviews.map((review) => (
              <div key={review._id}>
                {editingReview === review._id ? (
                  <ReviewForm
                    review={review}
                    onSubmit={(data) => handleUpdateReview(review._id, data)}
                    onCancel={() => setEditingReview(null)}
                  />
                ) : (
                  <Review
                    review={review}
                    onEdit={() => setEditingReview(review._id)}
                    onDelete={() => handleDeleteReview(review._id)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">💭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to share your thoughts about this book!
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn btn-primary"
            >
              Write First Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;