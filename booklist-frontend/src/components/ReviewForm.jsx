import React, { useState } from 'react';

function ReviewForm({ review, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    reviewer: review?.reviewer || '',
    rating: review?.rating || 5,
    comment: review?.comment || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.reviewer.trim() && formData.comment.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const rating = i + 1;
      return (
        <button
          key={i}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, rating }))}
          className={`w-8 h-8 ${rating <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    });
  };

  return (
    <div className="card animate-fade-in-up">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {review ? 'Edit Review' : 'Write a Review'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">
              Your Name
            </label>
            <input
              type="text"
              name="reviewer"
              value={formData.reviewer}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Rating
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars()}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {formData.rating} out of 5 stars
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Your Review
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Share your thoughts about this book..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="btn btn-primary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {review ? 'Update Review' : 'Submit Review'}
            </button>
            
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;