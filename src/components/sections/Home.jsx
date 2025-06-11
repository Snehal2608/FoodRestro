import React from 'react';
import heroBackgroundImage from '../images/bg/bg-1.jpg'; // Import the hero background image

function Home({ onViewMenuClick }) {
  const handleMenuLinkClick = (event) => {
    event.preventDefault();
    onViewMenuClick();
  };

  return (
    <section
      id="home"
      // Added mt-20 to create a top margin, preventing overlap with the fixed header.
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat mt-20"
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 z-10 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">

          <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left mb-10 md:mb-0 pr-0 md:pr-8 lg:pr-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Delicious Flavors, <br className="hidden md:inline"/> Delivered Fresh
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Experience a culinary journey with our exquisite selection of dishes, prepared with the freshest ingredients and passion. From classic comfort food to innovative delights, we have something for every palate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-[#b53247] border-2 border-[#b53247] font-bold py-1.5 px-4 rounded-md hover:bg-[#b53247] hover:text-white transition duration-300 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50 flex items-center justify-center w-40">
                Order Online <i className="fas fa-shopping-basket ps-2"></i>
              </button>
              <a
                href="#menu"
                className="bg-white text-[#b53247] border-2 border-[#b53247] font-bold py-1.5 px-4 rounded-md hover:bg-[#b53247] hover:text-white transition duration-300 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50 flex items-center justify-center w-40"
                onClick={handleMenuLinkClick}
              >
                View Our Menu <i className="fas fa-angle-right ps-2"></i>
              </a>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2 lg:w-3/5"></div>

        </div>
      </div>
    </section>
  );
}

export default Home;
