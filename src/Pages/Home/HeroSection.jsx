import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
      title: "Find Your Perfect Study Partner",
      description: "Connect with learners who share your goals, subjects, and study habits. Master your subjects together.",
      cta: "Find Partners",
      link: "/find-partners"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
      title: "Learn, Grow, and Achieve Together",
      description: "Share knowledge, solve complex problems, and stay motivated throughout your learning journey.",
      cta: "Join Community",
      link: "/register"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
      title: "Experience Smarter Studying",
      description: "Join StudyMate to make studying efficient, engaging, and enjoyable with real-time collaboration.",
      cta: "Explore Now",
      link: "/find-partners"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-start text-white max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight animate-fade-in-up">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
              {slide.description}
            </p>
            <Link
              to={slide.link}
              className="btn btn-primary btn-lg rounded-full px-8 text-white border-none hover:scale-105 transition-transform animate-fade-in-up delay-200"
            >
              {slide.cta} <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrows (Optional, but requested) */}
      <button
        onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl hover:bg-black/20 hidden lg:flex"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl hover:bg-black/20 hidden lg:flex"
      >
        ❯
      </button>
    </div>
  );
};

export default HeroSection;
