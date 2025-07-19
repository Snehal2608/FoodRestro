import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0); // 1-5 star rating
  const [reviewText, setReviewText] = useState('');
  const [submitMessage, setSubmitMessage] = useState(''); // Message after form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- MongoDB Integration (Client-Side Logic) ---

  // Base URL for your backend API
  // IMPORTANT: Replace with your actual backend URL if it's not localhost:5000
  const API_BASE_URL = 'http://localhost:5000'; 

  // Function to fetch testimonials from your backend
  const fetchTestimonials = async () => {
    try {
      // Use the full API_BASE_URL for the fetch call
      const response = await fetch(`${API_BASE_URL}/api/testimonials`); 
      if (!response.ok) {
        // Attempt to read error message from response if it's not JSON
        const errorBody = await response.text(); 
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody.substring(0, 100)}...`); // Show part of the HTML error
      }
      const data = await response.json();
      setTestimonials(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(`Failed to load testimonials. Please ensure your backend is running and accessible at ${API_BASE_URL}. Error: ${err.message}`);
      setLoading(false);
    }
  };

  // useEffect to fetch testimonials on component mount and then poll for updates
  useEffect(() => {
    fetchTestimonials(); // Initial fetch

    // Poll for new testimonials every 10 seconds (adjust as needed)
    const intervalId = setInterval(fetchTestimonials, 10000); // Fetch every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Handle form submission to your backend
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewerName || !reviewText || rating === 0) {
      setSubmitMessage('Please fill in all fields and give a rating.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Use the full API_BASE_URL for the fetch call
      const response = await fetch(`${API_BASE_URL}/api/testimonials`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reviewerName,
          rating: rating,
          text: reviewText,
          // The backend model uses `createdAt` with `default: Date.now`,
          // so we don't strictly need to send timestamp from frontend unless required by backend logic.
          // Sending ISO string is fine if you want to explicitly pass it.
          // timestamp: new Date().toISOString(), 
          image: `https://placehold.co/100x100/cccccc/000000?text=${reviewerName.charAt(0)}` // Placeholder image
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody.substring(0, 100)}...`);
      }

      // Re-fetch testimonials to show the newly added one
      await fetchTestimonials();

      setSubmitMessage('Thank you for your review!');
      setReviewerName('');
      setRating(0);
      setReviewText('');
    } catch (err) {
      console.error("Error submitting review: ", err);
      setSubmitMessage(`Failed to submit review. Please ensure your backend is running. Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom styling for dots (pagination) using Tailwind CSS
  const CustomDot = ({ onClick, active }) => (
    <button
      onClick={onClick}
      className={`
        w-3 h-3 rounded-full mx-1 transition-all duration-300
        ${active ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
      `}
      aria-label="Carousel slide"
    ></button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: dots => (
      <div className="!bottom-[-50px]">
        <ul className="flex justify-center m-0 p-0 list-none"> {dots} </ul>
      </div>
    ),
    customPaging: i => <CustomDot />,
  };

  if (loading) {
    return (
      <section id="reviews" className="py-16 md:py-24 bg-[#b53247] flex items-center justify-center">
        <p className="text-white text-xl">Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="py-16 md:py-24 bg-[#b53247] flex items-center justify-center text-center">
        <p className="text-red-300 text-xl">{error}</p>
        <p className="text-red-300 text-lg mt-2">Please check your browser's console and your backend server's terminal for more details.</p>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#b53247]">
      <div className="container mx-auto px-4">
        {/* Testimonial Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl relative">
            {testimonials.length > 0 ? (
              <Slider
                {...settings}
                className="bg-white rounded-lg shadow-xl p-8 md:p-12 pb-20 relative"
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="text-center outline-none">
                    <img
                      // Use testimonial.image if available, otherwise fallback to placeholder
                      src={testimonial.image || `https://placehold.co/100x100/cccccc/000000?text=${testimonial.name ? testimonial.name.charAt(0) : '?'}`}
                      alt={`Reviewer ${testimonial.name}`}
                      className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-gray-200 shadow-md transform transition duration-300 hover:scale-105"
                      onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/100x100/cccccc/000000?text=${testimonial.name ? testimonial.name.charAt(0) : '?'}`; }}
                    />
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8 max-w-2xl mx-auto">
                      "{testimonial.text}"
                    </p>
                    <h5 className="font-bold text-gray-900 text-lg md:text-xl mb-1">
                      {testimonial.name}
                    </h5>
                    <p className="text-sm md:text-base text-gray-500">
                      Rating: {testimonial.rating} / 5
                    </p>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center text-gray-700">
                <p>No testimonials yet. Be the first to leave a review!</p>
              </div>
            )}
          </div>
        </div>

        {/* Review Submission Form */}
        <div className="mt-24 bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leave a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label htmlFor="reviewerName" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
              <input
                type="text"
                id="reviewerName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating (1-5 Stars)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    onClick={() => setRating(star)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="reviewText" className="block text-gray-700 text-sm font-bold mb-2">Your Review</label>
              <textarea
                id="reviewText"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {submitMessage && (
                <p className={`text-sm ml-4 ${submitMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {submitMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
