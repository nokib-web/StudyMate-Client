import React from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import HeroSection from './HeroSection';
import TopStudyPartners from './TopStudyPartners';
import Testimonials from './Testimonials';
import HowItWorks from './HowItWorks';




const Home = () => {
    const { loading } = useAuth();





    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner message="Finding study partners..." />
            </div>
        );
    }



    return (
        <div>
            <section className='my-10'>
            <HeroSection />
            </section>
            <section>
                <TopStudyPartners />
            </section>
            <section>
                <HowItWorks />
            </section>
            <section>
                <Testimonials />
            </section>

        </div>
    );
};

export default Home;