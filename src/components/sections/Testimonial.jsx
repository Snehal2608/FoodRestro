import React from 'react';
import Slider from 'react-slick'; // Import Slider component
// Import reviewer images
import review1 from '../images/review/review-1.jpg';
import review2 from '../images/review/review-2.jpg';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 



function Testimonial() {
  const testimonials = [
    {
      id: 1,
      image: review1,
      text: "Our experience with this product has been nothing short of amazing! The features are intuitive, and the support team is incredibly responsive. Highly recommended for anyone looking to streamline their workflow.",
      name: "Johnthan Doe",
      designation: "UX Designer",
    },
    {
      id: 2,
      image: review2,
      text: "I was skeptical at first, but this service exceeded all my expectations. The results speak for themselves, and it has genuinely transformed how we approach our daily tasks.",
      name: "Maccy Doe",
      designation: "Front End Developer",
    },
    {
      id: 3,
      image: review1, // Reusing image for example
      text: "From start to finish, the process was seamless. The quality is top-notch, and it's clear a lot of thought went into user experience. A definite game-changer!",
      name: "Jane Smith",
      designation: "Product Manager",
    },
  ];

  // Custom styling for dots (pagination) using Tailwind CSS
  // This will override slick-carousel's default dot styling
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
    dots: true, // Enable dots
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 5000, // Time between slides in ms (5 seconds)
    arrows: false, // Hide default arrows (we'll style custom dots instead)
    // Custom dot rendering function
    appendDots: dots => (
      <div className="!bottom-[-50px]"> {/* Adjust position of dots below the card */}
        <ul className="flex justify-center m-0 p-0 list-none"> {dots} </ul>
      </div>
    ),
    customPaging: i => <CustomDot />, // Use our custom dot component
  };

  return (
    <section id="testimonial" className="py-16 md:py-24 bg-[#b53247] relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Testimonial Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div> {/* Decorative dash line */}
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl relative"> {/* Added relative for dot positioning */}
            <Slider
              {...settings}
              // Tailwind classes directly applied to the Slider wrapper for the white card effect
              className="bg-white rounded-lg shadow-xl p-8 md:p-12 pb-20 relative" // Added pb-20 for space for dots
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="text-center outline-none"> {/* outline-none to remove slick's focus outline */}
                  {/* Reviewer Image */}
                  <img
                    src={testimonial.image}
                    alt={`Reviewer ${testimonial.name}`}
                    className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-gray-200 shadow-md transform transition duration-300 hover:scale-105"
                  />
                  {/* Testimonial Text */}
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8 max-w-2xl mx-auto">
                    "{testimonial.text}"
                  </p>
                  {/* Reviewer Name and Designation */}
                  <h5 className="font-bold text-gray-900 text-lg md:text-xl mb-1">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm md:text-base text-gray-500">
                    {testimonial.designation}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;