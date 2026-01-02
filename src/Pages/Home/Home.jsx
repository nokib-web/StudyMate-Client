import React from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import HeroSection from './HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CategoriesSection from './components/CategoriesSection';
import TopPartnersSection from './components/TopPartnersSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import NewsletterSection from './components/NewsletterSection';
import CTASection from './components/CTASection';

const Home = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-base-100">
                <LoadingSpinner message="Finding study partners..." />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <HeroSection />

            {/* Statistics */}
            <StatsSection />

            {/* Features */}
            <FeaturesSection />

            {/* How It Works */}
            <HowItWorksSection />

            {/* Categories */}
            <CategoriesSection />

            {/* Featured Partners */}
            <TopPartnersSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* FAQ */}
            <FAQSection />

            {/* Blog */}
            <BlogSection />

            {/* Newsletter */}
            <NewsletterSection />

            {/* CTA */}
            <CTASection />
        </div>
    );
};

export default Home;