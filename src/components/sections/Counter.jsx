import React from 'react';
import useCounter from '../hooks/useCounter'; 4

function Counter() {
  const savingsCount = useCounter(1287, 2000);
  const photosCount = useCounter(5786, 2000);
  const rocketsCount = useCounter(1440, 2000);
  const globesCount = useCounter(7110, 2000);

  return (
    <section id="counter" className="bg-[#b53247] mt-12 mb-12 py-10 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">

          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <div className="text-4xl md:text-5xl font-light mb-2">+</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-none mb-2">
              <span id="count1">{savingsCount}</span>+
            </h2>
            <p className="text-lg md:text-xl uppercase tracking-wider">SAVINGS</p>
          </div>

          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <div className="text-4xl md:text-5xl font-light mb-2">+</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-none mb-2">
              <span id="count2">{photosCount}</span>+
            </h2>
            <p className="text-lg md:text-xl uppercase tracking-wider">PHOTOS</p>
          </div>

          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <div className="text-4xl md:text-5xl font-light mb-2">+</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-none mb-2">
              <span id="count3">{rocketsCount}</span>+
            </h2>
            <p className="text-lg md:text-xl uppercase tracking-wider">ROCKETS</p>
          </div>

          <div className="flex flex-col items-center justify-center mb-5 md:mb-0">
            <div className="text-4xl md:text-5xl font-light mb-2">+</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-none mb-2">
              <span id="count4">{globesCount}</span>+
            </h2>
            <p className="text-lg md:text-xl uppercase tracking-wider">GLOBES</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Counter;