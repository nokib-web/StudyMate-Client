import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full mb-10">
      <div className="carousel w-full rounded-3xl shadow-2xl overflow-hidden">

        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1500&q=80"
            className="w-full object-cover h-[400px]"
            alt="Find your study partner"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-4xl text-gray-500 font-bold mb-3">Find Your Perfect Study Partner</h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Connect with learners who share your goals, subjects, and study habits.
            </p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide2" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1500&q=80"
            className="w-full object-cover h-[400px]"
            alt="Grow together"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-4xl text-gray-500 font-bold mb-3">Learn, Grow, and Achieve Together</h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Share knowledge, solve problems, and stay motivated in your learning journey.
            </p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide3" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1500&q=80"
            className="w-full object-cover h-[400px]"
            alt="Smart study experience"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-4xl text-gray-500 font-bold mb-3">Experience Smarter Studying</h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Join StudyMate to make studying efficient, engaging, and enjoyable.
            </p>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide1" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
