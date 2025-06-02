import { useState, useEffect } from 'react'; // Import useEffect
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './components/Header';
import Home from './components/Home';
import Counter from './components/Counter';
import About from './components/About';
import Story from './components/Story';
import ExploreFoods from './components/ExploreFoods';
import Testimonial from './components/Testimonial';
import Menu from './components/Menu'; 
import FAQ from './components/FAQ'; // Import the FAQ component

function App() {
  // State to control the visibility of the Menu component
  const [showMenu, setShowMenu] = useState(false);

  // Function to handle showing the menu
  const handleViewMenuClick = () => {
    setShowMenu(true);
  };

  // Effect to scroll to the menu when it becomes visible
  useEffect(() => {
    if (showMenu) {
      // Use a small timeout to ensure the DOM has updated before scrolling
      const timer = setTimeout(() => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // A small delay (e.g., 100ms)

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [showMenu]); // Rerun this effect whenever showMenu changes

  return (
    <div className="bg-white text-black">
      <Header />

      <section id="home">
        {/* Pass the handleViewMenuClick function as a prop to Home */}
        <Home onViewMenuClick={handleViewMenuClick} />
      </section>

      <section>
        <Counter />
      </section>

      <section id="aboutus">
        <About />
      </section>

      <section>
        <Story />
      </section>

      <section id="explorefoods">
        <ExploreFoods />
      </section>

      <section id="reviews">
        <Testimonial />
      </section>

      {/* Conditionally render the Menu section based on the showMenu state */}
      {showMenu && (
        <section id="menu">
          <Menu />
        </section>
      )}

       <section id="faq">
        <FAQ />
      </section>
    </div>
  );
}

export default App;
