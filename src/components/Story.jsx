import React, { useState } from 'react'; // Import useState hook

function Story() {
  // State to manage the visibility of the full text
  const [showFullText, setShowFullText] = useState(false);

  // Define a reusable button style
  const primaryBtnClasses = "bg-[#b53247] text-white font-bold py-3 px-8 rounded-md hover:bg-[#9c293b] transition duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50";

  // Function to toggle the state of showFullText
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <section id="story" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-[#b53247] leading-tight mb-6">
            Experience Exquisite Flavors, Crafted With Passion
          </h2>
          {/* Initial visible paragraph */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4"> {/* Reduced mb-8 to mb-4 to make space for more text */}
            Dive into a world where every dish is a masterpiece, prepared with the freshest ingredients and culinary artistry. Our commitment is to deliver an unforgettable dining experience, from our kitchen to your table.
          </p>

          {/* Additional text, conditionally rendered based on showFullText state */}
          {showFullText && (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
              Every recipe is thoughtfully perfected, blending traditional techniques with modern innovation to awaken your senses. Join us for a culinary journey where taste, quality, and service are our highest priorities. We strive to make every visit memorable, leaving you with a desire to return for more of our delightful creations.
            </p>
          )}

          {/* Button to toggle text visibility */}
          <button
            className={primaryBtnClasses}
            onClick={toggleText} // Attach the toggleText function to onClick
          >
            {/* Dynamically change button text */}
            {showFullText ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Story;