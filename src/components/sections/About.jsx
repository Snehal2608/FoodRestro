import React from 'react';
// Import your images. Adjust paths if necessary.
import img1 from '../images/img/img-1.png'; // Healthy Food Bowl
import img2 from '../images/img/img-1.png'; // Junk Food Collage

function About() {
  // Define a reusable button style for the "Learn More" buttons
  const learnMoreBtnClasses = "bg-[#b53247] text-white font-bold py-2.5 px-6 rounded-md hover:bg-[#9c293b] transition duration-300 ease-in-out text-base focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50";

  return (
    // Changed id from "about" to "aboutus" to match the Header component's navigation link.
    <section id="aboutus" className="py-16 md:py-24 bg-gray-50">
      {/* First block: Image on Left, Text on Right (matches Screenshot 2025-05-31 092445.jpg) */}
      <div className="container mx-auto px-4 mb-16 md:mb-24">
        {/* Layout for Image Left, Text Right */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Column (visual order): Image (img1) */}
          <div className="w-full md:w-7/12 mb-8 md:mb-0 md:pr-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Added minHeight for image height adjustment */}
              <img src={img1} className="w-full h-auto object-cover" alt="Healthy Food" style={{ minHeight: '350px' }} />
            </div>
          </div>
          {/* Right Column (visual order): Text Content */}
          <div className="w-full md:w-5/12 text-center md:text-left md:pl-6">
            {/* Updated Heading text and font-semibold for Italian theme */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">
              We Craft Authentic Italian Flavors From The Finest Ingredients.
            </h2>
            {/* Updated Paragraph text for Italian theme */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              At Foodies' Delight, we are passionate about bringing you the true taste of Italy. Every dish is a celebration of traditional recipes, prepared with the freshest, locally-sourced produce and imported Italian specialties.
            </p>
            <button className={learnMoreBtnClasses}>Learn More</button>
          </div>
        </div>
      </div>

      {/* Second block: Text on Left, Image on Right (matches image_ebefba.jpg, Screenshot 2025-05-31 092509.jpg etc.) */}
      <div className="container mx-auto px-4">
        {/* Changed from md:flex-row-reverse to md:flex-row to put Text Left, Image Right */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Column (visual order): Text Content */}
          <div className="w-full md:w-5/12 text-center md:text-left mb-8 md:mb-0 md:pr-6">
            {/* Updated Heading text and font-semibold for Italian theme */}
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">
              Handmade With Love, Using Time-Honored Italian Traditions.
            </h2>
            {/* Updated Paragraph text for Italian theme */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              Our commitment to quality means we make everything by hand, from our fresh pasta to our rich sauces, just like Nonna used to. We believe in the art of traditional Italian cooking, ensuring every bite is a delightful experience.
            </p>
            <ul className="list-none space-y-3 py-3">
              <li className="flex items-start text-gray-700">
                <i className="fas fa-check-circle text-[#b53247] mr-3 mt-1"></i>
                <span>Fresh, Locally Sourced Produce</span>
              </li>
              <li className="flex items-start text-gray-700">
                <i className="fas fa-check-circle text-[#b53247] mr-3 mt-1"></i>
                <span>Authentic Italian Recipes</span>
              </li>
              <li className="flex items-start text-gray-700">
                <i className="fas fa-check-circle text-[#b53247] mr-3 mt-1"></i>
                <span>Handmade Pasta & Sauces Daily</span>
              </li>
            </ul>
            <button className={learnMoreBtnClasses}>Learn More</button>
          </div>
          {/* Right Column (visual order): Image (img2) */}
          <div className="w-full md:w-7/12 md:pl-6">
            {/* Removed bg-white, rounded-lg, and shadow-xl to match the screenshot without a border/shadow */}
            <div className="overflow-hidden">
              <img src={img2} className="w-full h-auto object-cover" alt="Handmade Food Collage" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
