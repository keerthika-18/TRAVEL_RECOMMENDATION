import React, { useState } from 'react';
import '../components/Review.css';

function ReviewPage() {
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (place && date && review) {
      const newReview = { place, date, review };
      setSubmittedReviews([newReview, ...submittedReviews]);
      setPlace('');
      setDate('');
      setReview('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="input-group">
          <label htmlFor="place">Place</label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter the place"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>

      <div className="submitted-reviews">
        <h3>Submitted Reviews</h3>
        {submittedReviews.length > 0 ? (
          submittedReviews.map((rev, index) => (
            <div key={index} className="review-card">
              <h4>{rev.place}</h4>
              <p><strong>Date:</strong> {rev.date}</p>
              <p>{rev.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
